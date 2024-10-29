import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarEstoquePage } from './listar-estoque.page';

describe('ListarEstoquePage', () => {
  let component: ListarEstoquePage;
  let fixture: ComponentFixture<ListarEstoquePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEstoquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
