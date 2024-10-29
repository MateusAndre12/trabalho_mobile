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
  },
  {
    path: 'movimentacao',
    loadComponent: () => import('./movimentacao/movimentacao.page').then( m => m.MovimentacaoPage)
  },
  {
    path: 'listar-estoque',
    loadComponent: () => import('./listar-estoque/listar-estoque.page').then( m => m.ListarEstoquePage)
  },
  {
    path: 'saida-produtos',
    loadComponent: () => import('./saida-produtos/saida-produtos.page').then( m => m.SaidaProdutosPage)
  }



];
