import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonRow, IonCol, IonGrid, IonButtons, IonBackButton, IonIcon, IonList, IonItemDivider, IonItem, IonLabel, IonAvatar, IonNote, IonTabButton, IonTabs, IonTabBar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.page.html',
  styleUrls: ['./movimentacao.page.scss'],
  standalone: true,
  imports: [IonTabBar, IonTabs, IonTabButton, IonNote, IonAvatar, IonLabel, IonItem, IonItemDivider, IonList, IonIcon, IonBackButton, IonButtons, IonGrid, IonCol, IonRow, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MovimentacaoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
