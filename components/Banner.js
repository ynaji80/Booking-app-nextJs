import Image from 'next/image'
import { useRouter } from 'next/router'
import banner from '../public/casaCover.jpg'


function Banner() {
    const router= useRouter();

    return (
        <div  className='relative opacity-90 h-[400px] sm:h-[400px] lg:h-[600px] '>
            <Image 
                src={banner}
                layout='fill'
                objectFit='cover'
            />
            <div className='absolute md:mt-10 top-1/2 w-full text-center font-bold  '>
                <p className='text-white font-black font-bold text-4xl md:text-6xl '>Made In Casablanca</p>
                <button onClick={()=>router.push({
                    pathname:'/search',
                    query:{
                        location: '',
                        startDate : new Date().toISOString(),
                        endDate : (new Date(new Date().setDate(new Date().getDate()+1))).toISOString(),
                        noGuests : 1
                    }})}
                    className=' mt-6 font-niramit bg-white text-sm md:text-lg text-black rounded-full py-3 px-10 font-bold shadow-md hover:text-pink-700 hover:shadow-xl active:scale-95 transition duration-100 ease-in'>Explore Casablanca</button>
            </div>
        </div>
    )
}

export default Banner
