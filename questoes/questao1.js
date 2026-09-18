// Escreva o seu código aqui
// {
// id: number,
// nome: string,
// categoria: "individual" | "grupo" | "laboratorio",
// preco: number,
// quantidade: number,
// disponivel: boolean
// }

const adicionarSala = (lista, sala) => {
  const existe = lista.find(s => s.id === sala.id);
  if (existe) return [...lista];

  return [...lista, sala];
}

const removerSala = (lista, id) => {
  const existe = lista.find(s => s.id === id);
  if (!existe) return [...lista];

  return lista.filter(s => s.id !== id);
}

const atualizarPropriedadeSala = (lista, id, propriedade, valor) => {
  // 1. a sala existe?
  const existe = lista.find(s => s.id === id);
  if (!existe) return [...lista];

  // 2. a propriedade pode ser alterada?
  if (propriedade === "id") return [...lista];
  if (!(propriedade in existe)) return [...lista];

  // 3. o valor é do tipo certo?
  const tipos = { nome: "string", categoria: "string", preco: "number", quantidade: "number", disponivel: "boolean" };
  if (typeof valor !== tipos[propriedade]) return [...lista];

  // 4. caso especial: categoria só aceita 3 valores
  const categoriasValidas = ["individual", "grupo", "laboratorio"];
  if (propriedade === "categoria" && !categoriasValidas.includes(valor)) return [...lista];

  // 5. tudo certo: troca só a sala do id, cria nova lista
  return lista.map(s => s.id === id ? { ...s, [propriedade]: valor } : s);
}

const calcularTotalPorDisponibilidade = (lista, disponibilidade) => {
  const salasConsideradas = disponibilidade === undefined 
    ? lista 
    : lista.filter(s => s.disponivel === disponibilidade);

  return salasConsideradas.reduce((total, s) => total + s.preco * s.quantidade, 0);
}

const buscarPorNome = (lista, nome) => {
  return lista.find(s => s.nome.toLowerCase() === nome.toLowerCase()) || null
}

const listarResumosSalas = (lista) => {
  return lista.map(s => `ID: ${s.id}, ${s.nome} (${s.categoria}) - R$ ${s.preco * s.quantidade} - disponível: ${s.disponivel === true ? "sim" : "não"}`);
}

const limparIndisponiveis = (lista) => {
  return lista.filter(s => s.disponivel === true)
}

// Não altere esse código
export {
  adicionarSala,
  removerSala,
  atualizarPropriedadeSala,
  calcularTotalPorDisponibilidade,
  buscarPorNome,
  listarResumosSalas,
  limparIndisponiveis,
};


