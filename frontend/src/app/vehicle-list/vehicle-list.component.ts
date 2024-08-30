import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { VehicleService, Vehicle } from '../vehicle.service'; // Import VehicleService and Vehicle

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Include HttpClientModule here
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  
  // List of vehicles to display
  public vehicles: Vehicle[] = [];

  // List of vehicles filtered based on search
  public filteredVehicles: Vehicle[] = [];

  // Temporary vehicle for adding/editing
  public newVehicle: Vehicle = this.initializeNewVehicle();

  // Flag to check if editing mode is active
  public isEditing: boolean = false;

  // Variable to store error messages
  public errorMessage: string = '';

  // Variable to store search term
  public searchTerm: string = '';

  // Constructor injecting VehicleService
  constructor(private vehicleService: VehicleService) { }

  // Lifecycle method to load vehicles on component initialization
  ngOnInit(): void {
    this.loadVehicles();
  }

  /**
   * Load all vehicles from the backend service
   */
  public loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe(
      (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
        this.filteredVehicles = vehicles; // Initialize filtered list
        this.errorMessage = ''; // Clear error message on successful load
      },
      (error: any) => this.handleError('Falha ao carregar a lista de veículos. Por favor, tente novamente mais tarde.', error)
    );
  }

  /**
   * Filter vehicles based on search term
   */
  public filterVehicles(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredVehicles = this.vehicles.filter(vehicle =>
      vehicle.placa.toLowerCase().includes(term) || vehicle.chassi.toLowerCase().includes(term)
    );
  }

  /**
   * Add or update a vehicle based on the isEditing flag
   */
  public addOrUpdateVehicle(): void {
    if (this.isEditing) {
      this.updateVehicle();
    } else {
      this.addVehicle();
    }
  }

  /**
   * Prepare form for editing a vehicle
   * @param vehicle - The vehicle object to edit
   */
  public editVehicle(vehicle: Vehicle): void {
    this.newVehicle = { ...vehicle };
    this.isEditing = true;
  }

  /**
   * Delete a vehicle by its ID
   * @param id - The ID of the vehicle to delete
   */
  public deleteVehicle(id: number): void {
    this.vehicleService.deleteVehicle(id).subscribe(
      () => {
        this.vehicles = this.vehicles.filter(v => v.id !== id);
        this.filteredVehicles = this.filteredVehicles.filter(v => v.id !== id);
        this.errorMessage = ''; // Clear error message on successful delete
      },
      (error: any) => this.handleError('Falha ao deletar o veículo. Por favor, tente novamente.', error)
    );
  }

  /**
   * Reset the form to its initial state
   */
  public resetForm(): void {
    this.newVehicle = this.initializeNewVehicle();
    this.isEditing = false;
    this.errorMessage = ''; // Clear error message on form reset
  }

  /**
   * Initialize a new vehicle with default values
   * @returns A new Vehicle object with default values
   */
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

  /**
   * Add a new vehicle to the list and backend service
   */
  private addVehicle(): void {
    this.vehicleService.addVehicle(this.newVehicle).subscribe(
      (vehicle: Vehicle) => {
        this.vehicles.push(vehicle);
        this.filteredVehicles.push(vehicle); // Update filtered list
        this.resetForm();
      },
      (error: any) => this.handleError('Falha ao adicionar o veículo. Por favor, verifique os dados e tente novamente.', error)
    );
  }

  /**
   * Update an existing vehicle
   */
  private updateVehicle(): void {
    this.vehicleService.updateVehicle(this.newVehicle).subscribe(
      (updatedVehicle: Vehicle) => {
        const index = this.vehicles.findIndex(v => v.id === updatedVehicle.id);
        if (index !== -1) {
          this.vehicles[index] = updatedVehicle;
          this.filteredVehicles[index] = updatedVehicle; // Update filtered list
        }
        this.resetForm();
      },
      (error: any) => this.handleError('Falha ao atualizar o veículo. Por favor, tente novamente.', error)
    );
  }

  /**
   * Handle HTTP errors and set a user-friendly error message
   * @param userMessage - A friendly message to display to the user
   * @param error - The error object received
   */
  private handleError(userMessage: string, error: any): void {
    this.errorMessage = userMessage;
    console.error('Erro:', error); // Log detailed error for debugging
  }
}
