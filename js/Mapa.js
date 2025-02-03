class Mapa {
    constructor(latLng, zoom, geoJson) {
        this.exibir = false
        this.markers = []
        this.listCopy = []
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
            "Padrão": layers[0],
            "OSM-HOT": layers[1],
            "Google Satelite": layers[2],
            "Simples Claro": layers[3],
            "Simples Escuro": layers[4],
            "Ciclovias": layers[5],
        }

        L.control.layers(
            baseLayers,
            {},
            { position: 'topleft' }
        ).addTo(this.map)

        this.zoomLevel('zoom-level')

        this.map.on('zoomend', () => {
            this.zoomLevel('zoom-level')
        })

        this.map.on('contextmenu', function (e) {
            alert(`Clique com o botão direito detectado!\nCoordenadas do clique:
                latitude: ${e.latlng.lat.toFixed(5)} longitude: ${e.latlng.lng.toFixed(5)}`);
        });

        function style(feature) {
            return {
                fillColor: 'white',
                weight: 0.8,  // Largura do contorno
                opacity: 1,
                color: 'red',  // Cor do contorno
                fillOpacity: 0.1  // Transparência interna (0.1 = 10% visível)
            };
        }

        // Dados GeoJSON dos bairros de Fortaleza
        let bairrosGeoJSON = geoJson.getFortaleza()
        let arrayBairros = []
        // Adiciona o GeoJSON ao mapa com os limites dos bairros
        this.bairroFortaleza = L.geoJSON(bairrosGeoJSON, {
            style: style,  // Aplica o estilo de contorno
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<b>Bairro: " + feature.properties.Nome + "</b>");
                arrayBairros.push({ nome: feature.properties.Nome })
            }
        })

    }

    zoomLevel(id) {
        document.querySelector(`#${id}`).innerHTML = `${this.map.getZoom()}`
    }

    addMarker(local, callback) {
        let marker = L.marker([local.lat, local.lon])
            .bindPopup(`<b>${local.nome}</b><br>${local.end.rua}, ${local.end.num}, ${local.end.bairro}`)
            .bindTooltip(`${local.nome[0].toUpperCase()}${local.nome.substr(1).toLowerCase()}`,
                {
                    permanent: true,
                    direction: 'top'
                }
            ).addTo(this.map)

        marker.on('click', () => {
            callback({ local: local, marker: marker })
        })
        Object.assign(local, (
            {
                idMarker: marker._leaflet_id,
                nomeSimplificado: local.nome
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toUpperCase().trim()
            }))
        return marker
    }

    addMultMaker(array, callback) {
        array.forEach(el => {
            this.markers.push(this.addMarker(el, callback))
        })
    }

    getMarker(id) {
        return this.markers.find(obj => obj._leaflet_id === id)
    }

    addBairros(cidade) {
        if (cidade === 'fortaleza') {
            this.bairroFortaleza.addTo(this.map)
        }
    }
    removeBairros(cidade) {
        if (cidade === 'fortaleza') {
            this.map.removeLayer(this.bairroFortaleza)
        }
    }

    verificarSeExisteMarker() {
        let hasMarker = false;
        this.map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                hasMarker = true;
            }
        })
        return hasMarker
    }

    toggleMarker() {
        if (this.exibir) { // Adiconar Markers
            this.markers.forEach(marker => {
                marker.addTo(this.map)
            })
            this.exibir = false
        }
        else if (!this.exibir) { // Remover Markers

            this.markers.forEach(marker => {
                let remove = true

                this.listCopy.forEach(elListCopy => {
                    if (elListCopy.marker._leaflet_id === marker._leaflet_id) {
                        remove = false
                    }
                })
                if (remove) {
                    this.map.removeLayer(marker)
                }
            })
            this.exibir = true
        }
    }

} 