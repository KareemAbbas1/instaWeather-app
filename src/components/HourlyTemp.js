import React from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import HourTemp from './HourTemp';

const Hourly = ({ hourlyTemperature, tempType }) => {

  const [data, setData] = useState();

  const twelveHours = async () => {
    hourlyTemperature.length = 23;
    setTimeout(() => {
      setData(hourlyTemperature)
    }, 100)
  };
  twelveHours();



  if (typeof window !== "undefined" && document.getElementById("hourly-container")) {
    const horizonalContainer = document.getElementById("hourly-container");
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
        id="hourly-container"
        className='d-flex flex-row flex-nowrap horizonal-container'
      >
        {data &&
          data.map((h) => (
            <HourTemp key={h.time} data={h} tempType={tempType} />
          ))
        }
      </div>
    </Container>
  );
};

export default Hourly