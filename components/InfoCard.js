import Image from 'next/image';
import {HeartIcon} from '@heroicons/react/outline';
import {HeartIcon as Heart} from '@heroicons/react/solid';
import {useState} from 'react';
import {StarIcon,ChevronRightIcon, ChevronLeftIcon} from '@heroicons/react/solid';
import { useRouter } from 'next/router';

function InfoCard({id,img,location,title,description,star,price,startDate,endDate,noGuests}) {
    const [favorite, setFavorite] = useState(false);
    const [imageIndex, setImageIndex] = useState(Math.floor(Math.random() * (img.length)));

    const dayDiff = (new Date(endDate).getTime() - new Date(startDate).getTime())/ (1000 * 3600 * 24);

    const router = useRouter();
    const showHotel =() => {
        router.push({
            pathname:`hotel/${id}`,
            query:{
                startDate : startDate,
                endDate : endDate,
                noGuests : noGuests
            }
        });

    }

    return (
        <div  className='flex flex-col md:flex-row space-x-4 md:space-x-7 font-body rounded-2xl py-4 md:py-7 px-2 md:pr-6 border-b group hover:shadow-xl hover:opacity-90 first:border-t'>
            <div className='relative flex items-center justify-between mx-auto w-80 h-52 md:w-80 md:h-52 flex-shrink-0 group-hover:scale-95 transform transition duration-300 ease-out'>
                <Image 
                    src={img[imageIndex]}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-2xl'
                />
                <ChevronLeftIcon
                    onClick={()=>{ if(imageIndex !==0) setImageIndex(imageIndex - 1)}}	             
                    className='ml-2 h-8 p-2 bg-white rounded-full cursor-pointer z-50 ' />
                <ChevronRightIcon 
                    onClick={()=>{ if(imageIndex !==img.length -1) setImageIndex(imageIndex + 1)}}
                    className='mr-2 h-8 p-2 bg-white rounded-full cursor-pointer z-50' />
            </div>
            <div onClick={showHotel} className='flex flex-col flex-grow mt-4 cursor-pointer'>
                <div className='flex mr-2 md:mr-0 justify-between' >
                    <h1 className='text-gray-500 text-sm  md:text-lg'>{location}</h1>
                    {!favorite?
                        <HeartIcon onClick={(e) =>{e.stopPropagation();setFavorite(!favorite)}} className='h-7 cursor-pointer hover:text-red-600'/>
                        :
                        <Heart onClick={(e) => {e.stopPropagation();setFavorite(!favorite)}} className='h-7 cursor-pointer text-red-600'/>
                    }
                </div>    
                <h1 className='md:text-xl text-base text-gray-600 font-semibold'>{title}</h1>
                <p className="mt-2 text-base md:text-lg text-gray-400 font-medium flex-grow">{description}</p>
                <div className='flex justify-between items-end pb-5'>
                    <p className='flex items-center py-1'>
                        <StarIcon className='h-5 text-red-400'/>
                        {star}
                    </p>
                    <div className='flex mr-2 md:mr-0 flex-col items-end'>
                        <p className='text-lg lg:text-2xl font-semibold text-gray-700'>{price}€<span className='font-normal text-base'> /night</span></p>
                        <p className='text-sm text-gray-400'>{dayDiff? dayDiff*price+6*noGuests:price+6*noGuests}€ total</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
