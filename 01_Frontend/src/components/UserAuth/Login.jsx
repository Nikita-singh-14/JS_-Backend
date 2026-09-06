// import React from 'react'
// import Button from '../Button'

// const Login = () => {
//   return (
//     // <div  className="md:max-w-sm w-full p-6 rounded-xl shadow-xl bg-grey border border-zinc-400 hover:border-white transition-all duration-300 hover:transform hover:scale-105 group">
//     //     <h2>Sign in to your account</h2>
//     //     <form action="">
//     //         <div className='flex flex-col'>
//     //             <label htmlFor="">Email address</label>
//     //             <input type="text" />
//     //         </div>
//     //         <div className='flex flex-col'>
//     //             <label htmlFor="">Password</label>
//     //             <input type="password" />
//     //         </div>
//     //         <div className='flex gap-2'>
//     //             <label htmlFor="">Remember me</label>
//     //             <input type="checkbox" />
//     //         </div>
//     //         <Button text="sign-in"/>
//     //     </form>
//     // </div>
//     <div className="w-full max-w-md p-8 rounded-2xl bg-gray-800 border border-white shadow-2xl">
//     <div className="mb-8">
//         <h2 className="text-3xl font-bold text-white">
//             Sign in to your account
//         </h2>
//         <p className="mt-2 text-sm text-zinc-400">
//             Enter your details to access your account.
//         </p>
//     </div>

//     <form className="space-y-6">
//         <div className="flex flex-col gap-2">
//             <label
//                 htmlFor="email"
//                 className="text-sm font-medium text-zinc-200"
//             >
//                 Email address
//             </label>

//             <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 className="w-full rounded-lg bg-gray-800 border border-white px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-2 focus:ring-white/10"
//             />
//         </div>

//         <div className="flex flex-col gap-2">
//             <label
//                 htmlFor="password"
//                 className="text-sm font-medium text-zinc-200"
//             >
//                 Password
//             </label>

//             <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-2 focus:ring-white/10"
//             />
//         </div>

//         <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//                 <input
//                     id="remember"
//                     name="remember"
//                     type="checkbox"
//                     className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 accent-white"
//                 />

//                 <label
//                     htmlFor="remember"
//                     className="text-sm text-zinc-400 cursor-pointer"
//                 >
//                     Remember me
//                 </label>
//             </div>

//             <a
//                 href="#"
//                 className="text-sm text-zinc-300 hover:text-white transition"
//             >
//                 Forgot password?
//             </a>
//         </div>

//         <Button text="Sign in" />
//     </form>

//     <p className="mt-8 text-center text-sm text-zinc-400">
//         Don't have an account?{" "}
//         <a
//             href="#"
//             className="font-medium text-white hover:underline"
//         >
//             Sign up
//         </a>
//     </p>
// </div>
//   )
// }

// export default Login


import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../../Store/features/authSlice'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Logo from '../Logo'
import Input from '../Input'
import Button from '../Button'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const API_URL = import.meta.env.VITE_API_URL
    const login = async (data) => {
        setError('')
        try {
            const response = await fetch(`${API_URL}/user/login`, 
                { method: 'POST', 
                    headers: { 'Content-Type': 'application/json', }, 
                    body: JSON.stringify({ email: data.email, password: data.password, }), 
                }
            )
            const result = await response.json() 
            if (!response.ok) { 
                console.log(result.message || 'Login failed') 
            } 
            console.log('Login successful:', result)
            dispatch(authLogin(result.data)) 
            navigate('/')
        } catch (error) {
            console.error('Login Error:', error) 
            setError(error.message || 'Something went wrong')
        }
    }
    return (
        <div className='flex items-center justify-center w-full m-10'>
            <div className={`mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 border border-white/10 text-white`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-25'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-white/60'>
                    Don&apos;t have any account?&nbsp;
                    <Link
                        className='font-medium text-primary text-blue-600 transition-all duration-200 hover:underline'
                        to='/signup'>
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-ccenter'>{error}</p>}
                <form onSubmit={handleSubmit(login)}
                    className='mt-8'>
                    <div className='space-y-5'>

                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type='email'
                            {...register('email', {
                                required: 'Email is required',
                            })}
                        />

                        <Input
                            label="Password:"
                            placeholder="Enter your password"
                            type='password'
                            {...register('password', {
                                required: 'Password is required',
                            })}
                        />

                        <Button 
                        type='submit'
                        className='w-full hover:bg-blue-600 border border-white'>Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login