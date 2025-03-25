import { Component, Inject, OnInit, inject } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { MoviesComponent } from '../movies/movies.component';
import { ClientsComponent } from '../clients/clients.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-administration',
  imports: [MatTabsModule, MatIconModule, MoviesComponent, ClientsComponent, MatButtonModule],
  templateUrl: './administration.component.html'
})
export class AdministrationComponent implements OnInit {

  readonly dialog = inject(MatDialog);

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.dialog.open(LoginModalComponent, {
              data: { 
                cantidad: 0,
                total : 0,
                peliculaId: 0,
                tipoPago : 0,
                isLogin : true
              }
            });
    } 
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
