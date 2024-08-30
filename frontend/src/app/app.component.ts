import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root', // Seletor usado em index.html
  standalone: true,
  imports: [RouterModule], // Importa o módulo de roteamento
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
