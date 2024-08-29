import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { VehicleService, Vehicle } from '../vehicle.service'; // Importe VehicleService e Vehicle

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Inclua o HttpClientModule aqui
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  newVehicle: Vehicle = {
    id: 0,
    placa: '',
    chassi: '',
    renavam: '',
    modelo: '',
    marca: '',
    ano: new Date().getFullYear(),
  };

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  // Carregar todos os veículos
  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe(
      (vehicles) => this.vehicles = vehicles,
      (error) => console.error('Error fetching vehicles', error)
    );
  }

  // Adicionar um novo veículo
  addVehicle(): void {
    this.vehicleService.addVehicle(this.newVehicle).subscribe(
      (vehicle) => {
        this.vehicles.push(vehicle);
        this.newVehicle = { id: 0, placa: '', chassi: '', renavam: '', modelo: '', marca: '', ano: new Date().getFullYear() }; // Resetar formulário
      },
      (error) => console.error('Error adding vehicle', error)
    );
  }

  // Atualizar um veículo existente
  updateVehicle(vehicle: Vehicle): void {
    this.vehicleService.updateVehicle(vehicle).subscribe(
      () => console.log('Vehicle updated successfully'),
      (error) => console.error('Error updating vehicle', error)
    );
  }

  // Deletar um veículo
  deleteVehicle(id: number): void {
    this.vehicleService.deleteVehicle(id).subscribe(
      () => this.vehicles = this.vehicles.filter(v => v.id !== id),
      (error) => console.error('Error deleting vehicle', error)
    );
  }
}
