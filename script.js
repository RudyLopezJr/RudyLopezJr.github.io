var map = L.map('map').setView([21.16872779502777, -86.87326841659517], 6);

// Obtengo el mapa 
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

osm.addTo(map);

let marker, circle;

//Verificamos la navegación y obtenemos posición
const successCallback = (position) => {
    
    //Obtenemos las coordenadas
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var accuracy = position.coords.accuracy

    var position = "Posicion" + lat.toString() + " " + long.toString();
    
    //Verificamos que no haya algún marcador en la pantalla
    if(marker) {
        map.removeLayer(marker)
    }

    if(circle) {
        map.removeLayer(circle)
    }

    marker = L.marker([lat, long])
    marker.bindPopup(position).openPopup();
    circle = L.circle([lat, long], {radius: accuracy})

    var featureGroup = L.featureGroup([marker, circle]).addTo(map)

    map.fitBounds(featureGroup.getBounds());

    console.log(position);
    
    navigator.geolocation.clearWatch(id);
};

const errorCallback = (error) => {
    console.log(error);
}

const options ={
    enableHighAccuracy: true,
    timeout: 10000,
}

const id = navigator.geolocation.watchPosition(successCallback,errorCallback, options);



