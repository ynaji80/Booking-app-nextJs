import {StarIcon} from '@heroicons/react/solid';
import { useEffect, useState } from 'react';

function RatingPanel({addRating, loggedIn, ratingInfo, id, userRatingInfo, userId, changeHotelRating}) {
    const [hotelRating, setHotelRating] = useState(0)
    useEffect(async () => {
            setHotelRating(ratingInfo.filter(item => item.id==id)[0]?.hotelRating);
            const temp=userRatingInfo.filter(item => item.id!=userId);
            const res = await fetch(`https://booking-server-api.herokuapp.com/hotels/${id}`,{
                method:'PATCH',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify({rating:[...temp,{id:userId,userRating:hotelRating}]})
            });
            const hotelData=await res.json();
            changeHotelRating(hotelData.rating);
    }, [ratingInfo,hotelRating])
   
    return (
        <div className='mt-10 bg-white rounded-xl shadow-2xl px-14 py-7 flex flex-col'>
            <div className=' text-lg mb-4 text-center text-gray-700 font-semibold '>
                {hotelRating? `You rated : ${hotelRating}/5` :'Rate your experience'}
            </div>
            <div className='flex items-center p-1'>
                <button onClick={() => addRating(parseInt(document.getElementById('rate1').value))} id='rate1' value={1} className='flex items-center group cursor-pointer'>
                    <StarIcon  className={`h-5 ${hotelRating==1? 'text-yellow-500':'text-yellow-300'}  group-hover:text-yellow-500`} />
                </button>
                <p className={`relative font-semibold ${hotelRating==1? 'text-yellow-500':'text-gray-500'} text-md left-24`}>Bad</p>
            </div>
            <div className='flex items-center p-1'>
                <button onClick={() => addRating(parseInt(document.getElementById('rate2').value))} id='rate2' value={2} className='flex items-center group cursor-pointer mr-3'>
                    {[1,2].map(item =>(
                        <StarIcon key={item} className={`h-5 ${hotelRating==2? 'text-yellow-500':'text-yellow-300'}  group-hover:text-yellow-500`}/>)
                        )
                    }
                </button>
                <p className={`relative font-semibold ${hotelRating==2? 'text-yellow-500':'text-gray-500'} text-md left-16`}>Okay</p>
            </div>
            <div className='flex items-center p-1 '>
                <button onClick={() => addRating(parseInt(document.getElementById('rate3').value))} id='rate3' value={3} className='flex items-center group cursor-pointer'>
                    {[1,2,3].map(item =>(
                        <StarIcon key={item} className={`h-5 ${hotelRating==3? 'text-yellow-500':'text-yellow-300'}  group-hover:text-yellow-500`}/>)
                        )
                    }
                </button>
                <p className={`relative font-semibold ${hotelRating==3? 'text-yellow-500':'text-gray-500'} text-md left-14`}>Good</p>
            </div>
            <div className='flex items-center p-1'>
                <button onClick={() => addRating(parseInt(document.getElementById('rate4').value))} id='rate4' value={4} className='flex items-center group cursor-pointer'>
                    {[1,2,3,4].map(item =>(
                        <StarIcon key={item} className={`h-5 ${hotelRating==4? 'text-yellow-500':'text-yellow-300'}  group-hover:text-yellow-500`}/>)
                        )
                    }
                </button>
                <p className={`relative font-semibold ${hotelRating==4? 'text-yellow-500':'text-gray-500'} text-md left-9`}>Great</p>
            </div>
            <div className='flex items-center p-1'>
                <button onClick={() => addRating(parseInt(document.getElementById('rate5').value))} id='rate5' value={5} className='flex items-center group cursor-pointer'> 
                {[1,2,3,4,5].map(item =>(
                        <StarIcon key={item} className={`h-5 ${hotelRating==5? 'text-yellow-500':'text-yellow-300'}  group-hover:text-yellow-500`}/>)
                        )
                    }  
                </button>
                <p className={`relative font-semibold ${hotelRating==5? 'text-yellow-500':'text-gray-500'} text-md left-4`}>Excellent</p>
            </div>
        </div>

    )
}

export default RatingPanel
