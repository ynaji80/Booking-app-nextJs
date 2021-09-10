import Image from "next/image"

function ArticleCard({img,title,description}) {
    return (
        <div className='cursor-pointer p-6 relative  flex flex-col lg:space-y-8 lg:ring-1 ring-gray-500 lg:h-[460px] '>
            <div className='relative h-52 w-80 '>
                <Image 
                    src={img}
                    layout='fill'
                    className=' hover:opacity-80 hover:scale-105 transition duration-150 ease-out'
                />
            </div>
            <div className='space-y-2 w-72 relative -top-6 bg-white shadow-xl px-6 py-8 lg:p-0 lg:top-0 lg:shadow-none'>
                <h3 className='md:text-2xl  cursor-pointer hover:underline text-xl text-gray-700 font-bold'>{title}</h3>
                <p className='text-gray-500 md:text-base text-sm'>{description}</p>
            </div>
        </div>
    )
}

export default ArticleCard
