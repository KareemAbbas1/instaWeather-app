import React from 'react';
import { Container, Tabs, Tab, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import CurrentIcon from './CurrentIcon';
import HourlyTemp from './HourlyTemp';
import DailyTemp from './DailyTemp';

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
    let newDate = `${weekday[d.getDay()]}, ${m}/${d.getDate()}/${d.getFullYear()}`;

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



    // Handle toggle measurement type
    const toggleCMeasurement = () => {
        setTemptype(false);
    };


    /* Extracting the data out of the request body */
    // Main temperature
    let fTemp = data && Math.round(data.currently.temperature);
    let cTemp = Math.round((fTemp - 32) / 1.8);

    // Summary
    let summary = data && data.currently.summary;
    let aggregatedSummary = data && data.hourly.summary;

    // Daily temperature
    let dailyTemperature = data && data.daily.data;

    /* Hourly temperature */
    let firstHourTemp = data && Math.round(data.hourly.data[0].temperature);
    let lasttHourTemp = data && Math.round(data.hourly.data[22].temperature);
    let hourlyTemperature = data && data.hourly.data;

    // Convert to celsius
    let cFirstHourTemp = Math.round((firstHourTemp - 32) / 1.8);
    let cLastHourTemp = Math.round((lasttHourTemp - 32) / 1.8);

    // Get city name
    let city = cityName && cityName.locality;
    // Get Icon
    let iconType = data && data.currently.icon;

    return (
        <Container className='d-flex flex-column justify-content-between h-100 py-5'>
            <div className='mt-2 mb-3 d-flex justify-content-between align-items-center'>
                <div className='diaplay-md-5'><h4>INSTAWEATER</h4></div>
                <span className='d-flex justify-content-between'>
                    <div className={!tempType ? 'measurement-active' : 'measurement'} onClick={() => toggleCMeasurement()}><h4 className='pt-1 text-center'>C</h4></div>
                    <div className={tempType ? 'measurement-active' : 'measurement'} onClick={() => setTemptype(true)}><h4 className='pt-1 text-center'>F</h4></div>
                </span>
            </div>


            <Row className='text-center'>
                <Col lg={6} md={6} sm={6}>
                    <div className='text-sm-start d-sm-flex flex-column'>
                        <br />
                        <span id='location'>{city}</span><br />
                        <span>{newDate}</span>
                        <div className='icon'>
                            <CurrentIcon iconType={iconType} />
                        </div>
                        <div>
                            <span className='summary'>{summary}</span>
                        </div>
                    </div>
                </Col>

                <Col lg={6} md={6} sm={6}>
                    <div className='temp-block d-sm-flex align-items-end flex-column'>
                        <h2 className='temp'>{tempType ? fTemp : cTemp}&#176;</h2>
                        <h2 className='hourly-temp'>
                            {tempType ? firstHourTemp : cFirstHourTemp}&#176;
                            / {tempType ? lasttHourTemp : cLastHourTemp}&#176;</h2>
                        <div className='aggregatedSummary'>{aggregatedSummary}</div>
                    </div>
                </Col>
            </Row>

            <Tabs className="tabs" defaultActiveKey="hourly">
                <Tab className='hourly' eventKey="hourly" title="Hourly">
                    <HourlyTemp tempType={tempType} hourlyTemperature={hourlyTemperature} />
                </Tab>
                <Tab className='hourly' eventKey="daily" title="Daily">
                    <DailyTemp tempType={tempType} dailyTemperature={dailyTemperature} />
                </Tab>

            </Tabs>

        </Container>
    )
}

export default MainView
