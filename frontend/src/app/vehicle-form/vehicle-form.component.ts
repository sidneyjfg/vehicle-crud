import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VehicleService, Vehicle } from '../vehicle.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent {
  public vehicles: Vehicle[] = [];
  public newVehicle: Vehicle = this.initializeNewVehicle();
  public errorMessage: string = '';

  constructor(private vehicleService: VehicleService) {}

  addVehicle(): void {
  
    // Primeiro, consulte a API para obter todos os veículos existentes
    this.vehicleService.getVehicles().subscribe(
      vehicles => {
        this.vehicles = vehicles;
  
  
        // Verificar se a placa ou chassi já existe
        const placaExists = vehicles.some(v => v.placa === this.newVehicle.placa);
        const chassiExists = vehicles.some(v => v.chassi === this.newVehicle.chassi);
  
        if (placaExists) {
          this.errorMessage = 'A placa já está registrada. Por favor, use uma placa diferente.';
    
          return;
        }
  
        if (chassiExists) {
          this.errorMessage = 'O chassi já está registrado. Por favor, use um chassi diferente.';
    
          return;
        }
  
        // Encontrar o próximo ID não utilizado
        let maxId = 0;
        vehicles.forEach(v => {
          if (v.id > maxId) {
            maxId = v.id;
          }
        });
        const nextId = maxId + 1;
        this.newVehicle.id = nextId;
  
  
        // Agora adicione o veículo com o próximo ID
        this.vehicleService.addVehicle(this.newVehicle).subscribe(
          vehicle => {
      
            this.vehicles.push(vehicle); // Adicionar o novo veículo à lista local
            this.resetForm();
            this.errorMessage = ''; // Limpar a mensagem de erro após adição bem-sucedida
          },
          error => {
            this.errorMessage = 'Falha ao adicionar veículo.';
      
          }
        );
      },
      error => {
        this.errorMessage = 'Falha ao carregar veículos para verificar unicidade.';
  
      }
    );
  }
  

  resetForm(): void {
    this.newVehicle = this.initializeNewVehicle();
    this.errorMessage = '';
  }

  private initializeNewVehicle(): Vehicle {
    return {
      id: 0,
      placa: '',
      chassi: '',
      renavam: '',
      modelo: '',
      marca: '',
      ano: new Date().getFullYear(),
    };
  }
}
