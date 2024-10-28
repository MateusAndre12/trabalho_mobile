import { Injectable } from '@angular/core';
import { Estoque } from '../model/estoque.model';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {   
  private dbName = 'EstoqueDB';
  private objectStoreName = 'estoques';

  constructor() {}

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.objectStoreName)) {
          const objectStore = db.createObjectStore(this.objectStoreName, { keyPath: 'id_estoque', autoIncrement: true });
          objectStore.createIndex('nome', 'nome', { unique: false });
        }
      };

      request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
      request.onerror = (event) => reject((event.target as IDBOpenDBRequest).error);
    });
  }

  addEstoque(estoque: Estoque): Promise<string> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);
        const request = objectStore.add(estoque);

        request.onsuccess = () => resolve('Estoque adicionado com sucesso!');
        request.onerror = (event) => reject((event.target as IDBRequest).error);
      });
    });
  }

  getEstoques(): Promise<Estoque[]> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readonly');
        const objectStore = transaction.objectStore(this.objectStoreName);
        const request = objectStore.openCursor();
        const estoques: Estoque[] = [];

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            estoques.push(cursor.value);
            cursor.continue();
          } else {
            resolve(estoques);
          }
        };

        request.onerror = (event) => reject((event.target as IDBRequest).error);
      });
    });
  }

  updateEstoque(estoque: Estoque): Promise<string> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);
        const request = objectStore.put(estoque);

        request.onsuccess = () => resolve('Estoque atualizado com sucesso!');
        request.onerror = (event) => reject((event.target as IDBRequest).error);
      });
    });
  }

  deleteEstoque(id_estoque: number): Promise<string> {
    return this.openDatabase().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([this.objectStoreName], 'readwrite');
        const objectStore = transaction.objectStore(this.objectStoreName);
        const request = objectStore.delete(id_estoque);

        request.onsuccess = () => resolve('Estoque deletado com sucesso!');
        request.onerror = (event) => reject((event.target as IDBRequest).error);
      });
    });
  }
}
