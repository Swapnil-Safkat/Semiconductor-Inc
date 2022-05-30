import React from 'react';
import { useForm } from "react-hook-form";
import hostLink from '../../Components/host';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase.init';
import Loading from '../../Components/Loading';


const ContactUs = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [user , loading] = useAuthState(auth);
  const inputClass = `input w-full mt-2 border-2 border-gray-600 focus:border-gray-100`;
  const onSubmit = async contact => {
    console.log(contact);
    fetch(`${hostLink()}/opinion`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(contact)
    }).then(res => res.json())
      .then(inserted => {
        if (inserted.insertedId) {
          toast.success('Thanks for contacting us.');

        } else toast.error('Some Problem Occurred! Please try again');
      })
  }
  if(loading) return<Loading/>
  return (
    <div class="hero bg-neutral my-20 py-12 text-gray-100">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Contact Us!</h1>
          <p class="py-6">Let Us Know Your Query. Our Team Provides Best Support to Our Customers.</p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className='p-5 w-full md:w-1/2 mx-auto text-white' onSubmit={handleSubmit(onSubmit)}>
            {/* name form */}
            <div className="form-control w-full">
              <label className="label text-sm font-semibold py-0 ml-2">
                <span className="label-text ">Name</span>
              </label>
              <input type="text" name='name' value={user?.displayName} className={inputClass}  {...register("name",
                {
                  required: { value: true, message: 'Name is required' },
                })} />
              <label className="label pt-1 ml-2">
                <span className="label-text-alt"></span>
                {errors.name?.type === 'required' && <span className="label-text-alt text-[12px] text-red-600">{errors.name.message}</span>}
              </label>
            </div>
            {/* email form */}
            <div className="form-control w-full">
              <label className="label text-sm font-semibold py-0 ml-2">
                <span className="label-text ">Email</span>
              </label>
              <input type="text" name='email' value={user?.email} className={inputClass}  {...register("email",
                {
                  required: { value: true, message: 'Email is required' },
                })} />
              <label className="label pt-1 ml-2">
                <span className="label-text-alt"></span>
                {errors.email?.type === 'required' && <span className="label-text-alt text-[12px] text-red-600">{errors.email.message}</span>}
              </label>
            </div>
            {/* opinion form */}
            <div className="form-control w-full">
              <label className="label text-sm font-semibold py-0 ml-2">
                <span className="label-text ">Your Opinion</span>
              </label>
              <input type="text" name='opinion'  className={inputClass}  {...register("opinion",
                {
                  required: { value: true, message: 'Opinion is required' },
                })} />
              <label className="label pt-1 ml-2">
                <span className="label-text-alt"></span>
                {errors.opinion?.type === 'required' && <span className="label-text-alt text-[12px] text-red-600">{errors.opinion.message}</span>}
              </label>
            </div>



            <input type="submit" value='Submit' className="btn glass modal-action w-full hover:text-white" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;