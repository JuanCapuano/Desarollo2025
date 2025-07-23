// Importaciones necesarias para las pruebas unitarias
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  // Antes de cada prueba se configura el módulo de pruebas
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderComponent] // Importa el componente standalone
    })
    .compileComponents();

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta cambios para inicializar template
  });

  // Prueba que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
