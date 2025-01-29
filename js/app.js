const mapa = new Mapa([-3.74565, -38.51723], 14, new GeoJson())
const locais = new Local()
const loading = new Loading('loading')

try {
    loading.in()
    locais.locais = mapa.addMultMaker(locais.locais)
    mapa.addBairros('fortaleza')
} catch (error) {
    console.error("Error: ", error)
}finally{
    loading.out()
}


