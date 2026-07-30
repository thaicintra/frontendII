// ===== Seletores =====
const display = document.querySelector('#display') // pegar pelo ID
const teclado = document.querySelector('.keys') // classe do teclado

// ===== Estado da calculadora =====
let entradaAtual = '0'
let valorAnterior = null
let operador = null

teclado.addEventListener('click', (e) => { // e: evento
    const botao = e.target // target: onde aconteceu a ação (evento)
    if (!botao) return 

    const digito = botao.dataset.digit
    const operacao = botao.dataset.op
    const acao = botao.dataset.action

    if (digito !== undefined) {
        inserirDigito(digito)
        atualizarDisplay(entradaAtual)
        return // return serve para não utilizar o 'else'
    }
    if (operacao) {
        //registrarOperacao(operacao)
        return
    }
    if (acao) {
        executarAcao(acao)
        return
    }
})

const inserirDigito = digito => {
    if (digito === "." && entradaAtual.includes('.')) return

    if (entradaAtual === '0') {
        entradaAtual = digito
        return
    }

    entradaAtual += digito
}

const registrarOperacao = (operacao) => {
    if (operacao === 'raiz' || operacao === 'porcento') {
        calcularUnaria(operacao)
        return
    }

    calcularBinaria(operacao) 
}

const calcularBinaria = (op) => {
    
        valorAnterior = Number(entradaAtual)
        operador = op
        entradaAtual = '0'

}

const executarAcao = (acao) => {
    switch (acao) {
        case 'clear':
            limparTudo()
            break
        case 'backspace':
            apagarUltimoDigito()
            break
        case 'sign':
            alternarSinal()
            break
        case 'equals':
            calcularResultadoFinal()
            break
    }
}

const limparTudo = () => {
    entradaAtual = '0'
    valorAnterior = null
    operador = null
    atualizarDisplay(entradaAtual)
}

const apagarUltimoDigito = () => {
    entradaAtual = entradaAtual.length > 1 ? entradaAtual.slice(0, -1) : '0'
    atualizarDisplay(entradaAtual)
}

const alternarSinal = () => {
    if (entradaAtual === '0') return

    entradaAtual = entradaAtual.startsWith('-')
        ? entradaAtual.slice(1)
        : `-${entradaAtual}`
    atualizarDisplay(entradaAtual)
}

const calcularResultadoFinal = () => {

}


// ===== Display =====
const atualizarDisplay = (entrada) => {
    display.textContent = entrada
}


