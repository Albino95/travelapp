import { useState, useEffect } from "react";
import { getPlacesData, getWeatherData } from './api'
import { CssBaseline, Grid} from "@material-ui/core";
import Header from './components/Header/Header'
import Map from "./components/Map/Map";
import List from "./components/List/List";



function App() {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
  const [bounds, setBounds] = useState({});
  const [childCliked, setChildCliked] = useState(null)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')
  const [isLoading, setIsLoading] =useState(false)
  const [filteredPlaces, setFilteredPlaces] = useState([])

  useEffect(()=> {
    const filteredPlace = places.filter((place) => place.rating>rating)
    setFilteredPlaces(filteredPlace)
  }, [rating])

  useEffect(() => {
    if(bounds){ 
    setIsLoading(true)
      getWeatherData(coordinates.lat, coordinates.lng)
      .then((data) => {
      setWeatherData(data)
      console.log(weatherData)
      })

    getPlacesData(type, bounds.sw, bounds.ne)
      .then((data)=>{
        console.log(data);
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([])
        setIsLoading(false) 
      })
    }
  },[type, coordinates, bounds])


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) =>{
      setCoordinates({lat: latitude, lng: longitude});
    })
  },[])
  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces.length ? filteredPlaces : places}
          childCliked={childCliked}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildCliked={setChildCliked}
          weatherData={weatherData}
          />
        </Grid>

      </Grid>
    
    
    
    
    </>

  );
}

export default App;
