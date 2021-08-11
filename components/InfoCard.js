import Image from 'next/image';
import {HeartIcon} from '@heroicons/react/outline';
import {StarIcon} from '@heroicons/react/solid';

function InfoCard({img,location,title,description,star,price,total}) {
    return (
        <div className='flex flex-col md:flex-row space-x-4 md:space-x-7 font-body rounded-2xl py-4 md:py-7 px-2 md:pr-6 border-b group hover:shadow-xl hover:opacity-90 first:border-t'>
            <div className='relative mx-auto w-80 h-52 md:w-80 md:h-52 flex-shrink-0 group-hover:scale-95 transform transition duration-300 ease-out'>
                <Image 
                    src={img}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-2xl'
                />
            </div>
            <div className='flex flex-col flex-grow mt-4'>
                <div className='flex mr-2 md:mr-0 justify-between' >
                    <h1 className='text-gray-500 text-sm  md:text-lg'>{location}</h1>
                    <HeartIcon className='h-7 cursor-pointer hover:text-red-600'/>
                </div>    
                <h1 className='md:text-xl text-base text-gray-600 font-semibold'>{title}</h1>
                <p className="mt-2 text-base md:text-lg text-gray-400 font-medium flex-grow">{description}</p>
                <div className='flex justify-between items-end pb-5'>
                    <p className='flex items-center py-1'>
                        <StarIcon className='h-5 text-red-400'/>
                        {star}
                    </p>
                    <div className='flex mr-2 md:mr-0 flex-col items-end'>
                        <p className='text-lg lg:text-2xl font-semibold text-gray-700'>{price.split(" ")[0]}<span className='font-normal text-base'> /night</span></p>
                        <p className='text-sm text-gray-400'>{total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
