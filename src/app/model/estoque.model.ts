export class Estoque {
    id_estoque?: any;
    nome: string;
  
    constructor(nome: string, id_estoque?: number) {
      this.nome = nome;
      if (id_estoque) {
        this.id_estoque = id_estoque;
      }
    }
  }