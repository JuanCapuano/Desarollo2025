import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  // Declaración de variables necesarias para las pruebas
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    // Configura el entorno de pruebas para el componente
    await TestBed.configureTestingModule({
      imports: [HomeComponent] // Importa el componente a testear
    })
    .compileComponents(); // Compila los componentes

    // Crea una instancia del componente y lo detecta en el DOM
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test básico que verifica que el componente se haya creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
