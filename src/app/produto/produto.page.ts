import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProdutoPage implements OnInit {
  productName = '';
  productDate = '';
  productId: number;
  constructor() {
    this.productName = 'Nome do produto';
    this.productDate = 'dd/mm/yyyy';
    this.productId = 1;
   }

  ngOnInit() {
    console.log('teste');
  }

}
