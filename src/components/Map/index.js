import React from "react"
import styled from "styled-components"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
import styles from "./styles"

const MapContainer = styled.div`
  width: 100vw;
  margin-bottom: 50px;
`

const MapComponent = ({ google }) => {
  console.log(google)

  const onMapLoaded = (mapProps, map) => {
    map.setOptions({
      styles,
    })
  }

  return (
    <MapContainer>
      <Map
        google={google}
        containerStyle={{
          position: "relative",
          height: "500px",
          width: "100%",
        }}
        initialCenter={{
          lat: 43.57115,
          lng: 12.13375,
        }}
        zoom={13}
        onReady={onMapLoaded}
      >
        <Marker name="Il nostro ufficio" />

        <InfoWindow>
          <div>
            <h1>Il nostro ufficio</h1>
          </div>
        </InfoWindow>
      </Map>
    </MapContainer>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
})(MapComponent)
