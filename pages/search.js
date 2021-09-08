import Header from "../components/Header";
import Head from 'next/head';
import { useRouter } from 'next/router';
import {format} from 'date-fns';
import InfoCard from "../components/InfoCard";
import Footer from "../components/Footer";
import Map from "../components/Map";


function Search({searchResultsData}) {
    const router= useRouter();
    const {location, startDate, endDate, noGuests} = router.query;
    const formattedEndDate = format(new Date(endDate), "do MMM, yyyy");
    const formattedStartDate = format(new Date(startDate), "do MMM, yyyy");
    const placeholder =`${location} | ${format(new Date(startDate), "dd MMM, yyyy")} | ${format(new Date(endDate), "dd MMM, yyyy")} | ${noGuests} guests`;

    return (
        <div>
            <Head>
                <title>Booking App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header placeholder={placeholder}/>
            <main className=' flex'>
                <section className
                ='pl-2 md:pl-8 pt-14'>
                    <p className='text-normal text-gray-600'>300+ stays - <span className='bg-gray-200 rounded-md px-2 py-1'>{formattedStartDate}</span> to <span className='bg-gray-200 rounded-md px-2 py-1'>{formattedEndDate}</span> for {noGuests} guests</p>
                    <h1 className='text-4xl font-bold mt-4 text-gray-800'>{location?`Stays in ${location}`:'Stays everywhere'}</h1>
                
                    <div className='flex flex-col space-y-4 mt-8'>
                        {searchResultsData?.map((item,index)=>(
                            <InfoCard 
                                key={index}
                                img={item.img}
                                location={item.location}
                                title={item.title}
                                description={item.description}
                                star={item.star}
                                price={item.price}
                                total={item.total}
                            />
                        )
                        )}
                    </div>
                </section>
                <section className='hidden xl:inline-flex xl:min-w-[600px]'>
                    <Map />
                </section>       
            </main>
            <Footer />
        </div>
    )
}
export async function getServerSideProps({query}){
    const {startDate,endDate,location}=query;
    const checkDate=new Date(startDate).toLocaleDateString().split('/').reverse().join('-');
    const uncheckDate=new Date(endDate).toLocaleDateString().split('/').reverse().join('-');
    var locationQuery =`city=${query.location}`
    if(location=='') locationQuery='';
    const res = await fetch(`https://booking-server-api.herokuapp.com/hotels?${locationQuery}&open_lte=${checkDate}&closed_gte=${uncheckDate}`);
    const searchResultsData = await res.json();
    return {
        props :{
            searchResultsData,
        }
    }    
}

export default Search
