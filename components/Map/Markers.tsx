import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { UserLocationContext } from '@/context/UserLocationContext';
import React, { useContext } from 'react'
import { Map,Marker } from 'react-map-gl'

function Markers() {
    const {userLocation,setUserLocation}
    =useContext(UserLocationContext);
  
    const {soruceCordinates,setSourceCordinates}
    =useContext(SourceCordiContext);
    const {destinationCordinates,setDestinationCordinates}
    =useContext(DestinationCordiContext);

  return (
    <div>
        {/* User Marker  */}
             {/* <Marker 
                longitude={userLocation?.lng} 
                latitude={userLocation?.lat} 
                anchor="bottom" >
                 <img src="./pin.png" 
                 className='w-10 h-10'
                 />
                </Marker> */}

                {/* Source marker  */}
             {soruceCordinates.length!=0? <Marker 
                longitude={soruceCordinates?.lng} 
                latitude={soruceCordinates?.lat} 
                anchor="bottom" >
                
                 
                  <img src="./location.png" 
                 className='w-10 h-10'
                 />
                
                 
                </Marker>:null}


                {/* Destination Marker  */}

                {destinationCordinates.length!=0? <Marker 
                longitude={destinationCordinates?.lng} 
                latitude={destinationCordinates?.lat} 
                anchor="bottom" >
                  <img src="./location.png" 
                 className='w-10 h-10'
                 />
                </Marker>:null}

    </div>
  )
}

export default Markers