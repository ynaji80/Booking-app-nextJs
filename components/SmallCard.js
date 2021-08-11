import Image from 'next/image'
import { useRouter } from 'next/router'

function SmallCard({ img,location,distance }) {
    const router= useRouter();

    return (
        <div onClick={()=>router.push({
            pathname:'/search',
            query:{
                location: location,
                startDate : new Date().toISOString(),
                endDate : new Date().toISOString(),
                noGuests : 1
            }
        })} className='flex items-center space-x-4 mt-4 mx-2 cursor-pointer rounded-xl hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out '>
            <div className='relative h-16 w-16 '>
                <Image 
                    src={img}
                    layout='fill'
                    className='rounded-lg'
                />
            </div>
            <div>
                <h3 className='font-bold'>{location}</h3>
                <h5 className='text-gray-500'>{distance}</h5>
            </div>

        </div>
    )
}

export default SmallCard
