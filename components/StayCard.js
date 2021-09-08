import Image from 'next/image'

function StayCard({img,title}) {
    return (
        <div className='cursor-pointer relative '>
            <div className='relative h-72 w-72 lg:h-[350px] lg:w-[360px]'>
                <Image 
                    src={img}
                    layout='fill'
                    className='rounded-xl lg:rounded-none hover:opacity-80 hover:scale-105 transition duration-150 ease-out'
                />
            </div>
            <div>
                <h3 className='font-bold font-niramit'>{title}</h3>
            </div>
        </div>
    )
}

export default StayCard
