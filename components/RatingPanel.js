import {StarIcon} from '@heroicons/react/solid';


function RatingPanel() {
    return (
        <div className='mt-10 bg-white rounded-xl shadow-2xl px-14 py-7 flex flex-col'>
            <div className=' text-lg mb-4 text-gray-700 font-semibold '>
                Rate your experience
            </div>
            <div className='flex items-center p-1'>
                <div className='flex items-center  group cursor-pointer'>
                    <StarIcon className='h-5 text-yellow-300 group-hover:text-yellow-500'/>
                </div>
                <p className='relative font-semibold text-gray-500 text-md left-24'>Bad</p>
            </div>
            <div className='flex items-center p-1'>
                <div className='flex items-center group cursor-pointer mr-3'>
                    {[1,2].map(item =>(
                        <StarIcon key={item} className='h-5 text-yellow-300 group-hover:text-yellow-500'/>)
                        )
                    }
                </div>
                <p className='relative font-semibold text-gray-500 text-md left-16'>Okay</p>
            </div>
            <div className='flex items-center p-1 '>
                <div className='flex items-center group cursor-pointer'>
                    {[1,2,3].map(item =>(
                        <StarIcon key={item} className='h-5 text-yellow-300 group-hover:text-yellow-500'/>)
                        )
                    }
                </div>
                <p className='relative font-semibold text-gray-500 text-md left-14'>Good</p>
            </div>
            <div className='flex items-center p-1'>
                <div className='flex items-center group cursor-pointer'>
                    {[1,2,3,4].map(item =>(
                        <StarIcon key={item} className='h-5 text-yellow-300 group-hover:text-yellow-500'/>)
                        )
                    }
                </div>
                <p className='relative font-semibold text-gray-500 text-md left-9'>Great</p>
            </div>
            <div className='flex items-center p-1'>
                <div className='flex items-center group cursor-pointer'> 
                {[1,2,3,4,5].map(item =>(
                        <StarIcon key={item} className='h-5 text-yellow-300 group-hover:text-yellow-500'/>)
                        )
                    }  
                </div>
                <p className='relative font-semibold text-gray-500 text-md left-4'>Excellent</p>
            </div>
        </div>

    )
}

export default RatingPanel
