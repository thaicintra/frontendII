// Questão 1
// { id: number, nome: string, categoria: string, preco: number, qtd: number }

// a) Filtrar por categoria
const produtosPorCategoria = (produtos, categoria) => {
    return produtos.filter(p => p.categoria === categoria);
}

// b) Listar nomes formatados
const nomesFormatados = (produtos) => {
    return produtos.map(p => `ID: ${p.id} | Nome: ${p.nome} | Categoria: ${p.categoria}`);
}

// c) Total estoque
const totalEstoque = (produtos) => {
    return produtos.reduce((total, p) => total + p.qtd, 0);
}

// d) Média de preço
const mediaPrecoPorCategoria = (produtos, categoria) => {
    const existe = produtos.filter(p => p.categoria === categoria);
    
    if(existe.length === 0) return 0;

    const soma = produtos.reduce((total, p) => total + p.preco, 0)

    return soma/existe.length
}

// Questão 2
class ContaBancaria {
    #saldo
    #titular

    constructor(saldo, titular) {
        if(new.target === ContaBancaria) {
            throw new Error ("Conta Bancaria é abstrata e não pode ser instanciada")
        }

        this.#saldo = saldo;
        this.#titular = titular;
    }

    depositar(valor) {
        this.#saldo += valor;
    }

    sacar(valor) {
        if(saldo < valor) {
            return false;
        }

        this.#saldo -= valor;
        return true;
    }

    exibirSaldo() {
        return `Titular: ${this.#titular}, Saldo: ${this.#saldo}`
    }
}

class ContaCorrente extends ContaBancaria {
    #limiteChequeEspecial;

    constructor(saldo, titular) {
        super(saldo, titular);
        this.#limiteChequeEspecial = 500;
    }

    sacar(valor) {     
        if(valor <= this.saldo + this.#limiteChequeEspecial) {
            this.saldo -= valor;
            return true;
        }

        return false;
    }
}

class ContaPoupanca extends ContaBancaria {
    constructor(saldo, titular) {
        super(saldo, titular);
    }

    sacar(valor) {
        if(valor > this.saldo) {
            return false;
        }

        this.saldo -= valor;
    }
}