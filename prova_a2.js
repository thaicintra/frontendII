// QUESTÃO 01

// A) Filtrar por categoria
const produtosPorCategoria = (produtos, categoria) => {
    return produtos.filter(p => p.categoria === categoria); // array.filter(callback); callback: (elemento, índice?, arrayOriginal?) => boolean
}

// B) Listar nomes formatados
const nomesFormatados = (produtos) => {
    return produtos.map((p) => `ID: ${p.id} | Nome: ${p.nome} | Categoria: ${p.categoria}`); // array.map(callback); callback: (elemento, índice?, arrayOriginal?) => novoValor
}

// C) Total de Estoque (valor monetário)
const totalEstoque = (produtos) => {
    return produtos.reduce((total, p) => total + p.preco * p.qtd, 0); // array.reduce(callback, valorInicial); callback: (acumulador, elemento, índice?, arrayOriginal?) => novoAcumulador
}

// D) Média por preço
const mediaPrecoPorCategoria = (produtos, categoria) => {
    const daCategoria = produtos.filter(p => p.categoria === categoria);
    if (daCategoria.length === 0) return 0;
    const soma = produtos.reduce((total, p) => total + p.preco, 0);
    return soma / daCategoria.length;
}

// QUESTÃO 03

let contatos = [];

// A) Adicionar contato
const adicionarContato = (contato) => {
    contato = { id, nome, telefone };

    // todas as propriedades do contato são obrigatórias
    if(id === undefined | nome === undefined | telefone === undefined) {
        return false;
    }

    // contatos com id duplicado não podem ser adicionados
    if (contatos.find((c) => c.id === id)) {
        return false;
    }

    // a função deve utilizar o método push() para adicionar o contato à lista de contatos
    contatos.push(contato);
    return true;
}

// B) Remover contato
const removerContato = (id) => {
    // o contato deve existir para ser removido;
    // a função deve utilizar o método filter() para remover o contato da lista de contatos

    const contatoExiste = contatos.find(c => c.id === id);
    if (!contatoExiste) {
        return false;
    }

    contatos = contatos.filter(c => c.id !== id);
    return true;
}

// C) Buscar contato
const buscarContato = (nome) => {
    const encontrado = contatos.find(c => c.nome.toLowerCase() === nome.toLowerCase());

    return encontrado || null;
}

// D) Listar contatos
const listarContatos = () => {
    return contatos.map(c => `ID: ${c.id}, Nome: ${c.nome}, Telefone: ${c.telefone}`);
}

// E) Limpar agenda:
const limparAgenda = () => {
    contatos = [];
}