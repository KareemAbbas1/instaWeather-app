import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import DayTemp from './DayTemp';

const DailyTemp = ({ tempType, dailyTemperature }) => {

    const [data, setData] = useState();

    useEffect(() => {
        /* Wraping the function in a conditional to prevent repeate dailyTemperature.shift() 
        upon rerenders triggered by toggling the temperatrue between Fahrenheit and Celsius */
        if (tempType) {
            const handleDays = async () => {
                setTimeout(() => {
                    dailyTemperature.shift()
                    setData(dailyTemperature);
                }, 100)
            }
            handleDays();
        }
    }, [dailyTemperature]);


    if (typeof window !== "undefined" && document.getElementById("daily-container")) {
        const horizonalContainer = document.getElementById("daily-container");
        horizonalContainer.addEventListener("wheel", (e) => {
            e.preventDefault();

            horizonalContainer.scrollBy({
                left: e.deltaY < 0 ? -30 : 30
            });
        });
    }


    return (
        <Container fluid>
            <div
                id="daily-container"
                className='d-flex flex-row flex-nowrap horizonal-container'
            >
                {data &&
                    data.map((day) => (
                        <DayTemp key={day.time} data={day} tempType={tempType} />
                    ))
                }
            </div>
        </Container>
    )
}

export default DailyTemp