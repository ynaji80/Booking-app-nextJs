import {useEffect, useState} from 'react'
import Head from 'next/head';
import {EyeIcon,EyeOffIcon} from '@heroicons/react/solid'
import Image from 'next/image';
import { useRouter } from 'next/router'
import logo from '../public/booking-log-login.png'
import{signIn, signOut, useSession} from 'next-auth/client'

function login() {
    const [session, loading] = useSession();
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
    const user = session? session?.user:{};

    useEffect(async () => {
        const users = await fetchUsers();
        var post=1;
        if(!user.hasOwnProperty('email')) post=0;
        users.map((serverUser)=>{
            if (serverUser.email==user.email) post=0;
            });
        if (post==1) {addUser(user);}
    }, [user]);

    const addUser = async (user) =>{
        const res = await fetch('http://localhost:8000/users',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({["name"]:user.name,["email"]:user.email,["favorite"]:[],["rating"]:[],["booked"]:[]})
        });
    }
    const fetchUsers = async () =>{
        const res = await fetch('http://localhost:8000/users');
        const users = await res.json();
        return users;
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
            <p className='p-10 text-2xl md:text-3xl text-white text-center font-niramit font-bold'>{session ?'Sign out':'Sign in to access your account'}</p>

            {!session?
                <main className=' container flex flex-col items-center justify-between bg-white md:w-96 w-80 h-96 rounded-2xl shadow-2xl'>
                    <button 
                        onClick={() =>signIn('google')} className='flex items-center  h-16 p-3 mt-6 w-5/6 border border-black rounded-md group hover:bg-indigo-50 duration-150 transition ease-out '>
                        <img className='h-6' src="https://img.icons8.com/color/48/000000/google-logo.png"/>
                        <p className='group-hover:text-blue-800 flex-grow text-sm font-semibold font-poppings'>Sign in with Google</p>
                    </button>
                    <p className='border-b  border-gray-400 text-white w-5/6'> g</p>
                    <form onSubmit={onSubmit} className='h-full flex flex-grow flex-col justify-evenly items-center'>
                        <input type='email' name='email' required placeholder='e-mail' value={email} onChange={(e) => onChange(e)} className='w-5/6 font-niramit text-xl border-b border-gray-400 outline-none py-2 focus:border-gray-800' />
                        <div className='flex items-center justify-between py-2 focus:border-gray-800 w-5/6 border-b border-gray-400'>
                            <input type={showPass?'text':'password'} name='password' required placeholder='Password' value={password} onChange={(e) => onChange(e)} className='font-niramit text-xl outline-none ' />
                            <div onClick={() => setshowPass(!showPass)}>
                            {showPass? <EyeIcon className='h-6 text-gray-500'/>
                            :
                            <EyeOffIcon className='h-6 text-gray-500'/>}
                            </div>
                        </div>
                    
                        <input type='submit' value='Sign in' className=' mt-2 font-niramit text-xl text-white font-bold py-2 px-4 cursor-pointer bg-gray-400 rounded-full' />
                        <div className='mb-2 flex flex-col justify-center items-center'>
                            <p className=' text-xl font-niramit'>You don't have an account ?</p>
                            <p className='font-niramit text-lg underline text-purple-900 active:text-red-700 cursor-pointer'>Register</p>
                        </div>
                    
                    </form>
                
                </main>
            :
                <main className=' container flex flex-col items-center justify-between bg-white md:w-96 w-80 rounded-2xl shadow-2xl'>
                    <div className='mt-6 flex flex-col items-center space-y-2 cursor-pointer'> 
                            <img className='rounded-full h-12' src={session?.user.image} />
                            <p className='text-lg font-semibold font-niramit'> {session?.user.name}</p>   
                    </div>
                    <button onClick={() =>signOut()} className=' m-6 font-niramit text-xl text-white font-bold py-2 px-4 cursor-pointer bg-gray-400 rounded-full' >
                        Sign out
                    </button>
                </main>
            }
            
        </div>
    )
}

export default login
