import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent] // Se importa el componente autónomo
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent); // Se crea el componente en un entorno de prueba
    component = fixture.componentInstance; // Se obtiene la instancia del componente
    fixture.detectChanges(); // Se detectan los cambios iniciales del componente
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Se verifica que el componente se haya creado correctamente
  });
});
