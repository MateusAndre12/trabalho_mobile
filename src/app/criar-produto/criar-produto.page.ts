import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../services/produto.service';
import { EstoqueService } from '../services/estoque.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardSubtitle, IonInput, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonSelectOption } from '@ionic/angular/standalone';
import { MovimentacaoService } from '../services/movimentacao.service';
import { Movimentacao } from '../model/movimentacao.model';
import { Estoque } from '../model/estoque.model';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.page.html',
  styleUrls: ['./criar-produto.page.scss'],
  standalone: true,
  imports: [
    IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonInput, IonCardSubtitle, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSelectOption
  ]
})
export class CriarProdutoPage implements OnInit {
  estoques: Estoque[] = [];
  produto: Produto = new Produto(0, '', '', 0, 0, 0); // Produto vazio para bind no formulário
  produtos: Produto[] = []; // Lista de produtos
  isEditing: boolean = false; // Para controlar o modo de edição
  movimentacoes: Movimentacao[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private movimentacaoService: MovimentacaoService,
    private estoqueService: EstoqueService
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const { produto } = navigation.extras.state as { produto: Produto };
      if (produto) {
        this.produto = { ...produto }; // Clona o produto recebido
        this.isEditing = true; // Muda para o modo de edição
      }
    }
    this.loadProdutos(); // Se necessário, mantenha a função para carregar produtos
    this.carregarEstoques();
  }

  carregarEstoques() {
    this.estoqueService.getEstoques().then(estoques => {
      this.estoques = estoques;
    }).catch(error => {
      console.error('Erro ao carregar estoques', error);
    });
  }

  // Adicionar Produto
  addProduto() {
    if (this.isEditing) {
      this.updateProduto();
    } else {
      this.produtoService.addProduto(this.produto).then((produtoCriado) => {
        const movimentacao = new Movimentacao(
          produtoCriado.nome,
          produtoCriado.id_produto!,
          produtoCriado.quantidade,
          'entrada'
        );
        this.movimentacaoService.addMovimentacao(movimentacao).then(() => {
          console.log('Movimentação adicionada com sucesso!');
        })
        this.loadProdutos(); // Atualiza a lista de produtos
        this.resetForm(); // Limpa o formulário
      }).catch(error => {
        console.error('Erro ao adicionar produto:', error);
      });
    }
  }

  // Carregar Produtos (Read)
  loadProdutos() {
    this.produtoService.getProdutos().then(produtos => {
      this.produtos = produtos;
    }).catch(error => {
      console.error('Erro ao carregar produtos:', error);
    });
  }

  // Atualizar Produto (Update)
  updateProduto() {
    this.produtoService.updateProduto(this.produto).then(() => {
      this.loadProdutos(); // Atualiza a lista de produtos
      this.resetForm(); // Limpa o formulário
      this.isEditing = false; // Sai do modo de edição
    }).catch(error => {
      console.error('Erro ao atualizar produto:', error);
    });
  }

  // Editar Produto
  editProduto(produto: Produto) {
    this.produto = { ...produto }; // Clona o produto para editar
    this.isEditing = true; // Muda para o modo de edição
  }

  deleteProdutoByNome(nome: string) {
    console.log('Chamando exclusão do produto com nome:', nome);
    this.produtoService.deleteProdutoByNome(nome).then(() => {
      this.loadProdutos(); // Atualiza a lista de produtos
    }).catch(error => {
      console.error('Erro ao deletar produto:', error);
    });
  }

  // Limpa o formulário
  resetForm() {
    this.produto = new Produto(0, '', '', 0, 0, 0); // Reseta para os valores padrão
    this.isEditing = false; // Sai do modo de edição
  }
}
