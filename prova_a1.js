// QUESTÃO 01

// A) Adicionar/atualizar produto:
const adicionarProduto = (lista, produto) => {
    const existe = lista.some(p => p.id === id);

    if (!existe) {
        return [...lista, produto]
    }

    return lista.map(p => p.id === produto.id ? produto : p);
}

// B) Remover produto:
const removerProduto = (lista, id) => {
    return lista.filter(p => p.id !== id);
}

// C) Atualizar propriedade do produto
const validadores = {
    nome: (valor) => typeof valor === "string",
    categoria: (valor) => ["eletronico", "livro", "roupa"].includes(valor),
    preco: (valor) => typeof valor === "number",
    quantidade: (valor) => typeof valor === "number",
    emEstoque: (valor) => typeof valor === "boolean",
};

const atualizarPropriedadeProduto = (lista, id, propriedade, valor) => {
    const existe = lista.some(p => p.id === id);

    if (!existe) {
        return lista;
    }

    const validador = validadores[propriedade];
    if (!validador || !validador(valor)) {
        return lista;
    }

    return lista.map(p => p.id === id ? { ...p, [propriedade]: valor } : p);
}

// D) Alterar status de disponibilidade
const inverterDisponibilidade = (lista, id) => {
    const existe = lista.some((p) => p.id === id);

    if (!existe) {
        return lista
    }

    return lista.map((p) => p.id === id ? { ...p, emEstoque: !p.emEstoque } : p);
}

// E) Buscar produto por nome
const buscarPorNome = (lista, nome) => {
    return lista.find((p) => p.nome.toLowerCase() === nome.toLowerCase()) || null;
}

// F) Listar resumos de produtos
const listarResumosProdutos = (lista) => {
    return lista.map((p) => `ID: ${p.id}, ${p.nome} (${p.categoria}) - R$ ${p.preco * p.quantidade} - em estoque: ${p.emEstoque ? "sim" : "não"}`);
}

// G) Limpar produtos indisponíveis
const limparIndisponiveis = (lista) => {
    return lista.filter((p) => p.emEstoque === true);
}