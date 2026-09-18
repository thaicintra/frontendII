type Produtos = {
    id: number,
    nome: string,
    categoria: string,
    preco: number,
    qtd: number
}

// a)
const produtoPorCategoria = (produtos: Produtos[], categoria: string): Produtos[] => {
    return produtos.filter(p => p.categoria === categoria);
}

// B) Nomes Formatados
const nomeFormatados = (produtos: Produtos[]): string[] => {
    return produtos.map((p) => `ID: ${p.id} | Nome: ${p.nome} | Categoria: ${p.categoria}`);
}

// C) Total de estoque
const totalEstoques = (produtos: Produtos[]): number => {
    return produtos.reduce((total, p) => total + p.preco * p.qtd, 0);
}

// D) Media de preço por categoria
const mediasPrecoPorCategoria = (produtos: Produtos[], categoria: string) => {
    const produtosDaCategoria = produtos.filter((p) => p.categoria === categoria);
    if(produtosDaCategoria.length === 0) return 0;

    return produtosDaCategoria.reduce((total, p) => total + p.preco, 0) / produtosDaCategoria.length;
}

// Questão 2
abstract class ContaBancaria {
    protected saldo: number;
    protected titular: string;

    constructor(saldo: number, titular: string) {
        this.saldo = saldo;
        this.titular = titular;
    }

    depositar(valor: number) {
        this.saldo += valor;
    }

    abstract sacar(valor: number): boolean
    
    exibirSaldo(): string {
        return `Titular: ${this.titular}, Saldo: ${this.saldo}`
    }
}

class ContaCorrente extends ContaBancaria {
    private limiteChequeEspecial: number;

    constructor(saldo: number, titular: string) {
        super(saldo, titular);
        this.limiteChequeEspecial = 500;
    }

    sacar(valor: number): boolean {
        if(valor <= this.saldo + this.limiteChequeEspecial) {
            this.saldo -= valor;
            return true;
        }

        return false;
    }
}

class ContaPoupanca extends ContaBancaria {
    constructor(saldo: number, titular: string) {
        super(saldo, titular);
    }

    sacar(valor: number): boolean {
        if(valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        }    
        
        return false;
    }
}

interface Banco {
    [cpf: string]: ContaBancaria;
}