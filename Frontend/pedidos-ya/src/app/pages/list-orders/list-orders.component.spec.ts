import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOrdersComponent } from './list-orders.component';

describe('ListOrdersComponent', () => {
  let component: ListOrdersComponent;
  let fixture: ComponentFixture<ListOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOrdersComponent] // Se importa el componente a testear
    })
    .compileComponents(); // Compilación de componentes

    fixture = TestBed.createComponent(ListOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detona el ciclo de vida de Angular
  });

  // Verifica que el componente se haya creado sin errores
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
