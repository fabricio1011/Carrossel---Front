'use strict'


async function pesquisarFotos() {
    const url = `http://localhost:3000/fotos`
    const response = await fetch(url)
    const fotos = await response.json()
    return fotos
}

// galeria anttiga so para testar o consumo (codigo base usado da atividade de imagens semestre passado)
async function preencherFotos() {
    const fotos = await pesquisarFotos()
    const galeria = document.getElementById('galeria')
    fotos.forEach(foto => {
        const novaImg = document.createElement('img')
        novaImg.src = foto.imagem
        galeria.appendChild(novaImg)
    })
}

// carrossel   
let imagens = []
let legendas = []
let imagemAtual = 0

async function carregarImagens() {
    const fotos = await pesquisarFotos()
    imagens = fotos.map(foto => foto.imagem)
    legendas = fotos.map(foto => foto.legenda || "nao tem legenda")
    if (imagens.length > 0) {
        mostrarImagem(imagemAtual)
    }
}

function mostrarImagem(index) {
    const img = document.getElementById('carrosselImg')
    const legenda = document.getElementById('carrosselLegenda')
    img.src = imagens[index]
    legenda.textContent = legendas[index]
}

document.getElementById('prevBtn').addEventListener('click', () => {
    imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length
    mostrarImagem(imagemAtual)
})

document.getElementById('nextBtn').addEventListener('click', () => {
    imagemAtual = (imagemAtual+ 1) % imagens.length
    mostrarImagem(imagemAtual)
})

    preencherFotos()
    carregarImagens()


