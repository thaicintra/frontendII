// ===== Seletores =====
const display = document.querySelector('#display')
const teclado = document.querySelector('.keys')
const historicoLista = document.querySelector('#history-list')

// ===== Estado da calculadora =====
let entradaAtual = '0'
let valorAnterior = null
let operador = null
let aguardandoNovoValor = false // true quando o próximo dígito deve iniciar um novo número

// Histórico: array de objetos { expressao, resultado }, máximo de 10 itens
let historico = []

// ===== Listener principal =====
teclado.addEventListener('click', (e) => {
    const botao = e.target.closest('.key')
    if (!botao) return

    const digito = botao.dataset.digit
    const operacao = botao.dataset.op
    const acao = botao.dataset.action

    if (digito !== undefined) {
        inserirDigito(digito)
        return
    }
    if (operacao) {
        registrarOperacao(operacao)
        return
    }
    if (acao) {
        executarAcao(acao)
        return
    }
})

// Reutilizar um item do histórico ao clicar nele
historicoLista.addEventListener('click', (e) => {
    const item = e.target.closest('li')
    if (!item) return

    const resultado = item.dataset.resultado
    if (resultado === undefined) return

    entradaAtual = formatarNumeroParaEntrada(Number(resultado))
    valorAnterior = null
    operador = null
    aguardandoNovoValor = false
    atualizarDisplay()
})

// ===== Entrada de dígitos =====
const inserirDigito = (digito) => {
    // Impede múltiplos pontos decimais
    if (digito === '.' && entradaAtual.includes('.')) return

    if (aguardandoNovoValor) {
        entradaAtual = digito === '.' ? '0.' : digito
        aguardandoNovoValor = false
    } else if (entradaAtual === '0' && digito !== '.') {
        entradaAtual = digito
    } else {
        entradaAtual += digito
    }

    atualizarDisplay()
}

// ===== Registro de operações binárias e unárias =====
const registrarOperacao = (operacao) => {
    const valorAtual = parseFloat(entradaAtual)

    // Operações unárias: aplicadas imediatamente sobre o valor atual
    if (operacao === 'raiz') {
        const resultado = calcular(valorAtual, null, 'raiz')
        registrarHistorico(`√(${formatarNumero(valorAtual)})`, resultado)
        entradaAtual = formatarNumeroParaEntrada(resultado)
        aguardandoNovoValor = true
        atualizarDisplay()
        return
    }

    if (operacao === 'porcento') {
        const base = operador !== null && valorAnterior !== null ? valorAnterior : valorAtual
        const resultado = (base * valorAtual) / 100
        entradaAtual = formatarNumeroParaEntrada(resultado)
        atualizarDisplay()
        return
    }

    // Operações binárias (adicao, subtracao, multiplicacao, divisao, potenciacao)
    if (operador !== null && !aguardandoNovoValor) {
        // Encadeamento: calcula a operação pendente antes de armazenar a nova
        const resultado = calcular(valorAnterior, valorAtual, operador)
        registrarHistorico(`${formatarNumero(valorAnterior)} ${simboloOperador(operador)} ${formatarNumero(valorAtual)}`, resultado)
        valorAnterior = resultado
        entradaAtual = formatarNumeroParaEntrada(resultado)
    } else {
        valorAnterior = valorAtual
    }

    operador = operacao
    aguardandoNovoValor = true
    atualizarDisplay()
}

// ===== Cálculo =====
const calcular = (a, b, op) => {
    switch (op) {
        case 'adicao':
            return a + b
        case 'subtracao':
            return a - b
        case 'multiplicacao':
            return a * b
        case 'divisao':
            if (b === 0) return NaN
            return a / b
        case 'potenciacao':
            return Math.pow(a, b)
        case 'raiz':
            if (a < 0) return NaN
            return Math.sqrt(a)
        default:
            return b
    }
}

// ===== Ações (clear, backspace, sign, equals, history-clear) =====
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
        case 'history-clear':
            limparHistorico()
            break
    }
}

const limparTudo = () => {
    entradaAtual = '0'
    valorAnterior = null
    operador = null
    aguardandoNovoValor = false
    atualizarDisplay()
}

const apagarUltimoDigito = () => {
    if (aguardandoNovoValor) return

    entradaAtual = entradaAtual.length > 1 ? entradaAtual.slice(0, -1) : '0'
    atualizarDisplay()
}

const alternarSinal = () => {
    if (entradaAtual === '0') return

    entradaAtual = entradaAtual.startsWith('-')
        ? entradaAtual.slice(1)
        : `-${entradaAtual}`
    atualizarDisplay()
}

const calcularResultadoFinal = () => {
    if (operador === null || valorAnterior === null) return

    const valorAtual = parseFloat(entradaAtual)
    const resultado = calcular(valorAnterior, valorAtual, operador)

    registrarHistorico(`${formatarNumero(valorAnterior)} ${simboloOperador(operador)} ${formatarNumero(valorAtual)}`, resultado)

    entradaAtual = formatarNumeroParaEntrada(resultado)
    valorAnterior = null
    operador = null
    aguardandoNovoValor = true
    atualizarDisplay()
}

// ===== Display =====
const atualizarDisplay = () => {
    display.textContent = entradaAtual
}

const formatarNumero = (numero) => {
    if (Number.isNaN(numero)) return 'Erro'
    return Number(numero.toFixed(10)).toString()
}

const formatarNumeroParaEntrada = (numero) => {
    if (Number.isNaN(numero)) return 'Erro'
    if (!Number.isFinite(numero)) return 'Erro'
    return formatarNumero(numero)
}

const simboloOperador = (op) => {
    const simbolos = {
        adicao: '+',
        subtracao: '−',
        multiplicacao: '×',
        divisao: '÷',
        potenciacao: '^'
    }
    return simbolos[op] || op
}

// ===== Histórico =====
const registrarHistorico = (expressao, resultado) => {
    if (Number.isNaN(resultado)) return

    historico.unshift({ expressao, resultado: formatarNumero(resultado) })

    // Mantém apenas as últimas 10 operações
    if (historico.length > 10) {
        historico = historico.slice(0, 10)
    }

    renderizarHistorico()
}

const renderizarHistorico = () => {
    historicoLista.innerHTML = ''

    historico.forEach((item) => {
        const li = document.createElement('li')
        li.dataset.resultado = item.resultado
        li.textContent = `${item.expressao} = ${item.resultado}`
        li.style.cursor = 'pointer'
        li.title = 'Clique para reutilizar este resultado'
        historicoLista.appendChild(li)
    })
}

const limparHistorico = () => {
    historico = []
    renderizarHistorico()
}
