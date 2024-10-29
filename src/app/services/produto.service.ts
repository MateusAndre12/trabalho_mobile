import { Injectable } from '@angular/core';
import { Produto } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private dbName = 'ProdutoDB';
  private objectStoreName = 'produtos';

  constructor() { }

  // Abre ou cria o banco de dados IndexedDB
  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      // Cria a estrutura do banco de dados se não existir
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(this.objectStoreName)) {
          const objectStore = db.createObjectStore(this.objectStoreName, { keyPath: 'id_produto', autoIncrement: true });
          objectStore.createIndex('nome', 'nome', { unique: false });
          objectStore.createIndex('categoria', 'categoria', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  // Adicionar produto
  // Adicionar produto
addProduto(produto: Produto): Promise<Produto> {
  return this.openDatabase().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.objectStoreName], 'readwrite');
      const objectStore = transaction.objectStore(this.objectStoreName);

      const request = objectStore.add(produto);

      request.onsuccess = () => {
        const produtoAdicionado: Produto = {
          ...produto,
          id_produto: Number(request.result),
        };
        resolve(produtoAdicionado);
      };

      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  });
}


  // Listar todos os produtos
  getProdutos(): Promise<Produto[]> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readonly');
        const objectStore = transaction.objectStore(this.objectStoreName);
        const request = objectStore.openCursor();

        const produtos: Produto[] = [];

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            produtos.push(cursor.value);
            cursor.continue();
          } else {
            resolve(produtos);
          }
        };

        request.onerror = (event) => reject((event.target as IDBRequest).error);
      });
    });
  }

  // Atualizar produto
  updateProduto(produto: Produto): Promise<string> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);
        
        const request = objectStore.put(produto);

        request.onsuccess = () => resolve('Produto atualizado com sucesso!');
        request.onerror = (event) => reject((event.target as IDBRequest).error);
      });
    });
  }

  // Deletar produto
  deleteProdutoByNome(nome: string): Promise<string> {
    console.log('Tentando deletar o produto com nome:', nome);  // Para debug
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);
        const request = objectStore.openCursor();

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            if (cursor.value.nome === nome) {
              cursor.delete();  // Exclui o produto cujo nome corresponde
              console.log(`Produto com nome "${nome}" deletado com sucesso!`);
              resolve(`Produto com nome "${nome}" deletado com sucesso!`);
            } else {
              cursor.continue();  // Continua para o próximo item
            }
          } else {
            console.log(`Produto com nome "${nome}" não encontrado.`);
            reject(`Produto com nome "${nome}" não encontrado.`);
          }
        };

        request.onerror = (event) => {
          console.error('Erro ao deletar produto:', (event.target as IDBRequest).error);
          reject('Erro ao deletar produto');
        };
      });
    });
  }
}
