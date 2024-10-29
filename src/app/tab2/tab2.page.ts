import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItemDivider, IonList, IonLabel, IonItemGroup, IonIcon, IonButton, IonItem, IonThumbnail, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent, IonCard, IonButtons } from '@ionic/angular/standalone';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonItemDivider, IonList, IonLabel, IonItemGroup, IonThumbnail, CommonModule, FormsModule]
})
export class Tab2Page implements OnInit{
  produto: Produto = new Produto(0, '', '', 0, 0, 0);  // Produto vazio paraa bind no formulário
  produtos: Produto[] = [];  // Lista de produtos
  isEditing: boolean = false;  // Para controlar o modo de edição
  constructor(private produtoService: ProdutoService, private router: Router) {
  }

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

  editProduto(produto: Produto) {
    this.router.navigate(['/criar-produto'], { state: { produto } });
  }

  deleteProdutoByNome(nome: string) {
    console.log('Chamando exclusão do produto com nome:', nome);
    this.produtoService.deleteProdutoByNome(nome).then(() => {
      this.loadProdutos();  // Atualiza a lista de produtos
    }).catch(error => {
      console.error('Erro ao deletar produto:', error);
    });
  }

}
