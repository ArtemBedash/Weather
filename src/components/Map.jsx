import React, {useEffect} from 'react';
import L from 'leaflet';

const Map = ({coord,id}) => {
// eslint-disable-next-line react/prop-types
const {lat, lon} = coord;
    console.log(lat, lon);


    useEffect(() => {
        if (!L.DomUtil.get(id.toString())._leaflet_id) {  // Проверка инициализации
            const map = L.map(id.toString()).setView([lat,
                lon], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        }
    }, []);




    return (
        <div id={id} style={{ height: "50vh", width: "100%" }}>
        </div>
    );

};

export default Map;