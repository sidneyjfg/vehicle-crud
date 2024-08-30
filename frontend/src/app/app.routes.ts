import { Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';

export const appRoutes: Routes = [
  { path: '', component: VehicleListComponent }, // Rota padrão para a lista de veículos
  { path: 'manage-vehicle', component: VehicleFormComponent } // Rota para o formulário CRUD
];