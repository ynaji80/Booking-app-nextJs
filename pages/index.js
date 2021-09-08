import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import SmallCard from '../components/SmallCard';
import CityCard from '../components/CityCard';
import StayCard from '../components/StayCard';
import LargeStayCard from '../components/LargeStayCard';

import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';

export default function Home({cityCardsData,stayCardsData}) {
  return (
    <div>
      <Head>
        <title>Booking App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <main className='max-w-7xl mx-auto px-10 sm:px-16 '>
        <section className='mt-14'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>Explorer le monde</h1>
          <div className='flex items-center mt-5 -mx-3 space-x-3 overflow-x-scroll scrollbar-hide p-3'>

              {cityCardsData?.map((card,index)=>(
                  <CityCard key={index} 
                              img={card.img} 
                              location={card.location}
                              country={card.country}
                  />
              ))}
          </div>
        </section>
        <section className='mt-14'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>Live Anywhere</h1>
          <div className='mt-5  flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between p-3'>
              {stayCardsData.slice(0,3)?.map((card,index) =>(
                  <StayCard   key={index}
                              img={card.img}
                              title={card.title}
                  />
              ))}
          </div>
          <div className=' flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between p-3'>
              {stayCardsData.slice(3)?.map((card,index) =>(
                      <LargeStayCard 
                                  key={index}
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
        <section className='mt-14'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>Trip articles</h1>
          <div className='mt-5  flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between p-3'>
              {stayCardsData.slice(0,3)?.map((card,index) =>(
                  <StayCard   key={index}
                              img={card.img}
                              title={card.title}
                  />
              ))}
          </div>
          <div className=' flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between p-3'>
              {stayCardsData.slice(3)?.map((card,index) =>(
                      <LargeStayCard 
                                  key={index}
                                  img={card.img}
                                  title={card.title}
                      />
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
export async function getStaticProps(){
  const res1 = await fetch('https://booking-server-api.herokuapp.com/cityCards');
  const cityCardsData = await res1.json();
  const res2 = await fetch('https://booking-server-api.herokuapp.com/stayCards');
  const stayCardsData = await res2.json();
  
  return {props :{
      cityCardsData,
      stayCardsData
          }
      }
}
