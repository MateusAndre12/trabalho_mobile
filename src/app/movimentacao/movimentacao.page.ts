import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movimentacao } from '../model/movimentacao.model';
import { MovimentacaoService } from '../services/movimentacao.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.page.html',
  styleUrls: ['./movimentacao.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class MovimentacaoPage implements OnInit {
  movimentacoes: Movimentacao[] = [];
  filteredMovimentacoes: Movimentacao[] = [];
  hoje: string = new Date().toISOString().split('T')[0];
  DataSelecionada: string = this.hoje;

  constructor(private movimentacaoService: MovimentacaoService) { }

  ngOnInit() {
    this.loadMovimentacoes();
  }

  loadMovimentacoes() {
    this.movimentacaoService.getMovimentacoes()
      .then(movimentacoes => {
        this.movimentacoes = movimentacoes;
        this.filterByDate(this.DataSelecionada);
      })
      .catch(error => {
        console.error('Erro ao carregar movimentações:', error);
      });
  }

  filterByDate(date: string) {
    if (date) {
      this.filteredMovimentacoes = this.movimentacoes.filter(movimentacao => {
        const movimentacaoDate = new Date(movimentacao.data_movimentacao).toISOString().split('T')[0];
        return movimentacaoDate === date;
      });
      console.log('Movimentações filtradas:', this.filteredMovimentacoes);
    }
  }
}
