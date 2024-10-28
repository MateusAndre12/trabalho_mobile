export class Movimentacao {
    id_movimentacao?: number;
    id_produto: number;
    quantidade: number;
    tipo: string; // entrada ou saida
    data_movimentacao: Date;
  
    constructor(id_produto: number, quantidade: number, tipo: string, data_movimentacao: Date = new Date(), id_movimentacao?: number) {
      this.id_produto = id_produto;
      this.quantidade = quantidade;
      this.tipo = tipo;
      this.data_movimentacao = data_movimentacao;
      if (id_movimentacao) {
        this.id_movimentacao = id_movimentacao;
      }
    }
  }
  