import React from 'react'
import { Container } from 'react-bootstrap'
import Icon from '../assets/Current Icon.png'
import { useEffect, useState } from 'react';

const MainView = () => {

    const [data, setData] = useState();

    //API Key
    const API_KEY = "a177f8481c31fa96c3f95ad4f4f84610";

    // Create a new Date instance
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = new Date();
    let m = d.getMonth() + 1;
    let newDate = `${weekday[d.getDay()]}, ${m}.${d.getDate()}.${d.getFullYear()}`;

    const x = document.getElementById("location")
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeatherData);
        } else {
            x.innerHTML = "Geolocation is not supported on this browser"
        };
        // return getLocation();
    };

    useEffect(() => {
        getLocation();
    }, [])

    const getWeatherData = (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.log("Error", error))
    };

    let fTemp = data ? data.currently.temperature : null;
    let cTemp = Math.round((fTemp - 32) / 1.8);
    let summary = data ? data.currently.summary : null;
    // let icon = data ? data.currently.icon : null;
    // console.log(temp)
    console.log(data)
    return (
        <Container>
            <div className='pt-5 d-flex justify-content-between align-items-center '>
                <div className='brand'><h2>INSTAWEATER</h2></div>
                <span className='d-flex justify-content-between'>
                    <div className='measurement'><h2 className='text-center'>C</h2></div>
                    <div className='measurement'><h2 className='text-center'>F</h2></div>
                </span>
            </div>


            <div className='pt-5 mt-5 mb-5 d-flex justify-content-between'>
                <div>
                    <h1 id='location' className=''>City Name</h1>
                    <p className=''><strong>{newDate}</strong></p>
                    <div>
                        <img src={Icon} alt='weather icon' className='mt-4'></img>
                    </div>
                    <div className='mt-3'>
                        <h2>{summary}</h2>
                    </div>
                </div>

                <div>
                    <h2 className=' me-4'>{fTemp}</h2>
                    <h2 className=' me-4'>{cTemp}</h2>
                </div>
            </div>

            <div>
                <hr className='line-break'></hr>
            </div>

        </Container>
    )
}

export default MainView



// if (res.ok) {
//     console.log('Success')
//         .then(res => res.json())
// }else {
//     console.log("Failed to fetch data")
// }
// }