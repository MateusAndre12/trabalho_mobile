import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarCategoriasPage } from './criar-categorias.page';

describe('CriarCategoriasPage', () => {
  let component: CriarCategoriasPage;
  let fixture: ComponentFixture<CriarCategoriasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarCategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
