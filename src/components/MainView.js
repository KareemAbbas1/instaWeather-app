import React from 'react';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import CurrentIcon from './CurrentIcon';
import HourlyTemp from './HourlyTemp';

const MainView = () => {

    //API Key
    const API_KEY = "a177f8481c31fa96c3f95ad4f4f84610";

    // Create a new Date instance
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = new Date();
    let m = d.getMonth() + 1;
    let newDate = `${weekday[d.getDay()]}, ${m}.${d.getDate()}.${d.getFullYear()}`;


    useEffect(() => {
        const x = document.getElementById("location")
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getWeatherData);
            } else {
                x.innerHTML = "Geolocation is not supported on this browser"
            };
        };
        return getLocation();
    }, []);

    const getWeatherData = (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        // Use this link "https://cors-anywhere.herokuapp.com/corsdemo" to get a temporary access to the CORS-anywhere demo server
        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.log("Error", error));

        // Get city name by utilizing reverse geocoding
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(res => res.json())
            .then(cityName => setCityName(cityName))
            .catch(error => console.log("Error", error));
    };

    const [cityName, setCityName] = useState();
    const [data, setData] = useState();
    const [tempType, setTemptype] = useState(true);

    // Handle toggle measurement type
    const toggleCMeasurement = () => {
        setTemptype(false);
    };

    const toggleFMeasurement = () => {
        setTemptype(true);
    };


    /* Extracting the data out of the request body */
    // Main temperature
    let fTemp = data ? Math.round(data.currently.temperature) : null;
    let cTemp = Math.round((fTemp - 32) / 1.8);

    // Summary
    let summary = data ? data.currently.summary : null;
    let aggregatedSummary = data ? data.hourly.summary : null;

    /* Hourly temperature */
    let firstHourTemp = data ? Math.round(data.hourly.data[0].temperature) : null;
    let lasttHourTemp = data ? Math.round(data.hourly.data[11].temperature) : null;   
    let hourlyTemprature = data ? data.hourly.data : null;

    // Convert to celsius
    let cFirstHourTemp = Math.round((firstHourTemp - 32) / 1.8);
    let cLastHourTemp = Math.round((lasttHourTemp - 32) / 1.8);

    // Get city name
    let city = cityName ? cityName.locality : null;
    // Get Icon
    let iconType = data ? data.currently.icon : null;
    /*End extract data*/

    // console.log(data)
    return (
        <Container>
            <div className='mt-5 d-flex justify-content-between align-items-center '>
                <div className=''><h2>INSTAWEATER</h2></div>
                <span className='d-flex justify-content-between'>
                    <div className={!tempType ? 'measurement-active' : 'measurement'} onClick={() => toggleCMeasurement()}><h2 className='pt-1 text-center'>C</h2></div>
                    <div className={tempType ? 'measurement-active' : 'measurement'} onClick={() => toggleFMeasurement()}><h2 className='pt-1 text-center'>F</h2></div>
                </span>
            </div>


            <div className='pt-4 mt-4 d-flex justify-content-between align-items-center'>
                <div>
                    <h1 id='location'>{city}</h1>
                    <p><strong>{newDate}</strong></p>
                    <div className='display-1'>
                        <CurrentIcon iconType={iconType} />
                    </div>
                    <div className='mt-2'>
                        <h2>{summary}</h2>
                    </div>
                </div>

                <div className='mb-5'>
                    <h2 className='temp'>{tempType ? fTemp : cTemp}&#176;</h2>
                    <h2 className='hourly-temp'>
                        {tempType ? firstHourTemp : cFirstHourTemp}&#176;
                        / {tempType ? lasttHourTemp : cLastHourTemp}&#176;</h2>
                    <div className='mt-4'>{aggregatedSummary}</div>
                </div>
            </div>
            <div>
                <hr className='line-break'></hr>
            </div>

            <HourlyTemp hourlyTemprature={hourlyTemprature}/>

        </Container>
    )
}

export default MainView
