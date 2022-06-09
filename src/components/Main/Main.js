import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Main.css'
function Main() {

    const [safemode, setSafemode] = useState(true)
    const [joke, setJoke] = useState({})
    const [fetch, setFetch] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!safemode) {
            axios.get(process.env.REACT_APP_API_URL)
                .then(res => setJoke(res.data))
                .catch(error => { setError(error.message) })
        } else {
            axios.get(process.env.REACT_APP_API_URL_SAFE)
                .then(res => setJoke(res.data))
                .catch(error => { setError(error.message) })
        }
    }, [fetch, safemode]);

    const handleClick = () => {
        setFetch(prevState => !prevState)
    }

    const handleChange = () => {
        setSafemode(prevState => !prevState)
    }

    return (
        <Container className='text-body'>
            <div>
                <Row>
                    {
                        joke.type === "single" ?
                            <span className='joke-setup'>
                                {joke.joke}
                            </span>
                            :
                            <>
                                <span className='joke-setup' >
                                    {joke.setup}
                                </span>
                                <span className='joke-delivery' >- {joke.delivery}</span>
                            </>
                    }
                    {error === 'Request failed with status code 404' ?
                        <Row >
                            Check Your Internet Connection
                        </Row>
                        : ''}
                </Row>
                <Row>
                    <Col>
                        <p>
                            <span >Type:</span> {joke.type}
                        </p>
                        <p>
                            <span >Category:</span> {joke.category}
                        </p>
                    </Col>
                    <Col>
                        <div>
                            <label>
                                {safemode ?
                                    <>
                                        <span >Safe Mode🥳 </span>
                                        <input type="checkbox" onChange={handleChange} checked />
                                    </>
                                    :
                                    <>
                                        <span >Safe Mode🔞</span>
                                        <input type="checkbox" onChange={handleChange} />
                                    </>
                                }
                            </label>
                        </div>
                        <button onClick={handleClick}>
                            Refresh
                        </button>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default Main