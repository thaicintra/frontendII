// QUESTAO 01 - PROVA 1
type Produtos = {
    id: number,
    nome: string,
    categoria: string,
    preco: number,
    qtd: number
}

// A) Filtrar por Categoria
const produtosPorCategoria = (produtos: Produtos[], categoria: string): Produtos[] => {
    return produtos.filter((p) => p.categoria === categoria)
}

// B) Nomes Formatados
const nomesFormatados = (produtos: Produtos[]): string[] => {
    return produtos.map((p) => `ID: ${p.id} | Nome: ${p.nome} | Categoria: ${p.categoria}`);
}

// C) Total de estoque
const totalEstoque = (produtos: Produtos[]): number => {
    return produtos.reduce((total, p) => total + p.preco * p.qtd, 0);
}

// D) Media de preço por categoria
const mediaPrecoPorCategoria = (produtos: Produtos[], categoria: string) => {
    const produtosDaCategoria = produtos.filter((p) => p.categoria === categoria);
    if(produtosDaCategoria.length === 0) return 0;

    return produtosDaCategoria.reduce((total, p) => total + p.preco, 0) / produtosDaCategoria.length;
}

// QUESTÃO 02 - PROVA 1

// A) Uma classe abstrata ContaBancaria
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

    abstract sacar (valor: number): boolean;

    exibirSaldo(): string {
        return `Titular: ${this.titular}, Saldo: ${this.saldo}`
    }
}

// B) A classe ContaCorrente que estende ContaBancaria
class ContaCorrente extends ContaBancaria {
    private limiteChequeEspecial: number;

    constructor(saldo: number, titular: string, limiteChequeEspecial: number) {
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

// C) A classe ContaPoupanca que estende ContaBancaria
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

// D) A interface Banco. A chave deve ser o CPF do titular e o valor deve ser uma instância de ContaBancaria.
interface Conta {
    [cpf: string]: ContaBancaria;
}

// QUESTÃO 03 - PROVA 1

type Contatos = {
    id: number,
    nome: string,
    telefone: number
}

let contatos: Contatos[] = []

// A) Adicionar contato:
const adicionarContato = (contato: Contatos): boolean => {
    const { id, nome, telefone } = contato;

    if (id === undefined || nome === undefined || telefone === undefined) {
        return false;
    }

    const existe = contatos.find(c => c.id === id);

    if(existe) {
        return false;
    }

    contatos.push(contato);
    return true;
}
// B) Remover contato:
const removerContato = (id: number): boolean => {
    const existe = contatos.find(c => c.id === id);
    
    if(!existe) return false;

    contatos.filter((c) => c.id !== id);
    return true;
}

// C) Buscar contato:
const buscarContato = (nome: string): Contatos | null => {
    const encontrado = contatos.find((c) => c.nome.toLowerCase() === nome.toLowerCase())

    return encontrado || null
}

// D) Listar contatos:
const listarContatos = (): string[] => {
    return contatos.map(c => `ID: ${c.id}, Nome: ${c.nome}, Telefone: ${c.telefone}`);
}

// e) Limpar agenda:
const limparAgenda = () => {
    contatos = [];
}

// QUESTÃO 04 - PROVA 1
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

// QUESTÃO 01 - PROVA 2 - LAB 6
type Categoria = "eletronico" | "livro" | "roupa";

type Produto = {
    id: number,
    nome: string,
    categoria: Categoria,
    preco: number,
    quantidade: number,
    emEstoque: boolean
};

// 1. Adicionar/atualizar produto:
const adicionarProduto = (lista: Produto[], produto: Produto): Produto[] => {
    const existe = lista.find((p => p.id === produto.id))

    if(!existe) {
        return [...lista, produto]
    }

    return lista.map(p => p.id === produto.id ? produto : p)
}

// 2. Remover produto:
const removerProduto = (lista: Produto[], id: number): Produto[] => {
    return lista.filter(p => p.id !== id);
}

// 3. Atualizar quantidade do produto
const atualizarQuantidadeProduto = (lista: Produto[], id: number, quantidade: string): Produto[]  => {  
    const qtdNumero = parseInt(quantidade);
    if(isNaN(qtdNumero) || qtdNumero < 0) return [...lista];
    
    const existe = lista.find((p => p.id === id)) 
    if(!existe) return [...lista];

    return lista.map((p) => p.id === id ? {...p, quantidade: qtdNumero, emEstoque: qtdNumero === 0 ? false : true} : p)
}

// 4. Alterar status de disponibilidade
const inverterDisponibilidade = (lista: Produto[], id: number): Produto[] => {
    const existe = lista.find((p => p.id === id))
    if(!existe) return [...lista]

    return lista.map((p) => p.id === id ? {...p, emEstoque: !p.emEstoque } : p)
}

// 5. Buscar produto por nome
const buscarPorNome = (lista: Produto[], nome: string): Produto | null => {
    const encontrado = lista.find((p) => p.nome.toLowerCase() === nome.toLowerCase())

    return encontrado || null
}

// 6. Listar resumos de produtos
const listarResumosProdutos = (lista: Produto[]): string[] => {
    return lista.map((p) => `ID: ${p.id}, ${p.nome} (${p.categoria}) - R$ ${(p.preco * p.quantidade).toFixed(2)} - em estoque: ${p.emEstoque ? 'sim' : 'não'}`)
}

// 7. Limpar produtos indisponíveis
const limparIndisponiveis = (lista: Produto[]): Produto[] => {
    return lista.filter((p) => p.emEstoque === true);
}

// QUESTÃO 02

// A) Classe abstrata Mídia
abstract class Midia {
    protected titulo: string;
    protected copias: number;
    protected alugueis: { cliente: Cliente, dataAluguel: Date }[] = []

    constructor (titulo: string, copias: number) {
        this.titulo = titulo;
        this.copias = copias
    }

    descricao(): string {
        return `Título: ${this.titulo}, Cópias Disponíveis: ${this.copias}`
    }

    alugar(cliente: Cliente): boolean {
        if (this.copias < 0) {
            return false;
        }
        
        if (this.alugueis.find(aluguel => aluguel.cliente === cliente)) {
            return false;
        }
        
        this.copias--;
        this.alugueis.push({cliente, dataAluguel: new Date()})
        return true;
    }

    abstract devolver(cliente: Cliente): number;
}

// B) Classe Filme que estende Midia
class Filme extends Midia {
    private elenco: Artista[];

    constructor(titulo: string, copias: number, elenco: Artista[]) {
        super(titulo, copias);
        this.elenco = elenco;
    }

    devolver(cliente: Cliente): number {
        const indiceAluguel = this.alugueis.findIndex(aluguel => aluguel.cliente === cliente);

        if (indiceAluguel === -1) {
            return -1
        }

        //Cálculo da multa
        const diferencaTempo = Date.now() - this.alugueis[indiceAluguel].dataAluguel.getTime();
        const diferencaDia = Math.floor(diferencaTempo/ (1000 * 60 * 60 * 24));

        let multa = 0;

        if(diferencaDia > 5) {
            multa = (diferencaDia - 5) * 3; 
        }

        this.alugueis.splice(indiceAluguel, 1);
        this.copias++;

        return multa
    }

    descricao(): string {
        const elencoFormatado = this.elenco
            .map(artista => `${artista.nome} ${artista.sobrenome} (${artista.nacionalidade})`)
            .join("; ");
        return `${super.descricao()} Elenco: ${elencoFormatado}`
    }
}

// C) Classe Jogo que estende Midia
class Jogo extends Midia {
    private plataforma: string;

    constructor(titulo: string, copias: number, plataforma: string) {
        super(titulo, copias);
        this.plataforma = plataforma;
    }

    devolver(cliente: Cliente): number {
        const indiceAluguel = this.alugueis.findIndex(aluguel => aluguel.cliente === cliente);

        if (indiceAluguel === -1) {
            return -1
        }

        //Cálculo da multa
        const diferencaTempo = Date.now() - this.alugueis[indiceAluguel].dataAluguel.getTime();
        const diferencaDia = Math.floor(diferencaTempo/ (1000 * 60 * 60 * 24));

        let multa = 0;

        if(diferencaDia > 7) {
            multa = (diferencaDia - 7) * 5; 
        }

        this.alugueis.splice(indiceAluguel, 1);
        this.copias++;

        return multa
    }

    descricao(): string {
        return `${super.descricao()}, Plataforma: ${this.plataforma}`
    }
}

// D) Classe Cliente 
class Cliente {
    private _nome: string;
    private _codigo: number;
    private static _codigos: number[] = [];

    constructor(nome: string, _codigo: number) {
        this._nome = nome;
        this._codigo = _codigo;
    }

    get nome(): string {
        return this._nome;
    }

    get codigo(): number {
        return this._codigo;
    }

    static get codigos(): number[] {
        return [...Cliente._codigos];
    }

    static gerarCodigo(): number {
        let codigo = Math.random();
        while(Cliente._codigos.includes(codigo)) {
            codigo = Date.now();
        }

        Cliente._codigos.push(codigo);
        return codigo;
    }
}

// E) Interface Artista
interface Artista {
    nome: string;
    sobrenome: string;
    nacionalidade: string;
}
