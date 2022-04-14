import React from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import HourTemp from './HourTemp';

const Hourly = ({ hourlyTemprature }) => {

  const [data, setData] = useState();

  const twelveHours = () => {
    hourlyTemprature.length = 12;
    setData(hourlyTemprature)
    console.log(typeof data)
  };
  setTimeout(twelveHours, 100);



  return (
    <Container fluid className='py-2'>
      <div className='d-flex flex-row flex-nowrap overflow-auto'>
        {data.map((h) => (
          <HourTemp data={h} />
        ))}
        {/* <HourTemp data={data} /> */}
      </div>
    </Container>
  );
};

export default Hourly