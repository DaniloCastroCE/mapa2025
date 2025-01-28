const mapa = new Mapa([-3.74565, -38.51723], 14)
const locais = new Local()

console.log(locais.getCountCond())

const loading = () => {
    const loading = document.querySelector('#loading')
    loading.style.display = "flex"
    if (!loading.classList.contains('anamationFadeIn') && !loading.classList.contains('anamationFadeOut')){
        loading.classList.add('anamationFadeIn')
    }
    else if(loading.classList.contains('anamationFadeIn')){
        loading.classList.remove('anamationFadeIn')
        loading.classList.add('anamationFadeOut')
    }
    else if(loading.classList.contains('anamationFadeOut')){
        loading.classList.remove('anamationFadeOut')
        loading.classList.add('anamationFadeIn')
    }
} 

loading()
setTimeout(loading, 5000);