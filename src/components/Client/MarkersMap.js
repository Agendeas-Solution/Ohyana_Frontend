// import React, { useState, useRef, useEffect } from "react";
// import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import L from 'leaflet'

// import "leaflet/dist/leaflet.css";
// import osm from "./osm-providers";
// import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
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
const MarkersMap = () => {
  const [markers, setMarkers] = useState([
    {
      latitude: 23.114593,
      longitude: 72.573719,
    },
    {
      latitude: 23.114593,
      longitude: 72.573719,
    },
    {
      latitude: 23.114593,
      longitude: 72.573719,
    },
  ])
  const position = [37.775, -122.418]
  const icon = L.icon({ iconUrl: '../../assets/img/warning.png' })
  return (
    <>
      <MapContainer
        center={[markers[0].latitude, markers[0].longitude]}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[markers[0].latitude, markers[0].longitude]}
          icon={icon}
        >
          <Popup>
            A pretty CSS3 popup.
            <br /> Easily customizable.
          </Popup>
        </Marker>
        {markers.map(bike => {
          ;<Marker
            key={bike.latitude}
            position={[bike.latitude, bike.longitude]}
          >
            <Popup>
              A pretty CSS3 popup.
              <br /> Easily customizable.
            </Popup>
          </Marker>
        })}
      </MapContainer>
    </>
  )
}
export default MarkersMap
