const loading = new Loading('loading')
const mapa = new Mapa([-3.74565, -38.51723], 14, new GeoJson())
const locais = new Local()
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
        <p>Endereço: ${local.end.rua}, ${local.end.num}</p>
        <p>Bairro: ${local.end.bairro}</p>
        <p>Cidade: ${local.end.cidade} / ${local.end.sigla}</p>
        <p>Locktec: ${local.locktec}</p>
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
        const pesquisa = `${obj.local.nome}, ${obj.local.end.rua}, ${obj.local.end.num}, ${obj.local.end.cidade}, ${obj.local.end.cidade}`
        moveSlide('open')
        ultCLick = obj.local.idMarker
        document.querySelector('#slide-titulo').innerHTML = `${obj.local.nome}`
        document.querySelector('#slide-conteudo').innerHTML = `
            <p><b>Endereço:</b> ${obj.local.end.rua}, ${obj.local.end.num}</p>
            <p><b>Bairro:</b> ${obj.local.end.bairro}</p>
            <p><b>Cidade:</b> ${obj.local.end.cidade} / ${obj.local.end.sigla}</p>
            <p><b>Locktec:</b> ${obj.local.locktec}</p>
            <a href="https://www.google.com/maps/place/
                        ${encodeURIComponent(`${obj.local.lat}, ${obj.local.lon}`)}" target="_blank">
                        Latitude: ${parseFloat(obj.local.lat).toFixed(5)}<br>
                        Longitude: ${parseFloat(obj.local.lon).toFixed(5)}</a>
            <a href="http://www.google.com.br/search?q=${encodeURIComponent(pesquisa)}" target="_blank">Pesquisar no Google</a>
            <a href="https://www.google.com.br/maps/@${obj.local.lat},${obj.local.lon},3a,75y,0h,90t/data=!3m6!1e1!3m4!1sXYZ12345PanoID!2e0!7i13312!8i6656" target="_blank">O que há aqui?</a>
"
        `
        obj.marker.openPopup()
        mapa.map.setView(obj.marker.getLatLng(), mapa.map.getZoom())
    } else {
        moveSlide('close')
    }
}






