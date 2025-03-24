import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { MoviesComponent } from '../movies/movies.component';
import { ClientsComponent } from '../clients/clients.component';

@Component({
  selector: 'app-administration',
  imports: [MatTabsModule, MatIconModule, MoviesComponent, ClientsComponent],
  templateUrl: './administration.component.html'
})
export class AdministrationComponent {

}
