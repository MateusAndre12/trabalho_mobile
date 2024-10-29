import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../model/produto.model'; 
import { Movimentacao } from '../model/movimentacao.model';
import { MovimentacaoService } from '../services/movimentacao.service';

@Component({
  selector: 'app-saida-produtos',
  templateUrl: './saida-produtos.page.html',
  styleUrls: ['./saida-produtos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule], // Mantenha apenas o IonicModule aqui
})
export class SaidaProdutosPage implements OnInit {
  produtos: Produto[] = [];
  produtoSelecionado: number | undefined;
  quantidade: number | undefined;
  movimentacoes: Movimentacao[] = [];

  constructor(private produtoService: ProdutoService, private movimentacaoService: MovimentacaoService) {}

  ngOnInit() {
    this.loadProdutos();
  }

  loadProdutos() {
    this.produtoService.getProdutos().then(produtos => {
      this.produtos = produtos;
    }).catch(error => {
      console.error('Erro ao carregar produtos:', error);
    });
  }

  confirmarSaida() {
    if (this.quantidade === undefined || this.quantidade <= 0) {
      alert('A quantidade deve ser maior que zero.');
      return;
    }
    const produto = this.produtos.find(p => p.id_produto === this.produtoSelecionado);
    if (produto) {
      if (produto.quantidade >= this.quantidade) {
        produto.quantidade -= this.quantidade;
        const movimentacao = new Movimentacao(
          produto.nome,
          produto.id_produto!,
          this.quantidade,
          'saída'
        );
        this.movimentacaoService.addMovimentacao(movimentacao).then(() => {
          console.log('Movimentação adicionada com sucesso!');
        })
        this.produtoService.updateProduto(produto).then(() => {
          this.quantidade = 0;
          this.loadProdutos();
        }).catch(error => {
          console.error('Erro ao atualizar produto:', error);
        });
      } else {
        console.log('Estoque insuficiente.');
      }
    } else {
      console.log('Produto não encontrado.');
    }
  }
}

  

