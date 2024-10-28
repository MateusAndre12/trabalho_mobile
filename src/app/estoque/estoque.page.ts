import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstoqueService } from '../services/estoque.service';
import { Estoque } from '../model/estoque.model';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardSubtitle, IonInput, IonButton, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.page.html',
  styleUrls: ['./estoque.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonButton, IonInput, IonCardSubtitle, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EstoquePage implements OnInit {
  estoque: Estoque = new Estoque('');  // Inicializa o estoque vazio
  estoques: Estoque[] = [];  // Lista de estoques
  isEditing: boolean = false;  // Controle para modo de edição

  constructor(private estoqueService: EstoqueService) { }

  ngOnInit() {
    this.loadEstoques();
  }
  saveEstoque() {
    if (this.isEditing) {
      this.updateEstoque();
    } else {
      this.estoqueService.addEstoque(this.estoque).then(() => {
        this.loadEstoques();  // Atualiza a lista de estoques
        this.resetForm();  // Limpa o formulário
      }).catch(error => {
        console.error('Erro ao adicionar estoque:', error);
      });
    }
  }

  // Função para carregar todos os estoques
  loadEstoques() {
    this.estoqueService.getEstoques().then(estoques => {
      this.estoques = estoques;
    }).catch(error => {
      console.error('Erro ao carregar estoques:', error);
    });
  }

  // Função para atualizar o estoque
  updateEstoque() {
    this.estoqueService.updateEstoque(this.estoque).then(() => {
      this.loadEstoques();  // Atualiza a lista de estoques
      this.resetForm();  // Limpa o formulário
      this.isEditing = false;  // Sai do modo de edição
    }).catch(error => {
      console.error('Erro ao atualizar estoque:', error);
    });
  }

  // Função para deletar o estoque
  deleteEstoque(id_estoque: number) {
    this.estoqueService.deleteEstoque(id_estoque).then(() => {
      this.loadEstoques();  // Atualiza a lista de estoques
    }).catch(error => {
      console.error('Erro ao deletar estoque:', error);
    });
  }

  // Função para editar o estoque (carregar os dados no formulário)
  editEstoque(estoque: Estoque) {
    this.estoque = { ...estoque };  // Clona o estoque para edição
    this.isEditing = true;  // Ativa o modo de edição
  }

  // Função para limpar o formulário
  resetForm() {
    this.estoque = new Estoque('');  // Reseta o formulário
    this.isEditing = false;  // Sai do modo de edição
  }
}
