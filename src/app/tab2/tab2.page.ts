import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItemDivider, IonList, IonLabel, IonItemGroup, IonIcon, IonButton, IonItem, IonThumbnail, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent, IonCard, IonButtons } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonItemDivider, IonList, IonLabel, IonItemGroup, IonThumbnail]
})
export class Tab2Page {
  productName = '';
  productDate = '';
  productId: number;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.productName = 'Nome do produto';
    this.productDate = 'dd/mm/yyyy';
    this.productId = 1;
  }

  abrirProduto() {
    this.router.navigate(['/produto']);
  }
  
}
