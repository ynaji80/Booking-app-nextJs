import { useState, useEffect } from 'react';
import ReactMapGL,{Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import {LocationMarkerIcon} from '@heroicons/react/solid';
import Image from 'next/image';

function Map({searchResultsData}) {
  
    
    const [selectedResult, setSelectedResult] = useState({});
    const [viewport, setViewport] = useState({});

    useEffect(() => {
        const coords =searchResultsData.map(result =>
            ({
                latitude: result.lat,
                longitude: result.long
            })
        );
        const centerCoord = getCenter(coords);
        setViewport({
            width :"100%",
            height :"100%",
            latitude: centerCoord.latitude,
            longitude: centerCoord.longitude,
            zoom: 10
        });
        
    }, [searchResultsData]);

    return (
        <ReactMapGL 
            mapStyle='mapbox://styles/ynaji80/cktax9gk24j9g18mp7l0ccro9' 
            mapboxApiAccessToken={process.env.mapbox_key} 
            onViewportChange={(viewport) => setViewport(viewport)}
            {...viewport}
            
        >
            {searchResultsData.map(
                (result,index) =>(
                    <div key={index}>
                        <Marker 
                                longitude={result.long}
                                latitude={result.lat}
                        >
                            <LocationMarkerIcon
                                onClick={()=>setSelectedResult(result)}
                                className='h-10 cursor-pointer text-red-700 animate-bounce' />
                        </Marker>
                        {selectedResult.long===result.long ?
                            <Popup
                                onClose={()=>setSelectedResult({})}
                                closeOnClick={true}
                                latitude={result.lat}
                                longitude={result.long}
                                className='z-50 bg-transparent'
                                
                            >
                                <div className='flex flex-col bg-gray-200 p-4 rounded-2xl space-y-4 '>
                                    <div className='relative w-full h-40 flex-shrink-0 group-hover:scale-95 transform transition duration-300 ease-out'>
                                        <Image 
                                            src={result.img[0]}
                                            layout='fill'
                                            objectFit='cover'
                                            className='rounded-2xl'
                                            />
                                    </div>
                                    <div>
                                        <h1 className='text-gray-500 text-sm '>{result.location}</h1>
                                        <h1 className='text-lg  text-gray-600 font-semibold'>{result.title}</h1>
                                    </div>
                                </div>
                            </Popup>
                        
                        :
                            (false)
                        }
            
            </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
