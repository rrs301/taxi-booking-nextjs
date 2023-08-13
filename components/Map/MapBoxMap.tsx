import { UserLocationContext } from '@/context/UserLocationContext'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Map,Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from './Markers';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';
function MapboxMap() {

    const mapRef=useRef<any>();
    const {userLocation,setUserLocation}=useContext(UserLocationContext);
    const {soruceCordinates,setSourceCordinates}
    =useContext(SourceCordiContext);
    const {destinationCordinates,setDestinationCordinates}
    =useContext(DestinationCordiContext);

   
 //Use to Fly to Source Marker Location
   
    useEffect(()=>{
      if(soruceCordinates)
        {
          mapRef.current?.flyTo({
            center:[soruceCordinates.lng, 
              soruceCordinates.lat],
              duration:2500
          })
        }

    },[soruceCordinates])
 //Use to Fly to Destination Markers Location
 useEffect(()=>{
  if(destinationCordinates)
    {
      mapRef.current?.flyTo({
        center:[destinationCordinates.lng, 
          destinationCordinates.lat],
          duration:2500
      })
    }

},[destinationCordinates])

// const getDirectionRoute=()=>{
  
// }


  return (
    <div className='p-5'>
        <h2 className='text-[20px] font-semibold'>Map</h2>
        <div className='rounded-lg overflow-hidden'>
        {userLocation? <Map
        ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
            longitude: userLocation?.lng,
            latitude: userLocation?.lat,
            zoom: 14
        }}
        style={{width: '100%', height: 450,borderRadius:10}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        >

          
              <Markers/> 
            </Map>:null}
    </div>
    </div>
  )
}

export default MapboxMap