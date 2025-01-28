const mapa = new Mapa([-3.74565, -38.51723], 14)
const locais = new Local()
const loading = new Loading('loading')



try {
    loading.in()
    locais.locais = mapa.addMultMaker(locais.locais)
} catch (error) {
    console.error("Error: ", error)
}finally{
    loading.out()
}




