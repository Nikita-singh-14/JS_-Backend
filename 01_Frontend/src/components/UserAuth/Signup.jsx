import React, { useState } from 'react'
import Button from '../Button'

const Signup = () => {
    const [userData, setUserData] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-gray-800 border border-white shadow-2xl">
        <h2 className="text-3xl font-bold text-white">Signup</h2>
        <from className='space-y-6' onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="" 
                className="text-sm font-medium text-zinc-200">
                    FullName
                </label>

                <input 
                type="text"
                 placeholder='fullName...'
                className="w-full rounded-lg bg-gray-800 border border-white px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-2 focus:ring-white/10"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="" 
                className="text-sm font-medium text-zinc-200">
                    Username
                </label>
                
                <input 
                type="text"
                 placeholder='Username...'
                className="w-full rounded-lg bg-gray-800 border border-white px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-2 focus:ring-white/10"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="" 
                className="text-sm font-medium text-zinc-200">
                    Email Id
                </label>
                
                <input 
                type="text"
                 placeholder='youremail@gamil.com'
                className="w-full rounded-lg bg-gray-800 border border-white px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-2 focus:ring-white/10"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="" 
                className="text-sm font-medium text-zinc-200">
                    Password
                </label>
                
                <input 
                type="password"
                 placeholder='*******'
                className="w-full rounded-lg bg-gray-800 border border-white px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-2 focus:ring-white/10"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="" 
                className="text-sm font-medium text-zinc-200">
                    Avatar
                </label>
                
                <input 
                type="text"
                 placeholder='Avatar'
                className="w-full rounded-lg bg-gray-800 border border-white px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-2 focus:ring-white/10"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="" 
                className="text-sm font-medium text-zinc-200">
                    Cover Image
                </label>
                
                <input 
                type="text"
                 placeholder='Cover Image'
                className="w-full rounded-lg bg-gray-800 border border-white px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-white focus:ring-2 focus:ring-white/10"
                />
            </div>
            <Button text='Submit'/>
        </from>
    </div>
  )
}

export default Signup