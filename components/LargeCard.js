import Image from 'next/image'

function LargeCard({ img, title, description, buttonText}) {
    return (
        <section className='relative mt-14'>
            <div className='relative h-96 min-w-60'>
                <Image src={img}
                       layout='fill'
                       objectFit='cover'
                       className='rounded-2xl'
                />
            </div>
            <div className='absolute w-full text-center top-5 lg:top-32 lg:left-12 lg:w-[400px] lg:text-left'>
                <h1 className='text-3xl lg:text-4xl font-bold'>{title}</h1>
                <p className='mt-3 text-xl font-semibold'>{description}</p>
                <button className='text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-7'>{buttonText}</button>
            </div>
            
        </section>
    )
}

export default LargeCard
