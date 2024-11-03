import React, {useEffect} from 'react';
import L from 'leaflet';

const Map = ({data}) => {
// eslint-disable-next-line react/prop-types
const {lat, lon} = data.coord;
    console.log(lat, lon);


    useEffect(() => {
        if (!L.DomUtil.get('map')._leaflet_id) {  // Проверка инициализации
            const map = L.map('map').setView([lat,
                lon], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        }
    }, []);




    return (
        <div id="map" style={{ height: "50vh", width: "100%" }}>
        </div>
    );

};

export default Map;