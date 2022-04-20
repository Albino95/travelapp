import React from 'react';
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOutlindedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating'
import makeStyles from './styles'
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildCliked, weatherData}) => {
  const classes = makeStyles();
  const isMobile = useMediaQuery('(min-width: 600)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
      bootstrapURLKeys={{key: process.env.GOOGLE_MAPS_API}}
      defaultCenter={coordinates}
      center={coordinates}
      defaultZoom={14}
      margin={[50, 50, 50 , 50]}
      options={''}
      onChange={(e) => {
        setCoordinates({lat: e.center.lat, lng: e.center.lng})
        setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
      }}
      onChildClick={(child) => setChildCliked(child)}
      >
        {places?.map((place, index) => (
          <div className={classes.markerContainer} lat={Number(place.latitude)} lng={Number(place.longitude)} key={index}>
              {
                isMobile? (
                <LocationOutlindedIcon color='primary' fontSize='large' />
                ): (
                  <Paper elevation={6} className={classes.paper}>
                    <Typography className={classes.typography} variant='subtitle1'>
                      {place.name}
                    </Typography>
                    <img className={classes.pointer} 
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg' } 
                    alt={place.name}/>
                    <Rating readOnly size='small' value={Number(place.rating)} />
                  </Paper>
                )
              }
          </div>
        ))}
        {
          weatherData?.list?.map((data, index)=> (
            <div key={index} lat={data.coord.lat} lng={data.coord.lon}>
              <img height={110} src= {`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
            </div>)
          )
        }
      </GoogleMapReact>
    </div>
  )
}

export default Map