import { Injectable } from '@angular/core';
import { Movimentacao } from '../model/movimentacao.model';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {
  private dbName = 'MovimentacaoDB';
  private objectStoreName = 'movimentacoes';

  constructor() { }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(this.objectStoreName)) {
          const objectStore = db.createObjectStore(this.objectStoreName, { keyPath: 'id', autoIncrement: true });
          objectStore.createIndex('id_produto', 'id_produto', { unique: false });
          objectStore.createIndex('data_movimentacao', 'data_movimentacao', { unique: false });
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

  addMovimentacao(movimentacao: Movimentacao): Promise<string> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);

        const request = objectStore.add(movimentacao);

        request.onsuccess = () => resolve('Movimentação adicionada com sucesso!');
        request.onerror = (event) => reject((event.target as IDBRequest).error);
      });
    });
  }

  getMovimentacoes(): Promise<Movimentacao[]> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readonly');
        const objectStore = transaction.objectStore(this.objectStoreName);
        const request = objectStore.openCursor();

        const movimentacoes: Movimentacao[] = [];

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            movimentacoes.push(cursor.value);
            cursor.continue();
          } else {
            resolve(movimentacoes);
          }
        };

        request.onerror = (event) => reject((event.target as IDBRequest).error);
      });
    });
  }

  updateMovimentacao(movimentacao: Movimentacao): Promise<string> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);
        
        const request = objectStore.put(movimentacao);

        request.onsuccess = () => resolve('Movimentação atualizada com sucesso!');
        request.onerror = (event) => reject((event.target as IDBRequest).error);
      });
    });
  }

  deleteMovimentacao(id: number): Promise<string> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);

        const request = objectStore.delete(id);

        request.onsuccess = () => resolve('Movimentação deletada com sucesso!');
        request.onerror = (event) => reject((event.target as IDBRequest).error);
      });
    });
  }
}
