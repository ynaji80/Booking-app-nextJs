import Image from 'next/image'
import { useRouter } from 'next/router'

function MediumCard({img,location,country}) {
    const router= useRouter();

    return (
        <div onClick={()=>router.push({
            pathname:'/search',
            query:{
                location: country,
                startDate : new Date().toISOString(),
                endDate : new Date(new Date().setDate(new Date().getDate()+1)).toISOString(),
                noGuests : 1
            }
        })} className='cursor-pointer hover:scale-105 transform transition duration-300 ease-out '>
            <div className='relative h-64 w-64 md:h-80 md:w-80'>
                <Image 
                    src={img}
                    layout='fill'
                    className='rounded-xl'
                />
            </div>
            <div>
                <h3 className='font-bold font-niramit'>{location}</h3>
                <h5 className='text-gray-500 font-niramit'>{country}</h5>
            </div>
        </div>
    )
}

export default MediumCard
