import { TestBed } from '@angular/core/testing';
import { EstoqueService } from './estoque.service';

describe('EstoqueService', () => {
  let service: EstoqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstoqueService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve adicionar um estoque', async () => {
    const novoEstoque = { nome: 'Estoque' }; 
    const resultado = await service.addEstoque(novoEstoque);
    expect(resultado).toBe('Estoque adicionado com sucesso!');
  });

  it('deve obter todos os estoques', async () => {
    const estoques = await service.getEstoques();
    expect(estoques).toBeInstanceOf(Array);
  });

});
