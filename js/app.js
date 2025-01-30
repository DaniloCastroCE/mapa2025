const mapa = new Mapa([-3.74565, -38.51723], 14, new GeoJson())
const locais = new Local()
const loading = new Loading('loading')
var estado = ''

try {
    loading.in()
    mapa.addMultMaker(locais.locais, (obj) => onclickMarker(obj))
    mapa.addBairros('fortaleza')
    document.querySelector('#inp-buscar').addEventListener('input', (e) => {
        const ulBuscar = document.querySelector('#ulBuscar')
        ulBuscar.innerHTML = ''
        if (e.target.value === '' || e.target.value === ' ') {
            e.target.value = ''
        } else {
            const arrayBuscaLocais = locais.getBuscarLocais(e.target.value)
            arrayBuscaLocais.forEach(local => {
                ulBuscar.innerHTML += `
                    <li id="liBuscar${local.idMarker}" onclick="onclickLi(${local.idMarker})">${criarLiBuscar(local)}</li>
                `
            })
        }
    })

} catch (error) {
    console.error("Error: ", error)

} finally {
    loading.out()
}

const onclickLi = (idMarker) => {
    onclickMarker(
        {
            local: locais.getLocalIdMarker(idMarker), 
            marker: mapa.getMarker(idMarker)
        }
    )
    document.querySelector('#ulBuscar').innerHTML = ''
    document.querySelector('#inp-buscar').value = ''
}

const criarLiBuscar = (local) => {
    return `
    <div id="divBuscar${local.idMarker}">
        <h3>${local.nome}</h3>
    </div>
    `
}

const moveSlide = (op) => {
    const slide = document.querySelector('#slide')
    const mapa = document.querySelector('.box-mapa')

    if (typeof op === 'undefined') {
        slide.classList.toggle('moveSlide')
        mapa.classList.toggle('box-mapMove')
    }
    else if (op === 'open') {
        slide.classList.add('moveSlide')
        mapa.classList.add('box-mapMove')
    }
    else if (op === 'close') {
        slide.classList.remove('moveSlide')
        mapa.classList.remove('box-mapMove')
        ultCLick = ''
        estado = ''
        document.querySelector('#slide-conteudo').innerHTML = ''
        document.querySelector('#slide-titulo').innerHTML = ''
    }
}

let ultCLick = ''
const onclickMarker = (obj) => {
    if (ultCLick !== obj.local.idMarker) {
        moveSlide('open')
        ultCLick = obj.local.idMarker
        document.querySelector('#slide-titulo').innerHTML = `${obj.local.nome}`
        obj.marker.openPopup()
        mapa.map.setView(obj.marker.getLatLng(), mapa.map.getZoom())
    } else {
        moveSlide('close')
    }
}







