import Image from 'next/image'

function LargeStayCard({img,title}) {
    return (
        <div className='relative cursor-pointer'>
            <div className='relative h-72 w-72 lg:h-[350px] md:w-[500px] lg:w-[550px]'>
                <Image 
                    src={img}
                    layout='fill'
                    className='rounded-xl lg:rounded-none hover:opacity-80 hover:scale-105 transition duration-150 ease-out'
                />
            </div>
            <div>
            <h3 className='font-bold'>{title}</h3>
            </div>
        </div>
    )
}

export default LargeStayCard
