import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';

export default function Home({smallCardsData,mediumCardsData}) {
  return (
    <div>
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <main className='max-w-6xl mx-auto px-10 sm:px-16 '>
        <section className='mt-14'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>Explore Nearby</h1>
          <div className='mt-4 -mx-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {smallCardsData?.map((card,index)=>(
                  <SmallCard key={index} 
                              img={card.img} 
                              location={card.location}
                              distance={card.distance}
                  />
              ))}
          </div>
        </section>
        <section className='mt-14'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>Live Anywhere</h1>
          <div className='flex items-center mt-5 -mx-3 space-x-3 overflow-x-scroll scrollbar-hide p-3'>
              {mediumCardsData?.map((card,index) =>(
                  <MediumCard key={index}
                              img={card.img}
                              title={card.title}
                  />
              ))}
          </div>
        </section>
        <LargeCard img="http://links.papareact.com/4cj"
                   title={'Try hosting'}
                   description={'Earn extra income and unlock new opportunities by sharing your space'}
                   buttonText='Learn more'
          />
      </main>
    </div>
  )
}
export async function getStaticProps(){
  const res1 = await fetch('http://links.papareact.com/pyp');
  const smallCardsData = await res1.json();
  const res2 = await fetch('http://links.papareact.com/zp1');
  const mediumCardsData = await res2.json();
  
  return {props :{
      smallCardsData,
      mediumCardsData
          }
      }
}
