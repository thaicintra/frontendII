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

export { Cliente, Midia, Filme, Jogo, Artista }