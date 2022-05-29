import React from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query'
import { useAuthState } from 'react-firebase-hooks/auth';
import hostLink from '../../Components/host';
import Loading from '../../Components/Loading';
import auth from '../../Firebase.init';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const [user, loading] = useAuthState(auth);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { data: profile, isLoading, refetch } = useQuery('profile', () => fetch(`${hostLink()}/user/${user.email}`, {
    method: 'GET',
    headers: {
      'authorization': `bearer ${localStorage.getItem('accessToken')}`
    }
  }).then(res => res.json()));

  const imgStorageKey = 'f41342e948ee937d5eb330c2e281e61f';
  const onSubmit = async data => {
    const { name, contact, university, department, hometown, github, linkedin } = data;
    const img = data.image[0];
    const formData = new FormData();
    formData.append('image', img);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    fetch(url, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(result => {
        if (result.success) {
          const img = result.data.url;
          const updatedProfile = {
            name, img, contact, university, department, hometown, github, linkedin,
            email: user.email
          };
          //send to db
          fetch(`${hostLink()}/profile`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updatedProfile)
          }).then(res => res.json())
            .then(result => {
              if (result.result.acknowledged) {
                toast.success('Profile Updated!');
                refetch();
              } else toast.error('Problem occurred!!! Please try again.');
            });
        }
      })
  }
  if (loading || isLoading) return <Loading />
  const fieldClass = `w-full  text-start text-gray-100 font-bold text-base tracking-[.07em] my-2`;
  const infoClass = `font-semibold text-base`;
  const inputClass = `input w-full mt-2 border-2 border-gray-600 focus:border-gray-100`;
  return (
    <div>
      <div className="hero h-full">
        <div className="hero-content w-11/12 flex justify-start items-start flex-col lg:flex-row">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body flex flex-col justify-center items-center w-full">
              {/* user avatar */}
              <div className='avatar w-3/4 mb-8'>
                <div className="w-full rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                  <img alt='avatar' src={profile?.img || user?.photoURL || "https://api.lorem.space/image/face?hash=64318"} />
                </div>
              </div>
              {/* user information */}
              <h1 className={fieldClass}>Name: <span className={infoClass}>{profile?.name || user?.displayName}</span></h1>
              <h1 className={fieldClass}>Email: <span className={infoClass}>{profile?.email || user?.email}</span></h1>
              <h1 className={fieldClass}>Contact: <span className={infoClass}>{profile.contact ? profile.contact : <span className='text-gray-500 font-light text-sm'>Unknown</span>}</span></h1>
              <h1 className={fieldClass}>University: <span className={infoClass}>{profile.university ? profile.university : <span className='text-gray-500 font-light text-sm'>Unknown</span>}</span></h1>
              <h1 className={fieldClass}>Department: <span className={infoClass}>{profile.department ? profile.department : <span className='text-gray-500 font-light text-sm'>Unknown</span>}</span></h1>
              <h1 className={fieldClass}>Hometown: <span className={infoClass}>{profile.hometown ? profile.hometown : <span className='text-gray-500 font-light text-sm'>Unknown</span>}</span></h1>
              <h1 className={fieldClass}>Github: <span className={infoClass}>{profile.github ? profile.github : <span className='text-gray-500 font-light text-sm'>Unknown</span>}</span></h1>
              <h1 className={fieldClass}>Linkedin: <span className={infoClass}>{profile.linkedin ? profile.linkedin : <span className='text-gray-500 font-light text-sm'>Unknown</span>}</span></h1>
            </div>
          </div>
          <div className="text-center w-full h-full text-gray-100">
            <div className='w-full flex flex-col items-end'>
              <form className='p-5 w-full md:w-3/4 ' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-4xl my-8 text-cyan-300'>Update Profile</h1>
                {/* name form */}
                <div className="form-control w-full">
                  <label className="label text-sm font-semibold py-0 ml-2">
                    <span className="label-text ">Name</span>
                  </label>
                  <input type="text" name='name' className={inputClass}  {...register("name",
                    {
                      required: { value: true, message: 'Name is required' },
                    })} />
                  <label className="label pt-1 ml-2">
                    <span className="label-text-alt"></span>
                    {errors.name?.type === 'required' && <span className="label-text-alt text-[12px] text-red-600">{errors.name.message}</span>}
                  </label>
                </div>

                {/* photo form */}
                <div className="form-control w-full">
                  <label className="label text-sm font-semibold py-0 ml-2">
                    <span className="label-text ">Photo</span>
                  </label>
                  <input type="file" name='image' className="
              form-control
              block
              w-full
              px-2
              py-1
              text-sm
              font-normal
              text-gray-700
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    {...register("image",
                      {
                        required: { value: true, message: 'Image is required' },
                      })} />
                  <label className="label pt-1 ml-2">
                    <span className="label-text-alt"></span>
                    {errors.image?.type === 'required' && <span className="label-text-alt text-[12px] text-red-600">{errors.image.message}</span>}
                  </label>
                </div>

                {/* contact form */}
                <div className="form-control w-full">
                  <label className="label text-sm font-semibold py-0 ml-2">
                    <span className="label-text ">Contact</span>
                  </label>
                  <input type="number" name='contact' className={inputClass} defaultValue={profile?.contact} {...register("contact",
                    {
                      required: { value: true, message: 'Contact is required' },
                    })} />
                  <label className="label pt-1 ml-2">
                    <span className="label-text-alt"></span>
                    {errors.contact?.type === 'required' && <span className="label-text-alt text-[12px] text-red-600">{errors.contact.message}</span>}
                  </label>
                </div>
                {/* university form */}
                <div className="form-control w-full">
                  <label className="label text-sm font-semibold py-0 ml-2">
                    <span className="label-text ">University</span>
                  </label>
                  <input type="text" name='university' className={inputClass}  {...register("university",
                    {
                      required: { value: true, message: 'University is required' },
                    })} />
                  <label className="label pt-1 ml-2">
                    <span className="label-text-alt"></span>
                    {errors.university?.type === 'required' && <span className="label-text-alt text-[12px] text-red-600">{errors.university.message}</span>}
                  </label>
                </div>
                {/* department form */}
                <div className="form-control w-full">
                  <label className="label text-sm font-semibold py-0 ml-2">
                    <span className="label-text ">Department</span>
                  </label>
                  <input type="text" name='department' className={inputClass}  {...register("department",
                    {
                      required: { value: true, message: 'Department is required' },
                    })} />
                  <label className="label pt-1 ml-2">
                    <span className="label-text-alt"></span>
                    {errors.department?.type === 'required' && <span className="label-text-alt text-[12px] text-red-600">{errors.department.message}</span>}
                  </label>
                </div>
                {/* hometown form */}
                <div className="form-control w-full">
                  <label className="label text-sm font-semibold py-0 ml-2">
                    <span className="label-text ">Hometown</span>
                  </label>
                  <input type="text" name='hometown' className={inputClass}  {...register("hometown",
                    {
                      required: { value: true, message: 'Hometown is required' },
                    })} />
                  <label className="label pt-1 ml-2">
                    <span className="label-text-alt"></span>
                    {errors.hometown?.type === 'required' && <span className="label-text-alt text-[12px] text-red-600">{errors.hometown.message}</span>}
                  </label>
                </div>
                {/* github form */}
                <div className="form-control w-full">
                  <label className="label text-sm font-semibold py-0 ml-2">
                    <span className="label-text ">Github</span>
                  </label>
                  <input type="text" name='github' className={inputClass}  {...register("github",
                    {
                      required: { value: true, message: 'Github is required' },
                    })} />
                  <label className="label pt-1 ml-2">
                    <span className="label-text-alt"></span>
                    {errors.github?.type === 'required' && <span className="label-text-alt text-[12px] text-red-600">{errors.github.message}</span>}
                  </label>
                </div>
                {/* linkedin form */}
                <div className="form-control w-full">
                  <label className="label text-sm font-semibold py-0 ml-2">
                    <span className="label-text ">Linkedin</span>
                  </label>
                  <input type="text" name='linkedin' className={inputClass}  {...register("linkedin",
                    {
                      required: { value: true, message: 'Linkedin is required' },
                    })} />
                  <label className="label pt-1 ml-2">
                    <span className="label-text-alt"></span>
                    {errors.linkedin?.type === 'required' && <span className="label-text-alt text-[12px] text-red-600">{errors.linkedin.message}</span>}
                  </label>
                </div>
                <input type="submit" value='Update' className="btn glass modal-action w-full hover:text-white" />
                {/* <p className='text-[12px] text-red-600 text-center font-semibold my-2'>{(error || errorUpdate) && (error?.message || errorUpdate?.message)}</p> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;