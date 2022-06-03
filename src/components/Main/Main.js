import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react'
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
        <section className='main'>
            <div >
                <div >
                    {
                        joke.type === "single" ?
                            <h1 >
                                {joke.joke}
                            </h1>
                            :
                            <>
                                <h1 >
                                    {joke.setup}
                                </h1>
                                <p >- {joke.delivery}</p>
                            </>
                    }
                    {error === 'Request failed with status code 404' ?
                        <h1 >
                            Check Your Internet Connection
                        </h1>
                        : ''}
                </div>
                <div >
                    <div>
                        <p ><span >Type:</span> {joke.type}</p>
                        <p ><span >Category:</span> {joke.category}</p>
                    </div>
                    <div >
                        <div >
                            <label >
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
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main