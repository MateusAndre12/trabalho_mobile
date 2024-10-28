export class Categoria {
  id_categoria?: any; 
  nome: string;
  tipo: string;

  constructor(nome: string, tipo: string, id_categoria?: number) {
    this.nome = nome;
    this.tipo = tipo;
    if (id_categoria) {
      this.id_categoria = id_categoria;
    }
  }
}
