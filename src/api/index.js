import axios from 'axios'



export const getPlacesData = async (type, ne, sw) => {
    
    try {
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                },
                headers: {
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                'X-RapidAPI-Key': 'e70b90a85cmsh4689cb8add96d21p123b60jsn2a1443608451'
                }
            });
        return data;
    } catch(error) {
        console.log(error)
    }
}

export const getWeatherData = async (lat, lng) => {
    try {
        const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/find',{
            params: {lat: lat, lon: lng },
            headers: {
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
                'X-RapidAPI-Key': 'e70b90a85cmsh4689cb8add96d21p123b60jsn2a1443608451'
            }
        });
        return data;
    }
    catch(error) {
        console.log(error)
    }
}