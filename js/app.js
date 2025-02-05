const loading = new Loading('loading')
const mapa = new Mapa([-3.74565, -38.51723], 14, new GeoJson())
const locais = new Local()
var estado = ''
var bairros = true
const dVisivel = "M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
const dNoVisivel = "m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"

const teste_TranformarArrayEmCopy = () => {
    locais.transformarArray()
}

const init = () => {
    mapa.addMultMaker(locais.locais, (obj) => onclickMarker(obj))
    addRemBairros()
    document.querySelector('#inp-buscar').addEventListener('input', (e) => {
        const ulBuscar = document.querySelector('#ulBuscar')
        ulBuscar.innerHTML = ''
        if (e.target.value === '' || e.target.value === ' ') {
            e.target.value = ''
        } else {

            if (e.target.value.length >= 2) {
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
        }

    })
}

const func_painelFerramentas = (click) => {
    switch (click) {
        case 'exibir':
            exibir()
            break;
        case 'addRemBairros':
            addRemBairros()
            break;
        case 'buscarAvancada':
            buscarAvancada()
            break;
        default:
            break;
    }
}

const exibir = () => {
    if (estado !== 'exibir') {
        estado = 'exibir'
        document.querySelector('#slide-titulo').innerHTML = `LISTA`
        document.querySelector('#slide-conteudo').innerHTML = ''
        addExibir()
        moveSlide('open')
    } else if (estado === 'exibir') {
        moveSlide('close')
    }

}

const addExibir = () => {
    document.querySelector('#slide-conteudo').innerHTML = `
            <div class="btnExibir">
                <button class="botao botaoSvg" type="button" onclick="onclickBtnExibir(1)" id="btnExibir">
                
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="#000000">
                        <path id="pathView"
                            d="${(!mapa.exibir) ? dVisivel : dNoVisivel}"/>
                    </svg>
                
                </button>
                <button class="botao botaoSvg" type="button" onclick="onclickBtnExibir(2)">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="#000000">
                        <path 
                            d="M440-520h80v-280q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800v280ZM200-360h560v-80H200v80Zm-58 240h98v-80q0-17 11.5-28.5T280-240q17 0 28.5 11.5T320-200v80h120v-80q0-17 11.5-28.5T480-240q17 0 28.5 11.5T520-200v80h120v-80q0-17 11.5-28.5T680-240q17 0 28.5 11.5T720-200v80h98l-40-160H182l-40 160Zm676 80H142q-39 0-63-31t-14-69l55-220v-80q0-33 23.5-56.5T200-520h160v-280q0-50 35-85t85-35q50 0 85 35t35 85v280h160q33 0 56.5 23.5T840-440v80l55 220q13 38-11.5 69T818-40Zm-58-400H200h560Zm-240-80h-80 80Z"/>
                    </svg>
                </button>
                <button class="botao botaoSvg" type="button" onclick="onclickBtnExibir(3)">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="#000000">
                        <path 
                            d="M120-220v-80h80v80h-80Zm0-140v-80h80v80h-80Zm0-140v-80h80v80h-80ZM260-80v-80h80v80h-80Zm100-160q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480Zm40 240v-80h80v80h-80Zm-200 0q-33 0-56.5-23.5T120-160h80v80Zm340 0v-80h80q0 33-23.5 56.5T540-80ZM120-640q0-33 23.5-56.5T200-720v80h-80Zm420 80Z"/>
                    </svg>
                </button>
            </div>
            <div id="listaCond"></div>
        `

    for (let index = mapa.listCopy.length - 1; index >= 0; index--) {
        const ordem = (index + 1).toString().padStart(2, '0')
        document.querySelector('#listaCond').innerHTML +=
            `
                <div class="boxExibirP" >
                    <span>${ordem}</span>
                    <p id="exibir${mapa.listCopy[index].local.idMarker}" class="pExibir" onclick="onclickCopy(${mapa.listCopy[index].local.idMarker})">
                        <b>${mapa.listCopy[index].local.nome}</b><br>
                        ${mapa.listCopy[index].local.end.rua},${mapa.listCopy[index].local.end.num} - ${mapa.listCopy[index].local.end.bairro} (${mapa.listCopy[index].local.end.cidade})
                    </p>
                    <svg 
                        class="trashLista" 
                        onclick="deletaItemLista(${index})" 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="#BB271A">
                        <path 
                            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </div>
                `
    }
}

const addRemBairros = () => {
    const elemento = document.querySelector('#svgBairro')
    if (!bairros) {
        mapa.addBairros("fortaleza")
        bairros = true
        elemento.classList.add('mudarCorSVGBTN')
    }
    else if (bairros) {
        mapa.removeBairros("fortaleza")
        bairros = false
        elemento.classList.remove('mudarCorSVGBTN')
    }
}

const buscarAvancada = () => {
    if (estado !== 'buscarAvancada') {
        document.querySelector('#slide-titulo').innerHTML = `BUSCA AVANÇADA`
        document.querySelector('#slide-conteudo').innerHTML = ''
        estado = 'buscarAvancada'
        moveSlide('open')
    } else {
        moveSlide('close')
    }
}

const goLocktec = () => {
    try {
        const locktec = locais.getBuscarLocais('locktec')
        markerLocktec = mapa.getMarker(locktec[0].idMarker)
        mapa.map.setView(markerLocktec.getLatLng(), mapa.map.getZoom())
        markerLocktec.openPopup()
    } catch (error) {
        console.error(error)
    }
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
    document.querySelector('#inp-buscar').focus()

    if (mapa.exibir) {
        mapa.addOneMarker(idMarker)
        mapa.focoMarker(mapa.getMarker(idMarker))
    }
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
        //if (estado === '') mapa.listCopy = []
        estado = ''
        document.querySelector('#slide-conteudo').innerHTML = ''
        document.querySelector('#slide-titulo').innerHTML = ''
    }
}

let ultCLick = ''
const onclickMarker = (obj) => {
    try {
        //onclickCopy(obj.local.idMarker)
    } catch (error) {
        console.error(error)
    }

    if (ultCLick !== obj.local.idMarker && estado === '') {
        const pesquisa = `${obj.local.nome}, ${obj.local.end.rua}, ${obj.local.end.num}, ${obj.local.end.cidade}, ${obj.local.end.cidade}`
        moveSlide('open')
        ultCLick = obj.local.idMarker
        document.querySelector('#slide-titulo').innerHTML = `<h3 class="botao" onclick="focoLocal(${obj.local.idMarker})">${obj.local.nome}</h3>`
        document.querySelector('#slide-conteudo').innerHTML = `
            <p style="margin-top: 50px;"><b>Endereço:</b> ${obj.local.end.rua}, ${obj.local.end.num}</p>
            <p><b>Bairro:</b> ${obj.local.end.bairro}</p>
            <p><b>Cidade:</b> ${obj.local.end.cidade} / ${obj.local.end.sigla}</p>
            <p><b>Locktec:</b> ${obj.local.locktec}</p>
            <div class="btnOneCond">
                <button class="botao botaoSvg" type="button" onclick="onclickCopy(${obj.local.idMarker})">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="#000000">
                            <path 
                               d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/>
                    </svg>
                </button>
            </div>
            <a href="https://www.google.com/maps/place/
                        ${encodeURIComponent(`${obj.local.lat}, ${obj.local.lon}`)}" target="_blank">
                        Latitude: ${parseFloat(obj.local.lat).toFixed(5)}<br>
                        Longitude: ${parseFloat(obj.local.lon).toFixed(5)}</a>
            <a href="http://www.google.com.br/search?q=${encodeURIComponent(pesquisa)}" target="_blank">Pesquisar no Google</a>
            <a href="https://www.google.com.br/maps/@${obj.local.lat},${obj.local.lon},3a,75y,0h,90t/data=!3m6!1e1!3m4!1sXYZ12345PanoID!2e0!7i13312!8i6656" target="_blank">O que há aqui?</a>
        `
        mapa.focoMarker(obj.marker)
    }
    else if (estado === '') {
        moveSlide('close')
        obj.marker.closePopup()
    }
    else if (estado === 'exibir') {
        let existe = false

        mapa.listCopy.forEach(el => {
            if (el.marker._leaflet_id === obj.marker._leaflet_id) {
                existe = true
                return
            }
        })

        if (!existe) {
            mapa.listCopy.push(obj)
            addExibir()
            mapa.focoMarker(obj.marker)
        } else {
            //obj.marker.closePopup()
            //const element = document.querySelector(`#exibir${obj.local.idMarker}`)
            rolagemFocusLI(obj.local.idMarker)

        }
    }

}

const focoLocal = (idMarker) => {
    const marker = mapa.getMarker(idMarker)
    mapa.focoMarker(marker)
    marker.openPopup()

}

const rolagemFocusLI = (idMarker) => {
    const scrollDiv = document.getElementById('listaCond'); // A div com scroll
    const element = document.querySelector(`#exibir${idMarker}`);
    if (!element) return;

    // Seleciona o conteúdo do elemento
    const range = document.createRange();
    const selecao = window.getSelection();
    selecao.removeAllRanges(); // Remove qualquer seleção anterior
    range.selectNodeContents(element);
    selecao.addRange(range);

    // Rola dentro da div até o elemento selecionado
    const rect = element.getBoundingClientRect();
    const scrollDivRect = scrollDiv.getBoundingClientRect();

    // Calcula a posição relativa dentro da div para rolar
    const scrollPosition = rect.top - scrollDivRect.top + scrollDiv.scrollTop;

    scrollDiv.scrollTo({
        top: scrollPosition - 50,  // Ajuste para deixar um pequeno espaço no topo
        behavior: 'smooth'
    });
}

const deletaItemLista = (index) => {
    mapa.listCopy.splice(index, 1)
    addExibir()
    if (mapa.exibir) {
        mapa.removerMarker()
    }
}

const onclickCopy = (idMarker) => {
    const local = locais.getLocalIdMarker(idMarker)
    let copy =
        `*${local.nome}*
Endereço: ${local.end.rua}, ${local.end.num} - ${local.end.bairro}
`
    navigator.clipboard.writeText(copy)
    mapa.focoMarker(mapa.getMarker(idMarker))

}

const copyAll = () => {

    let copy = ''

    if (mapa.listCopy.length > 0) {

        mapa.listCopy.forEach(el => {
            copy +=
                `*${el.local.nome}*
Endereço: ${el.local.end.rua}, ${el.local.end.num} - ${el.local.end.bairro}

`
        })

        navigator.clipboard.writeText(copy)
        alert(`Copiado todos os condominios selecionados:\n\n${copy}`)
    } else {
        alert(`\n ! ! ! Não existe condominio na lista de selecionados para copiar ! ! ! \n`)
    }

}

const onclickBtnExibir = (op) => {

    switch (op) {
        case 1:
            const path = document.querySelector('#pathView')
            if (mapa.exibir) {
                loading.in()
                setTimeout(() => {
                    mapa.toggleMarker()
                    loading.out()
                }, 1000);

                path.setAttribute('d', dVisivel)
            }
            else if (!mapa.exibir) {
                mapa.toggleMarker()
                path.setAttribute('d', dNoVisivel)
            }
            break;
        case 2:
            mapa.listCopy = []
            addExibir()
            if (mapa.exibir) {
                mapa.removerMarker()
            }
            break;
        case 3:
            copyAll()
            break;
        default:
            break;
    }
}

init() // Inicador