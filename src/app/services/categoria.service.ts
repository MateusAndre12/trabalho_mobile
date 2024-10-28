import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private dbName = 'CategoriaDB';
  private objectStoreName = 'categorias';

  constructor() {}

  // Abre o banco de dados IndexedDB
  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.objectStoreName)) {
          const objectStore = db.createObjectStore(this.objectStoreName, { keyPath: 'id_categoria', autoIncrement: true });
          objectStore.createIndex('nome', 'nome', { unique: false });
          objectStore.createIndex('tipo', 'tipo', { unique: false });
        }
      };

      request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
      request.onerror = (event) => {
        console.error('Erro ao abrir o banco de dados', (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };
    });
  }

  // Adicionar categoria (Create)
  addCategoria(categoria: Categoria): Promise<string> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);
        const request = objectStore.add(categoria);

        request.onsuccess = () => resolve('Categoria adicionada com sucesso!');
        request.onerror = (event) => {
          console.error('Erro ao adicionar categoria', (event.target as IDBRequest).error);
          reject('Erro ao adicionar categoria');
        };
      });
    });
  }

  // Listar categorias (Read)
  getCategorias(): Promise<Categoria[]> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readonly');
        const objectStore = transaction.objectStore(this.objectStoreName);
        const request = objectStore.openCursor();
        const categorias: Categoria[] = [];

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            categorias.push(cursor.value);
            cursor.continue();
          } else {
            resolve(categorias);
          }
        };

        request.onerror = (event) => {
          console.error('Erro ao carregar categorias', (event.target as IDBRequest).error);
          reject('Erro ao carregar categorias');
        };
      });
    });
  }

  // Atualizar categoria (Update)
  updateCategoria(categoria: Categoria): Promise<string> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);
        const request = objectStore.put(categoria);

        request.onsuccess = () => resolve('Categoria atualizada com sucesso!');
        request.onerror = (event) => {
          console.error('Erro ao atualizar categoria', (event.target as IDBRequest).error);
          reject('Erro ao atualizar categoria');
        };
      });
    });
  }

  // Excluir categoria (Delete)
  deleteCategoria(id_categoria: number): Promise<string> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);
        const request = objectStore.delete(id_categoria); // Garante que o ID esteja correto
  
        request.onsuccess = () => resolve('Categoria deletada com sucesso!');
        request.onerror = (event) => {
          console.error('Erro ao deletar categoria', (event.target as IDBRequest).error);
          reject('Erro ao deletar categoria');
        };
      });
    });
  }
  
}
