import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

function Map() {
    const [viewport, setViewport] = useState({
        width :'100%',
        height :'100%',
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });

    return (
        <ReactMapGL 
            mapStyle='mapbox://styles/ynaji80/cktax9gk24j9g18mp7l0ccro9' 
            mapboxApiAccessToken={process.env.mapbox_key} 
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            
        </ReactMapGL>
    )
}

export default Map
