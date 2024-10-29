import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria.model';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardSubtitle, IonInput, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonButtons } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-categorias',
  templateUrl: './criar-categorias.page.html',
  styleUrls: ['./criar-categorias.page.scss'],
  standalone: true,
  imports: [IonButtons, IonLabel, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonInput, IonCardSubtitle, IonCard, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, CommonModule]

})
export class CriarCategoriasPage implements OnInit {
  categorias: Categoria[] = [];
  categoriaForm: Categoria = new Categoria('', '');
  isEditando: boolean = false;

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const { categoria } = navigation.extras.state as { categoria: Categoria };
      if (categoria) {
        this.categoriaForm = { ...categoria };  // Clona o produto recebido
        this.isEditando = true;  // Muda para o modo de edição
      }
    }
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
  resetForm() {
    this.categoriaForm = new Categoria('', '');
    this.isEditando = false;
  }
}
