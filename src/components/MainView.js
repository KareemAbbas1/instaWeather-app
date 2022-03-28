import React from 'react'
import { Container } from 'react-bootstrap'
import Icon from '../assets/Current Icon.png'
import { useEffect } from 'react';

const MainView = () => {

    //API Key
    const API_KEY = "a177f8481c31fa96c3f95ad4f4f84610";

    // Create a new Date instance
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = new Date();
    let newDate = weekday[d.getDay()] + '.' + d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

    const x = document.getElementById("location")
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeatherData);
        } else {
            x.innerHTML = "Geolocation is not supported on this browser"
        };
    };
    
    useEffect()
    const getWeatherData = async (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        const URL = `https://api.darksky.net/forecast/${API_KEY}/${latitude}, ${longitude}`

        const request = await fetch(URL, {
            mode: 'no-cors',
            method: 'GET',
            credentials: 'same-origin',
        })
        try {
            return await request.json()
        }

        catch (error) {
            console.log('error', error);
        }
        console.log('temp', request)
    };


    return (
        <Container>
            <button onClick={getLocation()}>get location</button>
            <div className='pt-5 d-flex justify-content-between align-items-center text-white'>
                <div className='brand'><h2>INSTAWEATER</h2></div>
                <span className='d-flex justify-content-between'>
                    <div className='measurement'><h2 className='text-center'>C</h2></div>
                    <div className='measurement'><h2 className='text-center'>F</h2></div>
                </span>
            </div>


            <div className='pt-5 mt-5 mb-5 d-flex justify-content-between'>
                <div>
                    <h1 id='location' className='text-white'>City Name</h1>
                    <p className='text-white'>{newDate}</p>
                    <div>
                        <img src={Icon} alt='weather icon' className='mt-4'></img>
                    </div>
                </div>

                <div>
                    <h2 className='text-white me-4'>Temp</h2>
                </div>
            </div>

            <div>
                <hr className='line-break'></hr>
            </div>

        </Container>
    )
}

export default MainView