import Image from 'next/image';
import {SearchIcon, MenuIcon, HomeIcon, LoginIcon} from '@heroicons/react/solid'
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker,DateRange } from 'react-date-range';
import { useMediaQuery } from "@react-hook/media-query";
import { useRouter } from 'next/router'
import logo from '../public/booking-logo.png'

function Header({placeholder}) {
    const [textInput,setTextInput]=useState('');
    const [toggle, setToggle] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState( new Date());
    const [numberGuests, setNumberGuests] = useState(1);
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
      }
    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }
    const isSmallScreen = useMediaQuery("(max-width: 36rem)");

    const resetInput = () => {
        setTextInput('');
        }
    
    const router= useRouter();
    const search = () =>{
        
        resetInput();
        const url = router.push({
            pathname:'/search',
            query:{
                location: textInput.charAt(0).toUpperCase() + textInput.slice(1).toLowerCase(),
                startDate : startDate.toISOString(),
                endDate : endDate.toISOString(),
                noGuests : numberGuests
            }
        });
    }

    return (
        <>
        
        <header className=' sticky top-0 z-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-none bg-white shadow-sm py-3 px-5 md:px-10'>
            <div onClick={() =>router.push('/')} className=" relative ml-4 h-14 hidden md:flex items-center cursor-pointer my-auto ">
                <Image 
                    src= {logo}
                    layout='fill'
                    objectFit='contain'
                    objectPosition='left'               
                />
            </div>
            <div className={`flex items-center justify-between md:border-2 rounded-full py-2  md:shadow-sm ${textInput? 'shadow-lg border-none bg-white': 'bg-gray-100 md:bg-white'} `}>
                <input type='text' value={textInput} onChange={(e) => {setTextInput(e.target.value)}} placeholder={placeholder || "Where to go?"} className='flex-grow font-niramit outline-none bg-transparent text-gray-500 text-sm px-4 '/>
                <button onClick={search} disabled={textInput==""} className={`mr-1 relative h-[40px] w-[40px] ${!textInput ? '' :'hover:bg-red-400 hover:rounded-full'}`}><SearchIcon className={`absolute top-1 -left-1 right-0 inline-flex h-8 group-hover:gb-red-300  rounded-full p-1 text-white hover:ring-2 hover:ring-white disabled:bg-red-300 cursor-pointer mx-2 ${!textInput ? 'bg-red-300' :'bg-red-400'}`}/></button>
            </div>
            <div className='lg:inline-flex space-x-4 items-center justify-end hidden text-gray-600'>
                    <p className=' ring-1 ring-gray-600 cursor-pointer font-semibold bg-white py-2 px-4 hover:bg-gray-100 font-niramit rounded-full '>Become a host</p>
                    <p onClick={() =>router.push('/login')} className=' ring-1 ring-gray-600 cursor-pointer font-niramit font-semibold bg-white py-2 px-4 hover:bg-gray-100 rounded-full '>Login in</p>
            </div>
            <div>
                {!toggle ?
                <MenuIcon onClick={() => setToggle(!toggle)} className='inline lg:hidden absolute h-12 w-12 text-white bg-red-600 rounded-full shadow-xl right-8 p-2 translate-y-[75vh] cursor-pointer active:scale-90 transition duration-150 z-50 overflow-none' />
                :
                <div className=' lg:hidden flex flex-col items-end absolute right-8 translate-y-[60vh] '>
                    <ul className='px-4 py-3 mb-3 relative bg-gray-900 w-36 rounded-xl shadow-xl '>
                        <li onClick={() =>{router.push('/');setToggle(!toggle)}} className='py-1 px-2 mb-1 hover:bg-gray-800 rounded-full border-gray-300 text-white  font-niramit cursor-pointer'>Home
                        </li>
                        <li onClick={() =>{router.push('/login');setToggle(!toggle)}} className='py-1 px-2 mb-1 hover:bg-gray-800 rounded-full border-gray-300 text-white font-niramit cursor-pointer'>Login
                        </li>
                        <li className='py-1 px-2 hover:bg-gray-800 rounded-full border-gray-300 text-white font-niramit cursor-pointer'>Devenir Hôte
                        </li>
                    </ul>
                    <MenuIcon onClick={() => setToggle(!toggle)} className=' h-12 w-12 text-white bg-red-600 rounded-full shadow-xl  p-2 active:scale-90 transition duration-150  cursor-pointer ' />
                </div>
                }
            </div>
                
                

            
            {textInput &&
         
                <div className='flex flex-col mt-4 mx-auto col-span-3'>
                    {!isSmallScreen ?
                        <DateRangePicker 
                        ranges={[selectionRange]}
                        minDate={ new Date()}
                        rangeColors={['#d67272']}
                        onChange={handleSelect}
                        />
                        :
                        <DateRange
                        ranges={[selectionRange]}
                        minDate={ new Date()}
                        rangeColors={['#d67272']}
                        onChange={handleSelect}
                        />
                    }
                    <div className='flex items-center pb-1 border-b'>
                        <p className='text-gray-900 text-lg md:text-2xl font-bold flex-grow'>Number of guests</p>
                        <div className='flex space-x-4 p-2 bg-gray-50 rounded-full'>
                            <button className='px-[18px] py-2 bg-gray-200 rounded-full text-gray-900 hover:ring-gray-900 font-semibold hover:ring-1 disabled:bg-gray-100 disabled:ring-0 disabled:font-normal' onClick={() => {if(numberGuests!==1) setNumberGuests(numberGuests-1)}} disabled={numberGuests===1}>-</button>
                            <input  className='w-8 bg-transparent text-xl outline-none text-red-400 text-center' readOnly="readonly" min={0} max={20} value={numberGuests} type="text"/> 
                            <button className='px-[16px] py-2 bg-gray-200 rounded-full text-gray-900 hover:ring-gray-900 font-semibold hover:ring-1 disabled:bg-gray-100 disabled:ring-0 disabled:font-normal' onClick={() => {if(numberGuests!==20) setNumberGuests(numberGuests+1);}} disabled={numberGuests===20}>+</button>
                        </div>
                    </div>
                    <div className='flex mt-2 justify-around items-center'>
                        <button className='bg-red-100 text-sm text-red-400 py-2 px-4 rounded-full hover:ring-red-400 hover:ring-1 hover:scale-x-105' onClick={resetInput} >Close</button>
                        <div onClick={search} className='hover:bg-red-400 hover:rounded-full p-1'><button className='bg-red-400 text-sm text-white py-2 px-4 rounded-full ring-2 ring-white'>Search</button></div>
                    </div>

                </div>
       
            }
        </header>
        </>
    )
}

export default Header