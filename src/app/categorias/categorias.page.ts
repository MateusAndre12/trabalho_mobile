import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardSubtitle, IonInput, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonCol, IonRow, IonGrid, IonInput, IonCardSubtitle, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CategoriasPage implements OnInit {
  categorias: Categoria[] = [];
  categoriaForm: Categoria = new Categoria('', '');
  isEditando: boolean = false;

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.getCategorias().then(categorias => {
      this.categorias = categorias;
    }).catch(error => {
      console.error('Erro ao carregar categorias', error);
    });
  }

  editarCategoria(categoria: Categoria) {
    this.router.navigate(['criar-categorias'], { state: { categoria } });
  }

  deletarCategoria(id_categoria: number) {
    console.log('Deletando categoria com ID:', id_categoria);
    this.categoriaService.deleteCategoria(id_categoria)
      .then(msg => {
        console.log(msg);
        this.carregarCategorias();
      })
      .catch(err => console.error(err));
  }
}
