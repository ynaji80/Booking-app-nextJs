import Image from 'next/image'
import { useRouter } from 'next/router'

function Banner() {
    const router= useRouter();

    return (
        <div  className='relative opacity-90 h-[400px] sm:h-[400px] lg:h-[600px] '>
            <Image 
                src="https://images.unsplash.com/flagged/photo-1570209432247-1bb8b87a7bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1510&q=80" 
                layout='fill'
                objectFit='cover'
            />
            <div className='absolute md:mt-10 top-1/2 w-full text-center font-bold  '>
                <p className='text-white font-black font-bold text-4xl md:text-6xl'>IMAGINE A PLACE...</p>
                <button onClick={()=>router.push({
                    pathname:'/search',
                    query:{
                        location: '',
                        startDate : new Date().toISOString(),
                        endDate : (new Date(new Date().setDate(new Date().getDate()+1))).toISOString(),
                        noGuests : 1
                    }})}
                    className=' mt-6 font-niramit bg-white text-sm md:text-lg text-black rounded-full py-3 px-10 font-bold shadow-md hover:text-pink-700 hover:shadow-xl active:scale-95 transition duration-100 ease-in'>Explore our stays</button>
            </div>
        </div>
    )
}

export default Banner
