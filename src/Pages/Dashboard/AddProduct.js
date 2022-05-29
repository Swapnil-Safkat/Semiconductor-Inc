import React from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query'
import hostLink from '../../Components/host';
import Loading from '../../Components/Loading';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const sendToDB = product => {
    delete product.linkImage;
    delete product.fileImage;
    //send to db
    fetch(`${hostLink()}/product`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(product)
    }).then(res => res.json())
      .then(inserted => {
        if (inserted.insertedId) {
          toast.success('Product added.');
          reset();
        } else toast.error('Product uploading failed! Please try again');
      })
  };
  const onSubmit = async product => {
    if (!product.linkImage && product.fileImage.length < 1) {
      toast.error('Please Attach Image and Try Again.');
      return;
    }
    if (product.linkImage) {
      product.image = product.linkImage;
      sendToDB(product);
    }
    else {
      const imgStorageKey = 'f41342e948ee937d5eb330c2e281e61f';
      const img = product.fileImage[0];
      const formData = new FormData();
      formData.append('image', img);

      const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(res => res.json())
        .then(result => {
          console.log(result);
          if (result.success) {
            product.image = result.data.url;
            sendToDB(product);
          } else toast.error('Product uploading failed! Please try again');
        })
    }

    // const img = data.image[0];
    // const formData = new FormData();
    // formData.append('image', img);
    // console.log(formData);
    // const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    // fetch(url, {
    //   method: 'POST',
    //   body: formData
    // }).then(res => res.json())
    //   .then(result => {
    //     if (result.success) {
    //       const img = result.data.url;
    //       const doctor = {
    //         name: data.name,
    //         email: data.email,
    //         specialty: data.specialty,
    //         img
    //       };
    //       //send to db
    //       fetch(`${hostLink()}doctor`, {
    //         method: 'POST',
    //         headers: {
    //           'content-type': 'application/json',
    //           authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //         },
    //         body: JSON.stringify(doctor)
    //       }).then(res => res.json())
    //         .then(inserted => {
    //           console.log(inserted)
    //           if (inserted.insertedId) {
    //             toast.success('doctor added');
    //             reset()
    //           } else toast.error('doctor adding failed');
    //         })
    //       console.log(doctor);
    //     }
    //   })
  }
  const inputClass = `input w-full mt-2 border-2 border-gray-600 focus:border-gray-100`;
  // if (isLoading) return <Loading></Loading>
  return (
    <div>
      <h1 className="text-3xl text-center p-5">Add Product</h1>
      <form className='p-5 w-full md:w-1/2 mx-auto text-white' onSubmit={handleSubmit(onSubmit)}>
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

        {/* description form */}
        <div className="form-control w-full">
          <label className="label text-sm font-semibold py-0 ml-2">
            <span className="label-text ">Description</span>
          </label>
          <input type="text" name='description' className={inputClass}  {...register("description",
            {
              required: { value: true, message: 'Description is required' }
            })} />
          <label className="label pt-1 ml-2">
            <span className="label-text-alt"></span>
            {(errors.description?.type === 'required') && <span className="label-text-alt text-[12px] text-red-600">{errors.description.message}</span>}
          </label>
        </div>

        {/* price form */}
        <div className="form-control w-full">
          <label className="label text-sm font-semibold py-0 ml-2">
            <span className="label-text ">Price</span>
          </label>
          <input type="number" name='price' className={inputClass}  {...register("price",
            {
              required: { value: true, message: 'Price is required' }
            })} />
          <label className="label pt-1 ml-2">
            <span className="label-text-alt"></span>
            {(errors.price?.type === 'required') && <span className="label-text-alt text-[12px] text-red-600">{errors.price.message}</span>}
          </label>
        </div>
        {/* available form */}
        <div className="form-control w-full">
          <label className="label text-sm font-semibold py-0 ml-2">
            <span className="label-text ">Available Quantity</span>
          </label>
          <input type="number" name='available' className={inputClass}  {...register("available",
            {
              required: { value: true, message: 'Available Quantity is required' }
            })} />
          <label className="label pt-1 ml-2">
            <span className="label-text-alt"></span>
            {(errors.available?.type === 'required') && <span className="label-text-alt text-[12px] text-red-600">{errors.available.message}</span>}
          </label>
        </div>
        {/* min order form */}
        <div className="form-control w-full">
          <label className="label text-sm font-semibold py-0 ml-2">
            <span className="label-text ">Minimum Order Quantity</span>
          </label>
          <input type="number" name='minOrder' className={inputClass}  {...register("minOrder",
            {
              required: { value: true, message: 'Minimum Order Quantity is required' }
            })} />
          <label className="label pt-1 ml-2">
            <span className="label-text-alt"></span>
            {(errors.minOrder?.type === 'required') && <span className="label-text-alt text-[12px] text-red-600">{errors.minOrder.message}</span>}
          </label>
        </div>

        {/* photo form */}

        <div class="flex flex-col form-control w-full border-2 rounded-lg p-4">
          <h1 className='text-lg text-center text-white'>Image</h1>
          <div class="">
            <label className="label text-sm font-semibold py-0 ml-2">
              <span className="label-text ">Attach Image file</span>
            </label>
            <input type="file" name='fileImage' className="
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
              {...register("fileImage")} />
          </div>
          <div class="divider text-xs">OR</div>
          <div class="">
            <label className="label text-sm font-semibold py-0 ml-2">
              <span className="label-text ">Attach Image Link</span>
            </label>
            <input type="text" name='linkImage' className={inputClass}  {...register("linkImage")} />
          </div>
        </div>

        <div className="form-control w-full">



        </div>

        <input type="submit" value='Add Product' className="btn glass modal-action w-full hover:text-white" />
      </form>
    </div>
  );
};


export default AddProduct;