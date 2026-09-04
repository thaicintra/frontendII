// QUESTÃO 01 - PROVA 1

// A)
const produtosPorCategoria = (produtos, categoria) => {
    return produtos.filter((p) => p.categoria === categoria);
}

// B)
const nomesFormatados = (produtos) => {
    return produtos.map((p) => `ID: ${p.id} | Nome: ${p.nome} | Categoria: ${p.categoria}`)
}

// C)
const totalEstoque = (produtos) => {
    return produtos.reduce((total, p) => total + p.preco * p.qtd, 0);
}

//D)
const mediaPrecoPorCategoria = (produtos, categoria) => {
    const produtosDaCategoria = produtos.filter((p) => p.categoria === categoria)
    
    if (produtosDaCategoria.legth === 0) {
        return 0;
    }

    const soma = produtosDaCategoria.reduce((total, p) => total + p.preco, 0);
   
    return soma/produtosDaCategoria.legth
}

// QUESTÃO 02 - PROVA 2

// A)
class ContaBancaria {
    constructor(titular, saldo) {
        if (new.target === ContaBancaria) { // Colocar erro quando for abstrata
            throw new Error("ContaBancaria é abstrata e não pode ser instanciada")
        }

        this.titular = titular;
        this.saldo = saldo;
    }

    depositar(valor) {
        this.saldo += valor;
    }

    sacar(valor) {
        throw new Error("Método sacar deve ser implementado pela subclasse"); // Método abstrato
    }   

    exibirSaldo() {
        return `Títular ${this.titular}, Saldo ${this.saldo}`;
    }
}

// B)
class ContaCorrente extends ContaBancaria {
    #limiteChequeEspecial; // private

    constructor(titular, saldo, limiteChequeEspecial) {
        super(titular, saldo);
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

// C)
class ContaPoupanca extends ContaBancaria {
    constructor(titular, saldo) {
        super(titular, saldo);
    }

    sacar(valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
            return true;
        }

        return false;
    }
}

// D)
// Não existe interface em JS

// QUESTÃO 03 - PROVA 1

let contatos = [];

// A)
const adicionarContato = (contato) => {
    const contato = { id, nome, telefone };

    if (id === undefined || nome === undefined || telefone === undefined) {
        return false;
    }

    const jaExiste = contatos.find((c) => c.id === id);
    if (jaExiste) {
        return false;
    }

    contatos.push(contato);
    return true;
}

// B)
const removerContato = (id) => {
    const jaExiste = contatos.find((c) => c.id === id);

    if (!jaExiste) {
        return false
    }

    contatos.filter((c) => c.id !== id);
}

// C)
const buscarContato = (nome) => {
    return contatos.find((c) => c.nome.toLowerCase() === nome.toLowerCase) || null
}

// D)
const listarContatos = () => {
    return contatos.map((c) => `ID: ${c.id}, Nome: ${c.nome}, Telefone: ${c.telefone}`)
}

// E)
const limparAgenda = () => {
    contatos = [];
}

// QUESTÃO 04 - PROVA 1

class Pilha {
  #itens = [];

  empilhar(item) {
    this.#itens.push(item);
  }

  desempilhar() {
    return this.#itens.pop();
  }

  topo() {
    return this.#itens[this.#itens.length - 1];
  }

  estaVazia() {
    return this.#itens.length === 0;
  }

  tamanho() {
    return this.#itens.length;
  }

  limpar() {
    this.#itens = [];
  }
}

const pilhaDesfazer = new Pilha();
const pilhaRefazer = new Pilha();

// QUESTÃO 01 - PROVA 2

// A)
const adicionarProduto = (lista, produto) => {
    const jaExiste = lista.some((p) => p.id === produto.id);

    if (!jaExiste) {
        return [...lista, produto] // se não existe, adiciona o produto.
    }

    return lista.map((p) => p.id === produto.id ? produto : p) // se já existe, atualiza o que corresponde ao id, e os outros continuam iguais
}

// B)
const removerProduto = (lista, id) => {
    const removerProduto = () => {
        return lista.filter((p) => p.id !== id) // o filter já atende a condição que se não houver produto na lista, não altera a lista
    }
}

// C)
const atualizarPropriedadeProduto = (lista, id, propriedade, valor) => {
    const validador = {
        nome: (valor) => typeof valor === "string",
        categoria: (valor) => ["eletronico" , "livro", "roupa"].includes(valor),
        preco: (valor) => typeof valor === "number",
        quantidade: (valor) => typeof valor === "number",
        emEstoque: (valor) => typeof valor === "boolean",
    };

    const jaExiste = lista.some((p) => p.id === id);
    
    if(jaExiste) {
        return lista;
    }

    if (!validador || !validador(valor)) {
        return lista;
    }

    lista.map((p) => p.id === id ? {...p, [propriedade]: valor} : p );
}

// D)
const inverterDisponibilidade = (lista, id) => {
    const jaExiste = lista.some((p) => p.id === id);

    if(jaExiste) {
        return lista;
   }

   return lista.map((p) => p.id === id ? {...p, emEstoque: !p.emEstoque} : p);
}

// E)
const buscarPorNome = (lista, nome) => {
    return lista.find((p) => p.nome.toLowerCase() === nome.toLowerCase()) || null;
}

// F)
const listarResumosProdutos = (lista) => {
    return lista.map((p) => `ID: ${p.id}, ${p.nome}, (${p.categoria}) - R$ ${p.preco * p.qtd} - em estoque: ${p.emEstoque ? "sim" : "não"}`);
}

// G)
const limparIndisponiveis = (lista) => {
    return lista.filter((p) => p.emEstoque === true);
}

// QUESTÃO 02 - PROVA 2

// A) Classe abstrata Mídia
class Midia {
    constructor(titulo, copias) {
        if (new.target === Midia) {
            throw new Error("Midia é abstrata e não pode ser instanciada diretamente.");
        }
        this.titulo = titulo;
        this.copias = copias;
        this.alugueis = [];
    }

    descricao() {
        return `Título: ${this.titulo}, Cópias Disponíveis: ${this.copias}`;
    }

    alugar(cliente) {
        if (this.copias <= 0) {
            return false;
        }

        const jaAlugou = this.alugueis.some(
            (registro) => registro.cliente.getCodigo() === cliente.getCodigo()
        );
        if (jaAlugou) {
            return false;
        }

        this.alugueis.push({ cliente, dataAluguel: new Date() });
        this.copias -= 1;
        return true;
    }

    devolver(cliente) {
        throw new Error("Método devolver deve ser implementado pela subclasse.");
    }

    finalizarDevolucao(cliente, diasSemMulta, taxaPorDia) {
        const registro = this.alugueis.find(
            (r) => r.cliente.getCodigo() === cliente.getCodigo()
        );

        if (!registro) {
            return -1;
        }

        const hoje = new Date();
        const msPorDia = 1000 * 60 * 60 * 24;
        const diasAlugado = Math.floor(
            (hoje.getTime() - registro.dataAluguel.getTime()) / msPorDia
        );

        const diasAtraso = diasAlugado - diasSemMulta;
        const multa = diasAtraso > 0 ? diasAtraso * taxaPorDia : 0;

        this.alugueis = this.alugueis.filter(
            (r) => r.cliente.getCodigo() !== cliente.getCodigo()
        );
        this.copias += 1;

        return multa;
    }
}

// B) Classe Filme que estende Midia
class Filme extends Midia {
    #elenco;

    constructor(titulo, copias, elenco) {
        super(titulo, copias);
        this.#elenco = elenco;
    }

    devolver(cliente) {
        return this.finalizarDevolucao(cliente, 5, 3);
    }

    descricao() {
        const descricaoBase = super.descricao();
        const textoElenco = this.#elenco
            .map((a) => `Elenco: ${a.nome} ${a.sobrenome} (${a.nacionalidade})`)
            .join("; ");
        return `${descricaoBase}, ${textoElenco}`;
    }
}

// C) Classe Jogo que estende Midia
class Jogo extends Midia {
    #plataforma;

    constructor(titulo, copias, plataforma) {
        super(titulo, copias);
        this.#plataforma = plataforma;
    }

    devolver(cliente) {
        return this.finalizarDevolucao(cliente, 7, 5);
    }

    descricao() {
        const descricaoBase = super.descricao();
        return `${descricaoBase}, Plataforma: ${this.#plataforma}`;
    }
}

// D) Classe Cliente 
class Cliente {
    #nome;
    #codigo;
    static #codigos = [];

    constructor(nome) {
        this.#nome = nome;
        this.#codigo = Cliente.gerarCodigo();
        Cliente.#codigos.push(this.#codigo);
    }

    get nome() {
        return this.#nome;
    }

    getCodigo() {
        return this.#codigo;
    }

    static get codigos() {
        return Cliente.#codigos;
    }

    static gerarCodigo() {
        let novoCodigo = Cliente.#codigos.length + 1;
        while (Cliente.#codigos.includes(novoCodigo)) {
            novoCodigo++;
        }
        return novoCodigo;
    }
}