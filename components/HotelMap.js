import { useState } from 'react';
import ReactMapGL,{Marker, Popup} from 'react-map-gl';
import {LocationMarkerIcon} from '@heroicons/react/solid';
import Image from 'next/image';

function HotelMap({hotelData}) {
  

    const [selectedResult, setSelectedResult] = useState({});

    const [viewport, setViewport] = useState({
        width :"100%",
        height :"100%",
        latitude: hotelData.lat,
        longitude: hotelData.long,
        zoom: 10
    });
    
    return (
        <ReactMapGL 
            mapStyle='mapbox://styles/ynaji80/cktax9gk24j9g18mp7l0ccro9' 
            mapboxApiAccessToken={process.env.mapbox_key} 
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            <div>
                <Marker 
                        longitude={hotelData.long}
                        latitude={hotelData.lat}
                >
                    <LocationMarkerIcon
                        onClick={()=>setSelectedResult(hotelData)}
                        className='h-10 cursor-pointer text-red-700 animate-bounce' />
                </Marker>
            </div>
        </ReactMapGL>
    )
}

export default HotelMap
