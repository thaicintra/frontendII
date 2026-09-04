// QUESTÃO 02

// A) Classe abstrata ContaBancaria
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

    exibirSaldo() {
        return `Titular: ${this.titular}, Saldo: ${this.saldo}` 
    }
}

// B) Classe ContaCorrente que extende ContaBancaria
class ContaCorrente extends ContaBancaria {
    private limiteChequeEspecial: number;

    constructor (saldo: number, titular: string, limiteChequeEspecial: number) {
        super(saldo, titular);
        this.limiteChequeEspecial = limiteChequeEspecial;
    }

    sacar(valor: number): boolean {
        if(valor > this.saldo + this.limiteChequeEspecial) {
            return false;
        }

        this.saldo -= valor;
        return true;
    }
}

// C) Classe ContaPoupança que extende ContaBancaria
class ContaPoupança extends ContaBancaria {
    sacar(valor: number): boolean {
        if(valor > this.saldo) {
            return false;
        }

        this.saldo -= valor;
        return true;
    }
}

// D) Interface Banco

interface Banco {
    [cpf: string]: ContaBancaria;
}

// QUESTÃO 04
class Pilha<T> {
    private itens: T[] = [];

    empilhar(item: T) {
        this.itens.push(item);
    }

    desempilhar(): T | undefined {
        return this.itens.pop();
    }

    topo(): T | undefined {
        return this.itens[this.itens.length - 1];
    }

    estaVazia(): boolean {
        return this.itens.length === 0;
    }

    tamanho(): number {
        return this.itens.length;
    }

    limpar() {
        this.itens = [];
    }
}