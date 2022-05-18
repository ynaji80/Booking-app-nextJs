import Image from "next/image";
import Head from 'next/head';
import { useRouter } from "next/router"
import {HeartIcon} from '@heroicons/react/outline';
import {HeartIcon as Heart} from '@heroicons/react/solid';
import {useEffect, useState} from 'react';
import {StarIcon, ChevronRightIcon, ChevronLeftIcon, MinusSmIcon, PlusSmIcon, ShareIcon} from '@heroicons/react/solid';
import Header from "../../../components/Header";
import { useSession } from 'next-auth/client';
import Footer from "../../../components/Footer";
import HotelMap from "../../../components/HotelMap";
import RatingPanel from "../../../components/RatingPanel";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import {format} from 'date-fns';
import CheckPanel from "../../../components/CheckPanel";


function hotel({hotelData}) {
    const router = useRouter();
    const {id,startDate,endDate,noGuests}=router.query;
    const [favorite, setFavorite] = useState(false);
    const [favoriteHotels, setFavoriteHotels] = useState([]);
    const [star, setStar] = useState(0)
    const [session] = useSession();
    const user = session? session.user: {};
    const loggedIn = session ? true : false;
    const [imageIndex, setImageIndex] = useState(0);
    const [dateStart, setDateStart] = useState(new Date(startDate));
    const [dateEnd, setDateEnd] = useState(new Date(endDate));
    const [guestsNum, setGuestsNum] = useState(parseInt(noGuests));
    const changeGuestsNum =(num) =>{
        setGuestsNum(num);
    }
    const selectionRange = {
        startDate: dateStart,
        endDate: dateEnd ,
        key: 'selection',
      }
    const handleSelect = (ranges) => {
        setDateStart(ranges.selection.startDate);
        setDateEnd(ranges.selection.endDate);
    }

    const dayDiff = (dateEnd.getTime() -dateStart.getTime())/ (1000 * 3600 * 24);
    const dateInfo =`${format(new Date(dateStart), "do MMM, yyyy")} | ${format(new Date(dateEnd), "do MMM, yyyy")}`;
    const [userId, setUserId] = useState(0);
    const [ratingInfo, setRatingInfo] = useState([]);

    useEffect(async () => {
        if (user.hasOwnProperty('email')){
            const res = await fetch(`http://localhost:5000/users?email=${user.email}`);
            const serverUser = await res.json();
            const loggedUser = serverUser[0];
            setUserId(loggedUser.id);
            setFavorite(loggedUser.favorite.includes(parseInt(id)));
            setFavoriteHotels(loggedUser.favorite);
            setRatingInfo(loggedUser.rating);
        }
        else {return;}
    }, [user]);
    
    const addFavorite= async () =>{
        if(!loggedIn) alert('Please sign in!');
        else {
            setFavorite(!favorite);
            const res = await fetch(`http://localhost:5000/users/${userId}`,{
            method:'PATCH',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({favorite:[...favoriteHotels,parseInt(id)]})
        });
        }
    }
    const deleteFavorite= async () =>{
            setFavorite(!favorite);
            const res = await fetch(`http://localhost:5000/users/${userId}`,{
            method:'PATCH',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({favorite: favoriteHotels.filter(item => item !=id)})
        });
    }

    const addRating= async (rate) =>{
        if(!loggedIn) alert('Please sign in!');
        else {
            const temp=ratingInfo.filter(item => item.id!=id);
            const res = await fetch(`http://localhost:5000/users/${userId}`,{
            method:'PATCH',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({rating:[...temp,{id:parseInt(id),hotelRating:rate}]})
            });
            await res.json().then(response => setRatingInfo(response.rating));
        }
    }

    const changeHotelRating = (ratingList) =>{
        var sum =0;
        var count=0
        ratingList?.forEach(item => {
            if(item.hasOwnProperty('userRating')){ 
                sum = sum+item.userRating; 
                count=count+1 
            }
            else{ sum=sum}
        });
        count!==0 ?setStar(sum/count): setStar("no review");
    }

    return (
        <div className=' bg-gray-100'>
            <Head>
                <title>Booking App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className='mt-16 mb-16 bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row max-w-screen-sm lg:max-w-7xl mx-auto'>

                <div className=' bg-red-400 lg:w-1/4 flex flex-col items-center rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none p-4 '>
                    <RatingPanel addRating={addRating}  loggedIn={loggedIn} ratingInfo={ratingInfo} id={id} userRatingInfo={hotelData.rating} userId={userId} changeHotelRating={changeHotelRating}/>
                    <div className='hidden lg:inline-flex'>
                        <CheckPanel
                            price={hotelData.price} 
                            dateStart={dateStart} 
                            dateEnd={dateEnd} 
                            guestsNum={guestsNum} 
                            changeGuestsNum={changeGuestsNum} 
                            dayDiff={dayDiff}
                            star={star}
                            session={session}
                            hotelData={hotelData} />
                    </div>
                </div>

                <div className='flex flex-col w-full lg:w-3/4 p-10'>
                    <div className='flex items-center justify-between' >
                        <h1 className='text-gray-800 text-2xl lg:text-3xl font-semibold'>{hotelData.location}</h1>
                        {!(favorite)?
                            <HeartIcon onClick={addFavorite}
                                className='h-7 cursor-pointer hover:text-red-600'/>
                            :
                            <Heart onClick={deleteFavorite} 
                                className='h-7 cursor-pointer text-red-600'/>
                        }
                    </div>
                    <div className='flex items-center space-x-6 '>
                        <p className='flex items-center text-gray-600 py-1'>
                            <StarIcon className='h-5 text-red-400'/>
                            {star}
                        </p>
                        <p className='flex items-center text-gray-600 cursor-pointer py-1'>
                            <ShareIcon className='h-5 text-red-400' />
                            Share
                        </p>
                        
                    </div>    
                    <div className='mt-4 flex items-center justify-between relative mx-auto w-full h-[300px] lg:h-[500px] group '>
                        <Image 
                            src={hotelData.img[imageIndex]}
                            layout='fill'
                            objectFit='cover'
                            className='rounded-2xl group-hover:brightness-75 transform transition duration-300 ease-out'
                        />
                        <ChevronLeftIcon
                            onClick={()=>{ if(imageIndex !==0) setImageIndex(imageIndex - 1)}}	             
                            className='ml-2 h-8 p-2 bg-white rounded-full cursor-pointer z-50 ' />
                        <ChevronRightIcon 
                            onClick={()=>{ if(imageIndex !==hotelData.img.length -1) setImageIndex(imageIndex + 1)}}
                            className='mr-2 h-8 p-2 bg-white rounded-full cursor-pointer z-50' />
                    </div>
                    <div className='mt-10 flex flex-col space-y-6 '>
                        <div className='flex flex-col pb-6 border-b border-gray-300' >
                            <h1 className='text-gray-800 text-xl lg:text-2xl font-semibold'>{hotelData.title}</h1>
                            <p className="mt-2 text-md lg:text-lg text-gray-500 font-medium">{hotelData.description}</p>
                        </div>
                        <div className='flex flex-col pb-6 border-b border-gray-300' >
                            <h1 className='text-gray-800 text-xl lg:text-2xl font-semibold'>About the place</h1>
                            <p className="mt-4 text-lg pr-4 text-gray-500 font-medium">{hotelData.About}</p>
                        </div> 
                        <div className='flex flex-col pb-6 border-b border-gray-300' >
                            <h1 className='text-gray-800 text-xl lg:text-2xl font-semibold'>Locate your stay</h1>
                            <section className='mt-6 mx-auto h-[250px] lg:h-[450px] w-full'>
                                <HotelMap hotelData={hotelData}/>
                            </section>
                        </div> 
                        <div className='flex flex-col pb-6 border-b border-gray-300' >
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h1 className='text-gray-800 text-xl lg:text-2xl font-semibold'>{!dayDiff? 'Select check-in - checkout dates' : `${dayDiff} nights in ${hotelData.city}`}</h1>
                                    <p className=' text-gray-500 text-sm lg:text-md '>{!dayDiff ? 'Please choose at least one night' : dateInfo}</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        setDateStart(new Date());
                                        setDateEnd(new Date());
                                        }} 
                                    className='bg-gray-100 cursor-pointer text-gray-900 text-sm lg:text-md px-4 py-2 rounded-lg' >Clear dates</button>
                            </div>
                            <section className='mt-6 flex flex-col lg:flex-row items-center justify-evenly'>
                                <DateRange
                                ranges={[selectionRange]}
                                minDate={ new Date()}
                                rangeColors={['#d67272']}
                                onChange={handleSelect}
                                
                                />
                                <CheckPanel 
                                    price={hotelData.price}  
                                    dateStart={dateStart} 
                                    dateEnd={dateEnd} 
                                    guestsNum={guestsNum} 
                                    changeGuestsNum={changeGuestsNum} 
                                    dayDiff={dayDiff}
                                    star={star}
                                    session={session} 
                                    hotelData={hotelData} />
                            </section>
                        </div> 
                    </div>
                </div>
                
                                    
                                    
            </main>
            <Footer />                        
        </div>
    )
}

export async function getServerSideProps({query}){
    const res = await fetch(`http://localhost:5000/hotels/${query.id}`);
    const hotelData = await res.json();
    return {
        props :{
            hotelData,
        }
    }    
}
export default hotel
