import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonList, IonItem, IonLabel, IonButton, IonButtons } from '@ionic/angular/standalone';
import { EstoqueService } from '../services/estoque.service';
import { Estoque } from '../model/estoque.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-estoque',
  templateUrl: './listar-estoque.page.html',
  styleUrls: ['./listar-estoque.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonLabel, IonItem, IonList, IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListarEstoquePage implements OnInit {
  estoque: Estoque = new Estoque('');  // Inicializa o estoque vazio
  estoques: Estoque[] = [];  // Lista de estoques
  isEditing: boolean = false;  // Controle para modo de edição

  constructor(private estoqueService: EstoqueService, private router: Router) { }

  ngOnInit() {
    this.loadEstoques();
  }

  loadEstoques() {
    this.estoqueService.getEstoques().then(estoques => {
      this.estoques = estoques;
    }).catch(error => {
      console.error('Erro ao carregar estoques:', error);
    });
  }

  editEstoque(estoque: Estoque) {
    this.router.navigate(['/estoque'], { state: { estoque } });
  }

  deleteEstoque(id_estoque: number) {
    this.estoqueService.deleteEstoque(id_estoque).then(() => {
      this.loadEstoques();  // Atualiza a lista de estoques
    }).catch(error => {
      console.error('Erro ao deletar estoque:', error);
    });
  }

}
