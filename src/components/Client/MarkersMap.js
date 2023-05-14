// import React, { useState, useRef, useEffect } from "react";
// import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";

import L from 'leaflet'

// import "leaflet/dist/leaflet.css";
// import osm from "./osm-providers";
// import cities from "./cities.json";

// const MarkersMap = () => {
//   const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
//   const ZOOM_LEVEL = 9;
//   const mapRef = useRef();

//   useEffect(() => {
//     if (mapRef.current && mapRef.current._map) {
//       // Access _leaflet_events here
//       console.log(mapRef.current._map._container);
//     }
//   }, []);

//   return (
//     <>
//       <div>
//         <div className="col text-center">
//           <h2>React-leaflet - Adding Markers to react leaflet</h2>
//           <p>Loading basic map using layer from maptiler</p>
//           <div className="col">
//             <MapContainer center={center} zoom={ZOOM_LEVEL} whenCreated={map => { mapRef.current = map }}>
//               <TileLayer
//                 url={osm.maptiler.url}
//               />

//               {cities.map((city, idx) => (
//                 <Marker
//                   position={[city.lat, city.lng]}
//                   // icon={RoomRoundedIcon}
//                   key={idx}
//                 >
//                   <Popup>
//                     <b>
//                       {city.city}, {city.country}
//                     </b>
//                   </Popup>
//                 </Marker>
//               ))}
//             </MapContainer>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import './index.css'
import 'leaflet/dist/leaflet.css'
import MarkersIcon from '../../assets/img/marker_bg.png'

import RoomRoundedIcon from '@mui/icons-material/RoomRounded'

import { Box, Dialog } from '@mui/material'
import { Circle, Height } from '@mui/icons-material'

const MarkersMap = ({ openMap, handleCloseMap }) => {
  const markers = [
    {
      latitude: 22.3006,
      longitude: 70.802,
    },
    {
      latitude: 22.114593,
      longitude: 72.573719,
    },
    {
      latitude: 22.124593,
      longitude: 70.573719,
    },
    {
      latitude: 22.124593,
      longitude: 71.573719,
    },
  ]
  const position = [37.775, -122.418]
  const icon = L.icon({ iconUrl: MarkersIcon, iconSize: [60, 60] })
  // const icon = L.icon({
  //   iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  // })

  return (
    <>
      <Dialog
        PaperProps={{ sx: { width: '60%', height: '60%' } }}
        open={openMap}
        onClose={handleCloseMap}
      >
        {/* <Box className="dialogue_map"> */}
        <MapContainer
          className="dialogue_map"
          center={[markers[0].latitude, markers[0].longitude]}
          zoom={11}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map(bike => {
            return (
              <Marker
                key={bike.latitude}
                position={[bike.latitude, bike.longitude]}
                icon={icon}
              >
                <Popup>
                  A pretty CSS3 popup.
                  <br /> Easily customizable.
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
        {/* </Box> */}
      </Dialog>
    </>
  )
}
export default MarkersMap
