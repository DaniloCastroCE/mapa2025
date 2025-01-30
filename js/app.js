const mapa = new Mapa([-3.74565, -38.51723], 14, new GeoJson())
const locais = new Local()
const loading = new Loading('loading')
var estado = ''

try {
    loading.in()
    mapa.addMultMaker(locais.locais, (obj) => onclickMarker(obj))
    mapa.addBairros('fortaleza')
} catch (error) {
    console.error("Error: ", error)
}finally{
    loading.out()
}

const moveSlide = (op) => {
    const slide = document.querySelector('#slide')

    if(typeof op === 'undefined'){
        slide.classList.toggle('moveSlide')
    } 
    else if (op === 'open'){
        slide.classList.add('moveSlide')
    } 
    else if(op === 'close') {
        slide.classList.remove('moveSlide')
        ultCLick = ''
        estado = ''
        document.querySelector('#slide-conteudo').innerHTML = ''
        document.querySelector('#slide-titulo').innerHTML = ''
    }
}

let ultCLick = ''
const onclickMarker = (obj) => {
    if(ultCLick !== obj.marker._leaflet_id){
        ultCLick = obj.marker._leaflet_id
        moveSlide('open')
        document.querySelector('#slide-titulo').innerHTML = `${obj.local.nome}`
    }else {
        moveSlide('close')
    }  
    
}







