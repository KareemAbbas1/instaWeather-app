import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import CurrentIcon from './CurrentIcon';
import HourlyTemp from './HourlyTemp';

const MainView = () => {

    const [cityName, setCityName] = useState();
    const [data, setData] = useState();
    const [tempType, setTemptype] = useState(true);

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
        getLocation();
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
        getWeatherData();
    };
    console.log(data)

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
    // console.log(hourlyTemprature)

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
            <div className='my-5 d-flex justify-content-between align-items-center '>
                <div className=''><h4>INSTAWEATER</h4></div>
                <span className='d-flex justify-content-between'>
                    <div className={!tempType ? 'measurement-active' : 'measurement'} onClick={() => toggleCMeasurement()}><h4 className='pt-1 text-center'>C</h4></div>
                    <div className={tempType ? 'measurement-active' : 'measurement'} onClick={() => toggleFMeasurement()}><h4 className='pt-1 text-center'>F</h4></div>
                </span>
            </div>


            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <span id='location'>{city}</span><br />
                    <span>{newDate}</span>
                    <div className='icon'>
                        <CurrentIcon iconType={iconType} />
                    </div>
                    <div>
                        <span className='summary'>{summary}</span>
                    </div>
                </div>

                <div className='temp-block d-flex align-items-end flex-column'>
                    <h2 className='temp'>{tempType ? fTemp : cTemp}&#176;</h2>
                    <h2 className='hourly-temp'>
                        {tempType ? firstHourTemp : cFirstHourTemp}&#176;
                        / {tempType ? lasttHourTemp : cLastHourTemp}&#176;</h2>
                    <div className='aggregatedSummary'>{aggregatedSummary}</div>
                </div>
            </div>
            {/* <div>
                <hr className='line-break'></hr>
            </div> */}

            <Tabs className="tabs" defaultActiveKey="hourly">
                <Tab className='hourly' eventKey="hourly" title="Hourly">
                    <HourlyTemp tempType={tempType} hourlyTemprature={hourlyTemprature} />
                </Tab>
                <Tab className='hourly' eventKey="daily" title="Daily" style={{color: 'white'}}>

                </Tab>
            </Tabs>

        </Container>
    )
}

export default MainView
