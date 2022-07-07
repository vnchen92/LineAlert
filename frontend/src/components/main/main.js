import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { GoogleMap, LoadScript, Marker, TransitLayer, Polyline } from "@react-google-maps/api";
import "../../assets/stylesheets/main.scss";
import axios from "axios";
import mapStyles from "./styles.js";
import AlertsContainer from "../alerts/alerts";
import DirectionsForm from "../directions/directions_form.js"
import DirectionsResult from "../directions/directions_result";

function MainPage({directions}) {
  const [loaded, setLoaded] = useState(false);

  const mapKey = useRef(null);

  // PROBABLY WON'T NEED THIS ANYMORE
  // useEffect(() => {
  //   axios.get("/api/google/").then((key) => {
  //     setLoaded(true);
  //     mapKey.current = key.data;
  //   });
  // }, []);

  useEffect(() => {
      setLoaded(true);
      mapKey.current = 'AIzaSyAnIbS_geF_FmCXWPVgocrZOz85lP6kCsk'
    });

  //PROBABLY WON'T NEED THIS ANYMORE if (loaded) {
    return (
      <div className="main">
        <div className="main-left-side">
          <div className="map">
            <Map />
          </div>
        </div>
        <div className="main-right-side">
          <div className="main-right-top">
            {Object.values(directions).length !== 0 ? <DirectionsResult/> : <DirectionsForm /> }
          </div>
          <div className="main-right-bottom">
            <h1>Alerts</h1>
            <AlertsContainer />
          </div>
        </div>
      </div>
    );

    function Map() {
      const center = { lat: 40.767, lng: -73.972 };
    
      const NEW_YORK_BOUNDS = {
        north: 40.867,
        south: 40.667,
        west: -74.072,
        east: -73.872
      };

      const icons = {
        alerts: {
          yellow: 'https://linealert-assets.s3.amazonaws.com/linealert-marker-pin-yellow.png',
          orange: 'https://linealert-assets.s3.amazonaws.com/linealert-marker-pin-orange.png',
          red: 'https://linealert-assets.s3.amazonaws.com/linealert-marker-pin-red.png'
        }
      };

      const markers = {
        'Union Square': { id: 1, center: {lat: 40.7359, lng: -73.9911}, color: icons.alerts.yellow },
        'Times Square': { id: 2, center: {lat: 40.7559, lng: -73.9871}, color: icons.alerts.red }
      };

      const poly = [
        {lat: 40.7359, lng: -73.9911},
        {lat: 40.7559, lng: -73.9871},
        {lat: 40.7623, lng: -73.9752},
        {lat: 40.7730, lng: -73.9855},
        {lat: 40.7830, lng: -73.9815}
      ]
      let markersArr = [];
      Object.values(markers).forEach(value => {
        markersArr.push(value)
      })

      return (
        //PROBABLY WON'T NEED THIS ANYMORE <LoadScript googleMapsApiKey={mapKey.current}>
          <GoogleMap
            //PROBABLY WON'T NEED THIS ANYMORE googleMapsApiKey={mapKey.current}
            zoom={12.5}
            center={center}
            mapContainerClassName="map-container"
            options={{
              minZoom: 11,
              panControl: false,
              disableDefaultUI: true,
              styles: mapStyles,
              restriction: {
                latLngBounds: NEW_YORK_BOUNDS,
                strictBounds: false
              }
            }}
          >
          <TransitLayer/>
            {
              markersArr.map(el => {
                return (
                  <Marker 
                    key={el.id} 
                    position={el.center} 
                    icon={el.color}
                  />
                )
              })
            }
            {/* <Polyline
              path={poly}
              options={{
                strokeColor: '#FFFFFF',
                strokeOpactiy: 1.0,
                strokeWeight: 2
              }}
            /> */}
          </GoogleMap>
        //PROBABLY WON'T NEED THIS ANYMORE </LoadScript>
      );
    }
  // }
}

const mapStateToProps = (state) => {
  return {
    directions: state.entities.directions
  };
};

export default connect(mapStateToProps)(MainPage)