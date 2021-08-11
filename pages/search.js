import Header from "../components/Header";
import { useRouter } from 'next/router';
import {format} from 'date-fns';
import InfoCard from "../components/InfoCard";


function Search({searchResultsData}) {
    const router= useRouter();
    const {location, startDate, endDate, noGuests} = router.query;
    const formattedEndDate = format(new Date(endDate), "do MMM, yyyy");
    const formattedStartDate = format(new Date(startDate), "do MMM, yyyy");
    const placeholder =`${location} | ${format(new Date(startDate), "dd MMM, yyyy")} | ${format(new Date(endDate), "dd MMM, yyyy")} | ${noGuests} guests`;


    return (
        <div>
            <Header placeholder={placeholder}/>
            <main className='flex'>
                <section className
                ='pl-2 md:pl-8 pt-14'>
                    <p className='text-normal text-gray-600'>300+ stays - <span className='bg-gray-200 rounded-md px-2 py-1'>{formattedStartDate}</span> to <span className='bg-gray-200 rounded-md px-2 py-1'>{formattedEndDate}</span> for {noGuests} guests</p>
                    <h1 className='text-4xl font-bold mt-4 text-gray-800'>Stays in {location}</h1>
                
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
            </main>
        </div>
    )
}
export async function getServerSideProps({query}){
    const res = await fetch(`https://my-json-server.typicode.com/ynaji80/mockApi/hotels?city=${query.location}`);
    const searchResultsData = await res.json();
    return {
        props :{
            searchResultsData,
        }
    }    
}

export default Search
