import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VehicleService, Vehicle } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  public vehicles: Vehicle[] = [];
  public filteredVehicles: Vehicle[] = [];
  public searchTerm: string = '';
  public errorMessage: string = '';
  public showYearFilter: boolean = false;
  public selectedYear: string = '';
  public availableYears: number[] = [];
  public editingVehicle: Vehicle | null = null;  // Veículo em edição

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe(
      vehicles => {
        this.vehicles = vehicles;
        this.filteredVehicles = vehicles;
        this.availableYears = Array.from(new Set(vehicles.map(vehicle => vehicle.ano)));
      },
      error => this.errorMessage = 'Falha ao carregar veículos.'
    );
  }

  filterVehicles(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredVehicles = this.vehicles.filter(vehicle => {
      const matchesTerm = vehicle.placa.toLowerCase().includes(term) || vehicle.chassi.toLowerCase().includes(term);
      const matchesYear = !this.selectedYear || vehicle.ano.toString() === this.selectedYear;
      return matchesTerm && matchesYear;
    });
  }

  deleteVehicle(id: number): void {
    const vehicle = this.vehicles.find(v => v.id === id);
    if (vehicle) {
      const confirmDelete = confirm(`Tem certeza que deseja deletar o veículo com Placa: ${vehicle.placa} e Chassi: ${vehicle.chassi}?`);
      if (confirmDelete) {
        this.vehicleService.deleteVehicle(id).subscribe(
          () => {
            this.loadVehicles(); // Recarregar a lista após exclusão
          },
          error => this.errorMessage = 'Falha ao excluir o veículo.'
        );
      }
    }
  }

  editVehicle(vehicle: Vehicle): void {
    this.editingVehicle = { ...vehicle }; // Clonar o veículo para edição
  }

  updateVehicle(): void {
    if (this.editingVehicle) {
      this.vehicleService.updateVehicle(this.editingVehicle).subscribe(
        () => {
          this.loadVehicles(); // Recarregar a lista após edição
          this.editingVehicle = null; // Limpar o formulário de edição
        },
        error => this.errorMessage = 'Falha ao atualizar o veículo.'
      );
    }
  }

  toggleYearFilter(): void {
    this.showYearFilter = !this.showYearFilter;
  }

  cancelEdit(): void {
    this.editingVehicle = null; // Cancelar a edição
  }
}
