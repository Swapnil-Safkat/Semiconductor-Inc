import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hostLink from '../../Components/host';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase.init';
const Purchase = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [product, setProduct] = useState({});
  const { register, formState: { errors }, handleSubmit } = useForm();
  useEffect(() => {
    fetch(`${hostLink()}/item/${id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => res.json()).then(data => {
      setProduct(data);
    })
  }, [id]
  )
  const onSubmit = data => {
    data.productName = product.name;
    //send to backend
    if (+data.amount < +product.minOrder) toast.error(`Minimum Order Amount ${product.minOrder}`);
    else if (+data.amount > +product.available) toast.error(`We do not have that much product. Please reduce your order`)
    else {
      fetch(`${hostLink()}/order`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then(inserted => {
          if (inserted.insertedId) {
            toast.success('Order Placed.');

          } else toast.error('Some Problem Occurred');
        })
    }

  }

  const inputClass = `input w-full mt-2 border-2 border-gray-300`;
  return (
    <div className="hero w-full min-h-screen bg-base-200 text-white">
      <div className="hero-content flex flex-col lg:flex-row justify-start items-start">
        <img src={product?.image} alt={product?.name} className="max-w-sm rounded-lg shadow-2xl " />
        <div className='w-full p-6'>
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <h1 className='text-lg text-center'>Price: <span className='text-primary'>{product?.price}$</span></h1>
          <h1 className='text-lg text-center'>Available Amount: <span className='text-primary'>{product?.available}</span> Piece </h1>
          <h1 className='text-lg text-center'>Minimum order: <span className='text-primary'>{product?.minOrder}</span> Piece</h1>
          <h1 className='text-sm text-start my-4'>{product?.description}</h1>
          <div className=' flex flex-col w-full'>
            <h1 className='text-3xl text-center'>Buyer Information</h1>
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
                    required: { value: true, message: 'email is required' },
                  })} />
                <label className="label pt-1 ml-2">
                  <span className="label-text-alt"></span>
                  {errors.email?.type === 'required' && <span className="label-text-alt text-[12px] text-red-600">{errors.email.message}</span>}
                </label>
              </div>
              {/* amount form */}
              <div className="form-control w-full">
                <label className="label text-sm font-semibold py-0 ml-2">
                  <span className="label-text ">Amount</span>
                </label>
                <input type="number" name='amount' className={inputClass}  {...register("amount",
                  {
                    required: { value: true, message: 'amount is required' },
                  })} />
                <label className="label pt-1 ml-2">
                  <span className="label-text-alt"></span>
                  {errors.amount?.type === 'required' && <span className="label-text-alt text-[12px] text-red-600">{errors.amount.message}</span>}
                </label>
              </div>


              <input type="submit" value='Purchase' className="btn glass modal-action w-full hover:text-white" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;