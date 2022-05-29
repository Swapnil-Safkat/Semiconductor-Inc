import React from 'react';
import { useSignInWithGoogle, useCreateUserWithEmailAndPassword, useUpdateProfile, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading';
import auth from '../../Firebase.init';
import useTokens from '../../Hooks/useTokens';

const SignUp = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification, sending] = useSendEmailVerification(auth);
  const [updateProfile, updating, errorUpdate] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const [token] = useTokens(user || userGoogle);
  if (loading || loadingGoogle || updating || sending) { return <Loading /> }
  if (token) {
    navigate('/appointment')
  }
  const onSubmit = async data => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await sendEmailVerification();
    toast('Email Verification Mail Send. Please Check Your Email!')
    await updateProfile({ displayName: data.name });
  }
  const inputClass = `input w-full mt-2 border-2 border-gray-300`;
  return (
    <div className="hero w-full sm:w-11/12 my-auto">
      <div className="hero-content w-full flex-col lg:flex-row justify-around">
        <div className="text-center  lg:text-left text-gray-100 mx-6">
          <h1 className="text-5xl font-bold">Welcome to Semiconductor Inc!</h1>
          <p className="py-6 text-gray-200">Join The Largest Community of <span className='text-accent'>Engineers</span>.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-neutral">
          <div className="w-full p-5 rounded-2xl  shadow-2xl">
            <h3 className="font-bold text-lg text-center text-accent my-6">Sign Up</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='text-white'>
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
                  {errors.name?.type === 'required' && <span className="label-text-alt text-[12px] text-red-500">{errors.name.message}</span>}
                </label>
              </div>

              {/* email form */}
              <div className="form-control w-full">
                <label className="label text-sm font-semibold py-0 ml-2">
                  <span className="label-text ">Email</span>
                </label>
                <input type="email" name='email' className={inputClass}  {...register("email",
                  {
                    required: { value: true, message: 'Email is required' },
                    pattern: { value: /[A-Za-z0-9]+@[a-z]+\.[a-z]{2,3}/, message: 'Provide a valid email' }
                  })} />
                <label className="label pt-1 ml-2">
                  <span className="label-text-alt"></span>
                  {(errors.email?.type === 'required' || errors.email?.type === 'pattern') && <span className="label-text-alt text-[12px] text-red-500">{errors.email.message}</span>}
                </label>
              </div>

              {/* password form */}
              <div className="form-control w-full">
                <label className="label text-sm font-semibold  py-0 ml-2">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' className={inputClass}  {...register("password",
                  {
                    required: { value: true, message: 'Password is required!' },
                    minLength: { value: 6, message: 'Must contain 6 character or more!' }
                  })} />
                <label className="label pt-1 ml-2">
                  <span className="label-text-alt"></span>
                  {(errors.password?.type === 'required' || errors.password?.type === 'minLength') && <span className="label-text-alt text-[12px] text-red-500">{errors.password.message}</span>}
                </label>
              </div>
              <input disabled={loading} type="submit" value='Sign Up' className="btn glass modal-action w-full hover:text-white" />
              <p className='text-[12px] text-red-500 text-center font-semibold my-2'>{(error || errorUpdate) && (error?.message || errorUpdate?.message)}</p>
            </form>

            <Link to='/login'><h1 className='text-[14px] text-center text-accent font-semibold ml-2 my-2 hover:cursor-pointer hover:underline'>Already Have an Account? <span className='text-fuchsia-400'>Login</span></h1></Link>
            <div className="divider px-4 text-accent text-base mt-4">OR</div>
            <button disabled={loadingGoogle} onClick={() => { signInWithGoogle() }} className="btn btn-outline p-0 w-full">CONTINUE WITH GOOGLE</button>
            <p className='text-[12px] text-red-500 text-center font-semibold my-2'>{errorGoogle && errorGoogle?.message}</p>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default SignUp;