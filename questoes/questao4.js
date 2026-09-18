// Escreva o seu código aqui
// TS tinha "interface Sala" e "interface Recurso" aqui — em JS puro elas
// não existem, então o formato dos objetos passa a valer só "por acordo".
 
class SalaReservavel {
  constructor(sala) {
    // JS não tem "abstract class" de verdade — simulamos bloqueando
    // a instanciação direta desta classe.
    if (new.target === SalaReservavel) {
      throw new Error("SalaReservavel é abstrata e não pode ser instanciada diretamente");
    }
 
    this.id = sala.id;
    this.nome = sala.nome;
    this.categoria = sala.categoria;
    this.preco = sala.preco;
    this.quantidade = sala.quantidade;
    this.disponivel = sala.disponivel;
    this.reservas = [];
  }
 
  descricao() {
    return `ID: ${this.id}, ${this.nome} (${this.categoria}) - R$ ${this.preco} por hora - horários disponíveis: ${this.quantidade} - disponível: ${this.disponivel === true ? "sim" : "não"}`;
  }
 
  reservar(usuario) {
    // permite reservar se a sala estiver disponível e houver horários disponíveis
    if (!this.disponivel || this.quantidade <= 0) return false;
 
    // um mesmo usuário não pode reservar a mesma sala mais de uma vez simultaneamente
    const jaReservou = this.reservas.some(reserva => reserva.usuario === usuario);
    if (jaReservou) return false;
 
    // decrementa o valor de quantidade em caso de sucesso
    this.quantidade--;
    // registra a reserva com o usuário informado
    this.reservas.push({ usuario: usuario });
 
    // define disponivel como false se quantidade for igual a 0 após a reserva
    if (this.quantidade === 0) {
      this.disponivel = false;
    }
 
    return true;
  }
 
  // JS também não tem "abstract method": lançamos um erro caso a
  // subclasse esqueça de sobrescrever.
  encerrarReserva(usuario) {
    throw new Error("encerrarReserva deve ser implementado pela subclasse");
  }
 
  toSala() {
    return {
      id: this.id,
      nome: this.nome,
      categoria: this.categoria,
      preco: this.preco,
      quantidade: this.quantidade,
      disponivel: this.disponivel,
    };
  }
}
 
class SalaGrupo extends SalaReservavel {
  #recursos;
 
  constructor(sala, recursos) {
    super(sala);
    this.categoria = "grupo";
    this.#recursos = recursos;
  }
 
  encerrarReserva(usuario) {
    const indice = this.reservas.findIndex(r => r.usuario.codigo === usuario.codigo);
    if (indice === -1) return -1;
 
    this.reservas.splice(indice, 1);
    this.quantidade++;
 
    if (this.quantidade > 0) this.disponivel = true;
 
    return 0;
  }
 
  descricao() {
    const recursosDescricao = this.#recursos.map(r => `${r.nome} ${r.tipo} (${r.localizacao})`).join("; ");
    return `${super.descricao()}, Recursos: ${recursosDescricao}`;
  }
}
 
class Usuario {
  #nome;
  #codigo;
  static #codigos = [];
 
  constructor(nome, codigo) {
    this.#nome = nome;
    this.#codigo = Usuario.gerarCodigo();
  }
 
  get nome() {
    return this.#nome;
  }
 
  get codigo() {
    return this.#codigo;
  }
 
  static get codigos() {
    return [...Usuario.#codigos];
  }
 
  static gerarCodigo() {
    let codigo = Math.random();
    while (Usuario.#codigos.includes(codigo)) {
      codigo = Math.random();
    }
 
    Usuario.#codigos.push(codigo);
    return codigo;
  }
}
 
// Não altere esse código
export { SalaReservavel, SalaGrupo, Usuario };