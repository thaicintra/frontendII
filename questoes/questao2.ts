// Escreva o seu código aqui
interface Sala {
    id: number;
    nome: string;
    categoria: "individual" | "grupo" | "laboratorio";
    preco: number;
    quantidade: number;
    disponivel: boolean;
}

interface Recurso {
    nome: string;
    tipo: string;
    localizacao: string;
}

abstract class SalaReservavel {
    protected id: number;
    protected nome: string;
    protected categoria: "individual" | "grupo" | "laboratorio";
    protected preco: number;
    protected quantidade: number;
    protected disponivel: boolean;
    protected reservas: { usuario: Usuario }[] = [];

    constructor(sala: Sala) {
        this.id = sala.id;
        this.nome = sala.nome;
        this.categoria = sala.categoria;
        this.preco = sala.preco;
        this.quantidade = sala.quantidade;
        this.disponivel = sala.disponivel;
    }

    descricao(): string {
        return `ID: ${this.id}, ${this.nome} (${this.categoria}) - R$ ${this.preco} por hora - horários disponíveis: ${this.quantidade} - disponível: ${this.disponivel === true ? "sim" : "não"}`;
    }
    
    reservar(usuario: Usuario): boolean {
        // permite reservar se a sala estiver disponível e houver horários disponíveis;
        if(!this.disponivel || this.quantidade <= 0) return false

        // um mesmo usuário não pode reservar a mesma sala mais de uma vez simultaneamente (não pode ter duas reservas abertas da mesma sala).
        const jaReservou = this.reservas.some(reserva => reserva.usuario === usuario)
        if(jaReservou) return false;

        // decrementa o valor de quantidade em caso de sucesso;
        this.quantidade--;

        // registra a reserva com o usuário informado
        this.reservas.push( {usuario: usuario});

        // define disponivel como false se quantidade for igual a 0 após a reserva;
        if(this.quantidade === 0) this.disponivel = false;

        return true  
    }

    abstract encerrarReserva(usuario: Usuario): number;

    toSala() {
        return {
            id: this.id,
            nome: this.nome,
            categoria: this.categoria,
            preco: this.preco,
            quantidade: this.quantidade,
            disponivel: this.disponivel
        }
    }
}

class SalaGrupo extends SalaReservavel {
    private recursos: Recurso[];

    constructor(sala: Sala, recursos: Recurso[]) {
        super(sala)
        this.categoria = "grupo";
        this.recursos = recursos;
    }

    encerrarReserva(usuario: Usuario): number {
        const indice = this.reservas.findIndex(r => r.usuario.codigo === usuario.codigo);

        if(indice === -1) return -1;

        this.reservas.splice(indice, 1);
        this.quantidade++
        
        if(this.quantidade > 0) this.disponivel = true;

        return 0;
    }

    descricao(): string {
        const descricaoGrupo = this.recursos.map(r => `${r.nome} ${r.tipo} (${r.localizacao})`).join("; ")
        return `${super.descricao()}, Recursos: ${descricaoGrupo}`
    }
}

class Usuario {
    private _nome: string;
    private _codigo: number;
    private static _codigos: number[] = []

    constructor(_nome: string, _codigo: number) {
        this._nome = _nome;
        this._codigo = Usuario.gerarCodigo();
    }

    get nome(): string {
        return this._nome;
    }

    get codigo(): number {
        return this._codigo
    }

    static get codigos(): number[] {
        return [...Usuario._codigos];
    }

    static gerarCodigo(): number {
        let codigo = Math.random();
        
        while(this._codigos.includes(codigo)) {
            codigo = Math.random();
        }

        Usuario._codigos.push(codigo);
        return codigo;
    }
}

// Não altere esse código
export { type Sala, type Recurso, SalaReservavel, SalaGrupo, Usuario };




