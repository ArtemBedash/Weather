import React, {useEffect, useState} from 'react';
import axios from "axios";



const CountriesList = () => {
    const [countries, setCountries] = React.useState([]);
    const [selectedCode, setSelectedCode] = useState('');



    useEffect(() => {
        async function renderCountries() {

            const link = `https://restcountries.com/v3.1/all`;

            try {

                const response = await axios.get(link);
                const sortedCountries = response.data
                    .map(country => ({
                        name: country.name.common,
                        code: country.cca2 // ISO-код страны
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name));
                setCountries(sortedCountries);
            } catch (error) {
                console.log(error.response)
            }
        }
        renderCountries();
    },[])

    const handleCountryChange = (event) => {
        setSelectedCode(event.target.value);
    };

    return (
        <div>
            <select onChange={handleCountryChange}>
                <option value="">Выберите...</option>
                {countries.map((country, index) => (
                    <option key={index} value={country.code}>
                        {country.name}
                    </option>
                ))}
            </select>

            <br/><br/>

            <label htmlFor="code">Код страны (ISO):</label>
            <input type="text" id="code" value={selectedCode} readOnly/>

        </div>
    )
        ;
};

export default CountriesList;