import Image from 'next/image'

function Banner() {
    return (
        <div className='relative h-[400px] sm:h-[400px] lg:h-[500px] '>
            <Image 
                src='https://a0.muscache.com/im/pictures/e4a2a61c-589f-4e49-b3b8-968a6bc23389.jpg?im_w=2560' 
                layout='fill'
                objectFit='cover'
            />
            <div className='absolute top-5 w-full text-center font-bold md:px-16 md:text-left md:top-1/2 md:w-[450px] '>
                <p className='text-white text-xl md:text-3xl'>Not sure where to go? Perfect</p>
                <button className=' bg-white text-gray-900 rounded-full py-4 px-10 font-bold mt-2 shadow-md hover:shadow-xl active:scale-90 transition duration-150'>I'm flexible</button>
            </div>
        </div>
    )
}

export default Banner
