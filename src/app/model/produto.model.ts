export class Produto {
    id_produto?: number;
    id_estoque: number;
    codigo_barras: string;
    nome: string;
    quantidade: number;
    quantidade_minima: number;
    data_validade?: Date;
    data_cadastro: Date;
    id_categoria?: number;
    valor: number;
  
    constructor(
      id_estoque: number,
      codigo_barras: string,
      nome: string,
      quantidade: number,
      quantidade_minima: number,
      valor: number,
      data_validade?: Date,
      id_produto?: number,
      id_categoria?: number,
      data_cadastro: Date = new Date()
    ) {
      this.id_estoque = id_estoque;
      this.codigo_barras = codigo_barras;
      this.nome = nome;
      this.quantidade = quantidade;
      this.quantidade_minima = quantidade_minima;
      this.valor = valor;
      this.data_cadastro = data_cadastro;
      if (id_categoria) {
        this.id_categoria = id_categoria;
      }
      if (data_validade) {
        this.data_validade = data_validade;
      }
      if (id_produto) {
        this.id_produto = id_produto;
      }
    }
  }
  