import {StarIcon, MinusSmIcon, PlusSmIcon} from '@heroicons/react/solid';
import {format} from 'date-fns';

function CheckPanel({price,star,dateStart,dateEnd,guestsNum,changeGuestsNum,dayDiff}) {

    return (
        <div className='bg-white rounded-xl shadow-2xl px-8 py-7 flex flex-col mt-6'>
            <div className='flex items-center justify-between'>
                <p className='text-xl font-semibold text-gray-700'>{price}€<span className='font-normal text-sm'> /night</span></p>
                <p className='flex items-center py-1'>
                    <StarIcon className='h-5 text-yellow-400'/>
                    {star}
                </p>
            </div>
            <div className='mt-4 flex items-center'>
                <div className='py-2 px-4  border border-gray-400 hover:border-gray-700 rounded-l-lg'>
                    <p className='font-bold text-xs font-roboto '>CHECK-IN</p>
                    <p className=' text-gray-500 text-sm'>{format(new Date(dateStart), "do MMM, yyyy")}</p>
                </div>
                <div className='py-2 px-4 ring-1 ring-gray-400 hover:ring-gray-700 rounded-r-lg'>
                    <p className='font-bold text-xs font-roboto '>CHECKOUT</p>
                    <p className=' text-gray-500 text-sm '>{format(new Date(dateEnd), "do MMM, yyyy")}</p>
                </div>
            </div>
            <button className='mt-4 flex items-center justify-between py-2 px-4  border border-gray-400 focus:border-gray-700 rounded-lg'>
                <div className='flex flex-col items-start'>
                    <p className='font-bold text-xs font-roboto '>GUESTS</p>
                    <p className=' text-gray-500 text-sm'>{guestsNum} guests</p>
                </div>
                <div className='flex items-center space-x-2 ' >
                    <MinusSmIcon onClick={()=>{ if(guestsNum!==1) changeGuestsNum(guestsNum-1)}} className='h-6 text-gray-400 bg-gray-100 rounded-full' />
                    <p className=' text-gray-500 '>{guestsNum}</p>
                    <PlusSmIcon onClick={()=>{ if(guestsNum!==9) changeGuestsNum(guestsNum+1)}} className='h-6 text-gray-400 bg-gray-100 rounded-full' />
                </div>
            </button>
            <div className='mt-4 flex items-center justify-between'>
                <p className='text-gray-500 text-sm underline'>{`${dayDiff} nights x ${price}€`}</p>
                <p className=' text-gray-500 '>{dayDiff*price}€</p>
            </div>
            <div className='mt-1 flex items-center justify-between '>
                <p className='text-gray-500 text-sm underline'>Additional fee for each guest</p>
                <p className=' text-gray-500 '>{dayDiff?guestsNum*6:0}€</p>
            </div>
            <div className='mt-4 pt-4 flex items-center justify-between border-t border-gray-400'>
                <p className='text-gray-700 font-semibold'>Total</p>
                <p className='text-gray-700 font-semibold'>{dayDiff?dayDiff*price+6*guestsNum:0}€</p>
            </div>
            <button className='mt-4 py-2 px-4 bg-red-400 text-white font-semibold font-niramit rounded-md'>
                Book
            </button>
        </div>
    )
}

export default CheckPanel
