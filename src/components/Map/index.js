import React from "react"
import styled from "styled-components"
import {
  Map as GoogleMap,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
} from "google-maps-react"
import styles from "./styles"

const MAP_WIDTH = "100vw"
const MAP_HEIGHT = "700px"

const MapContainer = styled.div`
  width: ${MAP_WIDTH};
  margin-bottom: 50px;
`

const LoaderContainer = styled.div`
  width: ${MAP_WIDTH};
  height: ${MAP_HEIGHT};
  background: #f7f7f7;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-weight: bold;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`

const Loader = () => (
  <LoaderContainer>
    <span>Scaricamento mappe da Google...</span>
  </LoaderContainer>
)

const MapComponent = ({ google }) => {
  const onMapLoaded = (mapProps, map) => {
    map.setOptions({
      styles,
    })
  }

  return (
    <MapContainer>
      <GoogleMap
        google={google}
        containerStyle={{
          position: "relative",
          height: MAP_HEIGHT,
          width: MAP_WIDTH,
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
      </GoogleMap>
    </MapContainer>
  )
}

console.log(process.env.GOOGLE_MAPS_API_KEY)

export const Map = GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  LoadingContainer: Loader,
})(MapComponent)
