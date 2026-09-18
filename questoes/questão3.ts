// Questão 01
type Sala = {
    id: number,
    nome: string,
    categoria: "individual" | "grupo" | "laboratorio",
    preco: number,
    quantidade: number,
    disponivel: boolean
}

// A) Adicionar sala
const adicionarSala = (lista: Sala[], sala: Sala): Sala[] => {
    const existe = lista.find(s => s.id === sala.id);
    
    if(existe) {
        return [...lista];
    }

    return [...lista, sala];
}

// B) Remover Sala
const removerSala = (lista: Sala[], id: number): Sala[] => {
    const existe = lista.find(s => s.id === id);
    
    if(!existe) {
        return [...lista]
    }

    return lista.filter(s => s.id !== id);
}

// C) Atualizar propriedade sala
const atualizarPropriedadeSala = (lista: Sala[], id: number, propriedade: string, valor: unknown): Sala[] => {
    const existe = lista.find(s => s.id === id);

    if(!existe) return [...lista];

    if(propriedade === "id") return [...lista]
    if(!(propriedade in existe)) return [...lista] // se não tem a propriedade na lista... 

    const tipoEsperado = propriedade === "preco" || propriedade === "quantidade" ? "number" : propriedade === "disponivel" ? "boolean" : "string";
    if(typeof valor !== tipoEsperado) return [...lista];
    
    const categoriaValidas = ["individual", "grupo", "laboratorio"];
    if(propriedade === "categoria" && !categoriaValidas.includes(valor as Sala["categoria"])) return [...lista]

    return lista.map(s => s.id === id ? {...s, [propriedade]: valor } : s);
}

// D) Calcular valor total
const calcularTotalPorDisponibilidade = (lista: Sala[], disponibilidade?: boolean): number => {
    const salasConsideradas = disponibilidade === undefined ? lista : lista.filter(s => s.disponivel === disponibilidade);

    return salasConsideradas.reduce((total, s) => total + s.preco * s.quantidade, 0);
}

// E) Buscar sala pelo nome
const buscarPorNome = (lista: Sala[], nome: string): Sala | null => {
    return lista.find(s => s.nome.toLowerCase() === nome.toLowerCase()) || null;
}

// F) Listar resumos sala
const listarResumosSala = (lista: Sala[]): string[] => {
    return lista.map(s => `ID: ${s.id}, ${s.nome} (${s.categoria}) - R$ ${s.preco * s.quantidade} - disponível: ${s.disponivel === true ? "sim" : "não"}`)
}

// G) Limpar salas indisponiveis
const limparIndisponiveis = (lista: Sala[]): Sala[] => {
    return lista.filter(s => s.disponivel === true);
}