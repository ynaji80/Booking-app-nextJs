import Image from 'next/image'
import { useRouter } from 'next/router'

function Banner() {
    const router= useRouter();

    return (
        <div onClick={()=>router.push({
            pathname:'/search',
            query:{
                location: '',
                startDate : new Date().toISOString(),
                endDate : new Date().toISOString(),
                noGuests : 1
            }})} className='relative opacity-90 h-[400px] sm:h-[400px] lg:h-[600px] '>
            <Image 
                src="https://images.unsplash.com/flagged/photo-1570209432247-1bb8b87a7bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1510&q=80" 
                layout='fill'
                objectFit='cover'
            />
            <div className='absolute md:mt-10 top-1/2 w-full text-center font-bold  '>
                <p className='text-white text-3xl md:text-4xl'>On vous aide à planifier vos vacances</p>
                <button className=' mt-6 bg-white text-sm md:text-lg text-gray-900 rounded-full py-4 px-10 font-bold shadow-md hover:shadow-xl active:scale-90 transition duration-150'>Explore our stays</button>
            </div>
        </div>
    )
}

export default Banner
