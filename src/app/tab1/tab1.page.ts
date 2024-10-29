import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonNav, IonButton, IonIcon, IonFab, IonFabButton, IonRadioGroup, IonRadio, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonItem, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CategoriasPage } from '../categorias/categorias.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonItem, IonList, IonInfiniteScrollContent, IonInfiniteScroll, IonRadio, IonRadioGroup, IonFabButton, IonFab, IonIcon, IonButton, IonNav, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab1Page {
  categorias = CategoriasPage;
  constructor(private router: Router) {}

  abrirMovimentacao(){
    this.router.navigate(['movimentacao']);
  }
}
