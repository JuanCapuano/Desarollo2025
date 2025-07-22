import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { config } from '../config/env';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  async getData(): Promise<
    Array<{ name: string; description: string; image: string }>
  > {
    return await firstValueFrom(this.http.get<any>(config.urls.getFood));
  }

  
  async login(data: { email: string; password: string }) {
    try {
      const response = await firstValueFrom(this.http.post<any>('http://localhost:3001/login', data));
      console.log('Respuesta completa del backend al login:', response);
      const token = response.accessToken;
      console.log('Token recibido:', token);
      localStorage.setItem('access_token', token);
    } catch (error) {
      console.log('Error backend login:', error);
      throw new Error('Credenciales inválidas o error en el servidor');
    }
  }


  async register(data: { email: string; password: string }) {
    try {
      const response = await firstValueFrom(this.http.post<any>('http://localhost:3001/register', data));
      return response;
    } catch (error) {
      throw new Error('Error en el registro');
    }
  }

  async getMe() {
    const response = await firstValueFrom(this.http.get<any>('http://localhost:3001/me'));
    return response;
  }

  
}
