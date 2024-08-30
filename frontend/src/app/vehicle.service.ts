import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Vehicle {
  id: number;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/api/vehicles'; // URL do backend

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl).pipe(
      catchError(this.handleError) // Tratamento de erro
    );
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle).pipe(
      catchError(this.handleError) // Tratamento de erro
    );
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/${vehicle.id}`, vehicle).pipe(
      catchError(this.handleError) // Tratamento de erro
    );
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError) // Tratamento de erro
    );
  }

  // Método para tratar erros HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente ou erro de rede
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro no lado do servidor
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }
    console.error(errorMessage); // Log do erro para depuração
    return throwError(errorMessage); // Retorna um Observable com uma mensagem de erro
  }
}
