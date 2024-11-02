cimport {useState} from 'react'
import './App.css'
import axios from "axios";
import {API_KEY} from "./data/index.js";

function App() {
    const [formData, setFormData] = useState({city: '', country: ''})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)


    async function getWeather() {
        setLoading(true)
        setError(null)
        setData(null)
        const link = `https://api.openweathermap.org/data/2.5/weather?q=${formData.city},${formData.country}&appid=${API_KEY}&units=metric`
        try {

            const responce = await axios.get(link)
            console.log(responce)
            setData(responce.data)
        } catch (error) {
            console.log(error.response)
            if (error.response.status === 404){
            setError(error.response.data.message)}
            else{
                setError('Oops! Something went wrong')
            }
        } finally {
            setLoading(false)
        }
        console.log(data);

        return data
    }

    const handleInputChange = (field,value) => {
        setFormData(prevFormData => ({...prevFormData, [field]: value}))
    }


    return (

        <div className='oswald-oscar'
             style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            {loading && <p>Loading......</p>}
            {error && <p>{error}</p>}
            {data &&
                <div>
                    <p>City: {data.name}</p>
                    <p>Temperature: {data.main.temp}</p>
                    <p>Feels like: {data.main.feels_like}</p>
                </div>
            }

            <form onSubmit={(e) =>{
                e.preventDefault();
                getWeather();}} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <input type="text" placeholder='type City' value={formData.city} onChange={(e) => handleInputChange('city',e.target.value)}
                       required/>
                <input type="text" placeholder='type country code' value={formData.country}
                       onChange={(e) => handleInputChange('country',e.target.value)} required/>
                <button type='submit'>Submit</button>
            </form>

        </div>

    )
}

export default App
