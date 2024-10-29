import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaidaProdutosPage } from './saida-produtos.page';

describe('SaidaProdutosPage', () => {
  let component: SaidaProdutosPage;
  let fixture: ComponentFixture<SaidaProdutosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidaProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
