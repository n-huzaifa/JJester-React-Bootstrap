import './Header.css'
import React from 'react'
import Skull from './../../Skull.svg'
import { Col, Container, Navbar, Row } from 'react-bootstrap'

function Header() {
    return (
        <Container fluid >
            <Row className='align-items-center bg-white pt-2 pb-2'>
                <Col sm="auto">
                    <span className='HomeButton'>JJESTER</span>
                </Col>
                <Col>
                    <img
                        src={Skull}
                        className="d-inline-block align-top"
                        width="60"
                        height="60"
                        alt="Skull logo"
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Header