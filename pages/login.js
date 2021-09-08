import React,{useState} from 'react'
import Head from 'next/head';

import {EyeIcon,EyeOffIcon} from '@heroicons/react/solid'
import Image from 'next/image';
import { useRouter } from 'next/router'
import logo from '../public/booking-log-login.png'

function login() {
    const router= useRouter();
    
    const [formInfo, setFormInfo] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formInfo;

    const [showPass, setshowPass] = useState(false);

    function onChange(e){
        setFormInfo({...formInfo,[e.target.name]:e.target.value});
    }

    function onSubmit(e){
        e.preventDefault();
        console.log({email:email,password:password});

    }
    return (
        <div className=' flex flex-col bg-gradient-to-b from-red-400 to-pink-400 h-screen w-screen justify-center items-center '>
            
            <Head>
                <title>Booking App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div onClick={() =>router.push('/')} className="absolute top-5 w-full h-16 cursor-pointer ">
                <Image 
                    src= {logo}
                    layout='fill'
                    objectFit='contain'            
                />
            </div>
            <p className='p-10 text-2xl md:text-3xl text-white text-center font-niramit font-bold'>Connectez-vous pour accéder à votre compte</p>
            <main className=' container bg-white md:w-96 w-80 h-96 rounded-2xl shadow-2xl'>
                <form onSubmit={onSubmit} className='h-full flex flex-col justify-evenly items-center mt-10'>
                    <input type='email' name='email' required placeholder='Addresse e-mail' value={email} onChange={(e) => onChange(e)} className='w-5/6 font-niramit text-xl border-b border-gray-400 outline-none py-2 focus:border-gray-800' />
                    <div className='flex items-center justify-between py-2 focus:border-gray-800 w-5/6 border-b border-gray-400'>
                        <input type={showPass?'text':'password'} name='password' required placeholder='Mot de passe' value={password} onChange={(e) => onChange(e)} className='font-niramit text-xl outline-none ' />
                        <div onClick={() => setshowPass(!showPass)}>
                            {showPass? <EyeIcon className='h-6 text-gray-500'/>
                            :
                            <EyeOffIcon className='h-6 text-gray-500'/>}
                        </div>
                    </div>
                    
                    <input type='submit' value='Se connecter' className='font-niramit text-xl text-white font-bold py-2 px-4 cursor-pointer bg-gray-400 rounded-full' />
                    <div className='mb-6 flex flex-col justify-center items-center'>
                        <p className=' text-xl font-niramit'>Vous n'êtes pas encore abonné ?</p>
                        <p className='font-niramit text-lg underline text-purple-900 active:text-red-700 cursor-pointer'>Abonnez-vous</p>
                    </div>
                    
                </form>
                
            </main>
            
        </div>
    )
}

export default login
