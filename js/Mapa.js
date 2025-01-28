class Mapa {
    constructor(latLng, zoom) {
        this.map = L.map('map').setView(latLng, zoom)

        let layers = []
        let maxZoom = 20

        layers.push(
            //Padrão
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: maxZoom,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            })
        )

        layers.push(
            //OSM-HOT
            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors, Tiles style by HOT',
                maxZoom: maxZoom
            })
        )
        
        layers.push(
            //Google Satelite
            L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                attribution: 'Map data © Google',
                maxZoom: maxZoom
            })
        )

        layers.push(
            //Simplificado
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: maxZoom
            })
        )
     
        layers.push(
            //Escuro
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: maxZoom
            })
        )

        layers.push(
            //Ciclovias
            L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
                attribution: '© CyclOSM | © OpenStreetMap contributors',
                maxZoom: maxZoom
            })
        )
     
        layers[0].addTo(this.map)

        let baseLayers = {
            "Padrão" : layers[0],
            "OSM-HOT" : layers[1],
            "Google Satelite" : layers[2],
            "Simples Claro" : layers[3],
            "Simples Escuro" : layers[4],
            "Ciclovias" : layers[5],
        }

        L.control.layers(
            baseLayers, 
            {}, 
            {position: 'topleft'}
        ).addTo(this.map)

        this.zoomLevel('zoom-level')

        this.map.on('zoomend', () => {
            this.zoomLevel('zoom-level')
        })
        
    }

    zoomLevel (id) {
        document.querySelector(`#${id}`).innerHTML = `${this.map.getZoom()}`
    }


} 