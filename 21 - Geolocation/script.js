const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
const map = document.querySelector('.map');
let lastMapUpdate;

function mapApiLoaded() {
    navigator.geolocation.watchPosition((data) => {
        // console.log(data);
        speed.textContent = data.coords.speed;
        arrow.style.transform = `rotate(${data.coords.heading}deg)`;

        // const now = new Date().getTime();
        // if (!lastMapUpdate || (now - lastMapUpdate) >= 10000) {
        //     map.src = `https://www.google.com/maps/@${data.coords.latitude},${data.coords.longitude},19z`;
        //     lastMapUpdate = now;
        // }

        const now = new Date().getTime();
        if (!lastMapUpdate) {
            const uluru = {
                lat: data.coords.latitude,
                lng: data.coords.longitude,
            };
            const googleMap = new google.maps.Map(map, {
                zoom: 19,
                center: uluru,
            });
            const marker = new google.maps.Marker({
                position: uluru,
                map: googleMap,
            });
            console.log(googleMap, marker);

            lastMapUpdate = now;
        }
    });
}
