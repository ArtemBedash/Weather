import {useState} from 'react'
import './App.css'
import axios from "axios";
import {API_KEY} from "./data/index.js";
import Map from "./components/Map.jsx";
import CountriesList from "./components/CountriesList.jsx";

function App() {
    const [formData, setFormData] = useState({city: '', country: ''});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [usedData, setUsedData] = useState([]);


    async function getWeather() {
        setLoading(true)
        setError(null)
        setData(null)
        const link = `https://api.openweathermap.org/data/2.5/weather?q=${formData.city},${formData.country}&appid=${API_KEY}&units=metric`
        try {

            const responce = await axios.get(link)
            console.log(responce)
            setData(responce.data)
            setUsedData([...usedData, responce.data])
        } catch (error) {
            console.log(error.response)
            if (error.response.status === 404) {
                setError(error.response.data.message)
            } else {
                setError('Oops! Something went wrong')
            }
        } finally {
            setLoading(false)
        }
        console.log(data);

        return data
    }

    const handleInputChange = (field, value) => {
        setFormData(prevFormData => ({...prevFormData, [field]: value}))
    }
const existingCity = usedData.find(city => city.name === formData.city && city.sys.country === formData.country)
    console.log(existingCity)
    const isDisabled = usedData.length===2 || !!existingCity;
    console.log(isDisabled)
    return (

        <div className='oswald-oscar'
             style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>

            {loading && <p>Loading......</p>}
            {error && <p>{error}</p>}
            <div className='flex-row'>
            {usedData.map(({id,name,main,coord}) => (
                <div className='Cities' key={id}>
                    <p>City: {name}</p>
                    <p>Temperature: {main.temp}</p>
                    <p>Feels like: {main.feels_like}</p>
                    <Map coord={coord} id={id}/>
                </div>
            ))



            }
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                getWeather();
            }} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <input type="text" placeholder='type City' value={formData.city}
                       onChange={(e) => handleInputChange('city', e.target.value)}
                       required/>
                <input type="text" placeholder='type country code' value={formData.country}
                       onChange={(e) => handleInputChange('country', e.target.value)} required/>

                <button disabled={isDisabled} type='submit'>Submit</button>
            </form>


        </div>

    )
}

export default App
