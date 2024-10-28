import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'categorias',
    loadComponent: () => import('./categorias/categorias.page').then( m => m.CategoriasPage)
  },
  {
    path: 'produto',
    loadComponent: () => import('./produto/produto.page').then( m => m.ProdutoPage)
  },
  {
    path: 'criar-produto',
    loadComponent: () => import('./criar-produto/criar-produto.page').then( m => m.CriarProdutoPage)
  },
  {
    path: 'estoque',
    loadComponent: () => import('./estoque/estoque.page').then( m => m.EstoquePage)
  },
  {
    path: 'criar-categorias',
    loadComponent: () => import('./criar-categorias/criar-categorias.page').then( m => m.CriarCategoriasPage)
  },  {
    path: 'movimentacao',
    loadComponent: () => import('./movimentacao/movimentacao.page').then( m => m.MovimentacaoPage)
  }


];
