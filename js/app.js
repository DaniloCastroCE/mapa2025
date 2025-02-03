const loading = new Loading('loading')
const mapa = new Mapa([-3.74565, -38.51723], 14, new GeoJson())
const locais = new Local()
var estado = ''
var listCopy = []

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
            //const arrayBuscaLocais = locais.getBuscarLocais(e.target.value)
            const arrayBuscaLocais = locais.locais.filter(local => local.nomeSimplificado.includes(e.target.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim()))

            arrayBuscaLocais.forEach(local => {
                ulBuscar.innerHTML += `
                    <li onclick="onclickLi(${local.idMarker})">
                        <div>
                            <h3>${local.nome}</h3>
                            <p>Endereço: ${local.end.rua}, ${local.end.num}</p>
                            <p>Bairro: ${local.end.bairro}</p>
                            <p>Cidade: ${local.end.cidade} / ${local.end.sigla}</p>
                            <p>Locktec: ${local.locktec}</p>
                        </div>
                    </li>
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
        if(estado === '') listCopy = []
        estado = ''
        document.querySelector('#slide-conteudo').innerHTML = ''
        document.querySelector('#slide-titulo').innerHTML = ''
    }
}

let ultCLick = ''
const onclickMarker = (obj) => {
    
    if (ultCLick !== obj.local.idMarker && estado === '') {
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
    }
    else if (estado === '') {
        moveSlide('close')
    }
    else if (estado === 'exibir') {
        let existe = false

        listCopy.forEach(el => {
            if(el.marker._leaflet_id === obj.marker._leaflet_id){
                existe = true
                return 
            }
        })

        if(!existe) {
            listCopy.push(obj)
            addExibir()

        }
    }
}

const addExibir = () => {
    document.querySelector('#slide-conteudo').innerHTML = `
            <div class="btnExibir">
                <button type="button" onclick="onclickBtnExibir(1)">Botão 1</button>
                <button type="button" onclick="onclickBtnExibir(2)">Limpar</button>
            </div>
        `
        for (let index = listCopy.length-1; index >= 0; index--) {
            const ordem = (index + 1).toString().padStart(2, '0')
            document.querySelector('#slide-conteudo').innerHTML += 
                `
                <div class="boxExibirP" onclick="onclickCopy(${listCopy[index].local.idMarker})">
                    <span>${ordem}</span>
                    <p id="exibir${listCopy[index].local.idMarker}" class="pExibir">
                        <b>${listCopy[index].local.nome}</b><br>
                        ${listCopy[index].local.end.rua},${listCopy[index].local.end.num} - ${listCopy[index].local.end.bairro} (${listCopy[index].local.end.cidade})
                    </p>
                </div>
                `
        }
}

const onclickCopy = (idMarker) => {
    const local = locais.getLocalIdMarker(idMarker)

    let copy = 
`*${local.nome}*
Endereço: ${local.end.rua}, ${local.end.num} - ${local.end.bairro}

`
    console.log('Copiado\n',copy)
    navigator.clipboard.writeText(copy)
}

const exibir = () => {
    if (estado === '') {
        estado = 'exibir'
        document.querySelector('#slide-conteudo').innerHTML = ''
        moveSlide('open')
    } else if (estado === 'exibir') {
        moveSlide('close')
    } 
    document.querySelector('#slide-titulo').innerHTML = `EXIBIR`
    addExibir()
}

const onclickBtnExibir = (op) => {
    switch (op) {
        case 1:
            
            break;
        case 2:
            listCopy = []
            addExibir()
            break;
    
        default:
            break;
    }
}