import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import SmallCard from '../components/SmallCard';
import CityCard from '../components/CityCard';
import StayCard from '../components/StayCard';
import LargeStayCard from '../components/LargeStayCard';
import Image from 'next/image';
import Footer from '../components/Footer';
import hostImage from '../public/host.webp'
import ArticleCard from '../components/ArticleCard';
import { useState } from 'react';
import {Transition, animated} from 'react-spring';

export default function Home({cityCardsData, stayCardsData, articleCardsData}) {
  const [articleCategory, setArticleCategory] = useState('Destinations');
  return ( 
    <div>
      <Head>
        <title>Booking App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <main className='max-w-7xl mx-auto px-10 sm:px-16 '>
        <section className='mt-28'>
          <h1 className='text-2xl font-niramit md:text-3xl font-bold text-gray-900'>Around the world</h1>
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
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900 font-niramit'>Special stays</h1>
          <div className='mt-5  flex flex-col items-center space-y-4 lg:space-y-0 lg:flex-row lg:justify-between p-3'>
              {stayCardsData.slice(0,3)?.map((card,index) =>(
                  <StayCard   key={index}
                              img={card.img}
                              title={card.title}
                  />
              ))}
          </div>
          <div className=' flex flex-col space-y-4 items-center lg:space-y-0 lg:flex-row lg:justify-between p-3'>
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
        <section className='mt-14 bg-blue-50 h-[600px] flex flex-col lg:flex-row items-center justify-center space-y-10 lg:space-y-0 lg:space-x-14'>
          <div className=' relative w-40 h-40 lg:w-64 lg:h-64 '>
            <Image  src={hostImage}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-full'
            />
          </div> 
          <div className=' flex flex-col items-center w-4/5 lg:w-2/5'>
              <h1 className='text-2xl lg:text-4xl font-bold font-niramit '>Become a host</h1>
              <p className='mt-3 lg:mt-5 text-lg lg:text-xl font-semibold font-niramit text-gray-500 text-center'>No matter what kind of stay you have to share, we make it simple and secure to host travellers. You’re in full control of your availability, prices, house rules, and how you interact with guests.</p>
              <button className='text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-7 font-niramit'>Learn more</button>
          </div>
          
        
        </section>

      <section className='max-w-7xl mt-14 mx-auto px-10 sm:px-16 '>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900 font-niramit'>Trip articles</h1>
          <ul className='flex mt-8 mb-6 space-x-4  justify-center'>
            <button disabled={articleCategory=='Destinations'} onClick={(e)=>setArticleCategory(e.target.innerText)} className='cursor-pointer disabled:text-red-800 hover:underline text-gray-500  font-semibold font-niramit focus:text-red-800  hover:text-red-800'>Destinations</button>
            <button disabled={articleCategory=='Beach'} onClick={(e)=>setArticleCategory(e.target.innerText)} className='cursor-pointer disabled:text-red-800 hover:underline text-gray-500  font-semibold font-niramit hover:text-red-800 focus:text-red-800'>Beach</button>
            <button disabled={articleCategory=='Travel tips'} onClick={(e)=>setArticleCategory(e.target.innerText)} className='cursor-pointer disabled:text-red-800 hover:underline text-gray-500  font-semibold font-niramit hover:text-red-800 focus:text-red-800'>Travel tips</button>
          </ul>
          <Transition
                items={articleCategory}
                from={{opacity:0, marginLeft:-120}}
                enter={{opacity:1, marginLeft:0}}
                config={{duration:400}}
            >
              {(styles,item) =>item && <animated.div style={styles}>
                      <div className='mt-5 flex flex-col items-center lg:space-y-0 lg:space-x-4 lg:flex-row '>
                          {(articleCardsData.filter(article => article.category==articleCategory))?.map((article,index) =>(
                                <ArticleCard  key={index}
                                              img={article.img}
                                              title={article.title}
                                              description={article.description}
                                />
                            ))}
                      </div>
                  </animated.div>
                  }
          </Transition>
      </section>
      <Footer />
    </div>
  )
}

export async function getStaticProps(){
  const res1 = await fetch('https://booking-server-api.herokuapp.com/cityCards');
  const cityCardsData = await res1.json();
  const res2 = await fetch('https://booking-server-api.herokuapp.com/stayCards');
  const stayCardsData = await res2.json();
  const res3 = await fetch('https://booking-server-api.herokuapp.com/articles');
  const articleCardsData = await res3.json();
  return {props :{
      cityCardsData,
      stayCardsData,
      articleCardsData
          }
      }
}
