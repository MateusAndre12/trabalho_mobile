import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria.model';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardSubtitle, IonInput, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-criar-categorias',
  templateUrl: './criar-categorias.page.html',
  styleUrls: ['./criar-categorias.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonInput, IonCardSubtitle, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, CommonModule]

})
export class CriarCategoriasPage implements OnInit {
  categorias: Categoria[] = [];
  categoriaForm: Categoria = new Categoria('', '');
  isEditando: boolean = false;

  constructor(private categoriaService: CategoriaService) { }

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

  salvarCategoria() {
    if (this.isEditando) {
      this.categoriaService.updateCategoria(this.categoriaForm)
        .then(msg => {
          console.log(msg);
          this.resetForm();
          this.carregarCategorias();
        })
        .catch(err => console.error(err));
    } else {
      this.categoriaService.addCategoria(this.categoriaForm)
        .then(msg => {
          console.log(msg);
          this.resetForm();
          this.carregarCategorias();
        })
        .catch(err => console.error(err));
    }
  }

  editarCategoria(categoria: Categoria) {
    this.categoriaForm = { ...categoria }; // Clona a categoria para edição
    this.isEditando = true;
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

  resetForm() {
    this.categoriaForm = new Categoria('', '');
    this.isEditando = false;
  }
}
