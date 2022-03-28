import React from 'react'
import { Container } from 'react-bootstrap'


const Header = () => {
    return (
        <Container>
            <div className='pt-5 d-flex justify-content-between align-items-center text-white'>
                <div className='brand'><h2>INSTAWEATER</h2></div>
                <span className='d-flex justify-content-between'>
                    <div className='measurement'><h2 className='text-center'>C</h2></div>
                    <div className='measurement'><h2 className='text-center'>F</h2></div>
                </span>
            </div>
        </Container>
    )
}

export default Header