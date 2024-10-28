import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../services/produto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardSubtitle, IonInput, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.page.html',
  styleUrls: ['./criar-produto.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonInput, IonCardSubtitle, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CriarProdutoPage implements OnInit {

  produto: Produto = new Produto(0, '', '', 0, 0, 0);  // Produto vazio para bind no formulário
  produtos: Produto[] = [];  // Lista de produtos
  isEditing: boolean = false;  // Para controlar o modo de edição

  constructor(private router: Router, private route: ActivatedRoute, private produtoService: ProdutoService) { }

  ngOnInit() {
    this.loadProdutos();
  }

  // Adicionar Produto
  addProduto() {
    if (this.isEditing) {
      this.updateProduto();
    } else {
      this.produtoService.addProduto(this.produto).then(() => {
        this.loadProdutos();  // Atualiza a lista de produtos
        this.resetForm();  // Limpa o formulário
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
      this.loadProdutos();  // Atualiza a lista de produtos
      this.resetForm();  // Limpa o formulário
      this.isEditing = false;  // Sai do modo de edição
    }).catch(error => {
      console.error('Erro ao atualizar produto:', error);
    });
  }

  // Editar Produto
  editProduto(produto: Produto) {
    this.produto = { ...produto };  // Clona o produto para editar
    this.isEditing = true;  // Muda para o modo de edição
  }

  deleteProdutoByNome(nome: string) {
    console.log('Chamando exclusão do produto com nome:', nome);
    this.produtoService.deleteProdutoByNome(nome).then(() => {
      this.loadProdutos();  // Atualiza a lista de produtos
    }).catch(error => {
      console.error('Erro ao deletar produto:', error);
    });
  }

  // Limpa o formulário
  resetForm() {
    this.produto = new Produto(0, '', '', 0, 0, 0);  // Reseta para os valores padrão
    this.isEditing = false;  // Sai do modo de edição
  }
}
