const mapa = new Mapa([-3.74, -38.50], 14)
const locais = new Local()

console.log(locais.getCountCond())


const loading = () => {
    const loading = document.querySelector('#loading')
    loading.classList.toggle("hidden")
} 

setTimeout( loading , 3000 )
