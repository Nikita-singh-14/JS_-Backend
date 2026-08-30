import React from 'react'
import Button from '../Button'

const Login = () => {
  return (
    // <div  className="md:max-w-sm w-full p-6 rounded-xl shadow-xl bg-grey border border-zinc-400 hover:border-white transition-all duration-300 hover:transform hover:scale-105 group">
    //     <h2>Sign in to your account</h2>
    //     <form action="">
    //         <div className='flex flex-col'>
    //             <label htmlFor="">Email address</label>
    //             <input type="text" />
    //         </div>
    //         <div className='flex flex-col'>
    //             <label htmlFor="">Password</label>
    //             <input type="password" />
    //         </div>
    //         <div className='flex gap-2'>
    //             <label htmlFor="">Remember me</label>
    //             <input type="checkbox" />
    //         </div>
    //         <Button text="sign-in"/>
    //     </form>
    // </div>
    <div className="w-full max-w-md p-8 rounded-2xl bg-gray-800 border border-white shadow-2xl">
    <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
            Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
            Enter your details to access your account.
        </p>
    </div>

    <form className="space-y-6">
        <div className="flex flex-col gap-2">
            <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-200"
            >
                Email address
            </label>

            <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg bg-gray-800 border border-white px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-2 focus:ring-white/10"
            />
        </div>

        <div className="flex flex-col gap-2">
            <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-200"
            >
                Password
            </label>

            <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-2 focus:ring-white/10"
            />
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 accent-white"
                />

                <label
                    htmlFor="remember"
                    className="text-sm text-zinc-400 cursor-pointer"
                >
                    Remember me
                </label>
            </div>

            <a
                href="#"
                className="text-sm text-zinc-300 hover:text-white transition"
            >
                Forgot password?
            </a>
        </div>

        <Button text="Sign in" />
    </form>

    <p className="mt-8 text-center text-sm text-zinc-400">
        Don't have an account?{" "}
        <a
            href="#"
            className="font-medium text-white hover:underline"
        >
            Sign up
        </a>
    </p>
</div>
  )
}

export default Login