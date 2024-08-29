import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { VehicleListComponent } from './app/vehicle-list/vehicle-list.component';

bootstrapApplication(VehicleListComponent, appConfig)
  .catch((err) => console.error(err));