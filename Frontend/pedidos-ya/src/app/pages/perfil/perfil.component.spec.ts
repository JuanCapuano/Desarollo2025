// Importar utilidades para testeo
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  // Configurar módulo de pruebas antes de cada test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilComponent] // Componente standalone
    })
    .compileComponents();

    // Crear instancia del componente y fixture
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detectar cambios para inicializar template
  });

  // Test simple que verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
