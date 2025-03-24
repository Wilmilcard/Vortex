import { Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { ClientsComponent } from './components/clients/clients.component';
import { PayComponent } from './components/pay/pay.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'administration', component: AdministrationComponent },
    { path: 'clients', component: ClientsComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'pay', component: PayComponent }
];
