import L from 'leaflet'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import './index.css'
import 'leaflet/dist/leaflet.css'
import MarkersIcon from '../../assets/img/marker_bg.png'
import { Dialog } from '@mui/material'
import { GetTeamMemberLocation } from '../../services/apiservices/staffDetail'
import NoResultFound from '../ErrorComponent/NoResultFound'

const MarkersMap = ({ openMap, handleCloseMap }) => {
  const [markers, setMarkers] = useState([])
  useEffect(() => {
    let path = window.location.pathname
    path = path.split('/').pop()
    GetTeamMemberLocation(
      { teamId: path },
      res => {
        if (res.success) {
          setMarkers(res?.data)
        }
      },
      err => {
        setMarkers([])
      },
    )
  }, [])
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
        {markers.length > 0 ? (
          <MapContainer
            className="dialogue_map"
            center={[markers[0]?.latitude, markers[0]?.longitude]}
            zoom={11}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.length > 0 &&
              markers.map(data => {
                return (
                  <Marker
                    key={data.id}
                    position={[data.latitude, data.longitude]}
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
        ) : (
          <NoResultFound />
        )}
        {/* </Box> */}
      </Dialog>
    </>
  )
}
export default MarkersMap
