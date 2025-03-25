import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { FormsModule } from '@angular/forms'; 
import {MatButtonModule} from '@angular/material/button';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PayService } from '../../services/pay/pay.service';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';


import { CommonModule, DOCUMENT } from '@angular/common';
import { UserLogin } from '../../models/login.interface';
import { Pay } from '../../models/pay.interface';


@Component({
  selector: 'app-login-modal',
  imports: [
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {

  username: string = '';
  password: string = '';
  readonly dialog = inject(MatDialog);

  login_request: UserLogin = {
    username: '',
    password: ''
  };

  pay_request : Pay = {
    cantidad: 0,
    total: 0,
    peliculaId: 0,
    metodoPago: ''
  }

  constructor(private payService: PayService, @Inject(DOCUMENT) private document: Document, @Inject(MAT_DIALOG_DATA) public data: 
  { 
    cantidad: number,
    total : number,
    peliculaId : number,
    tipoPago: string
  }) {
    this.pay_request.cantidad = data.cantidad;
    this.pay_request.total = data.total;
    this.pay_request.peliculaId = data.peliculaId;
    this.pay_request.metodoPago = data.tipoPago;
  }

  ngOnInit() {
    localStorage.removeItem('token');
  }

  login() {

    if (!this.username || !this.password) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    this.login_request.username = this.username;
    this.login_request.password = this.password;

    this.payService.auth(this.login_request).subscribe({
      next: (data) => {
        if(data.data == null){
          this.dialog.open(DialogModalComponent, { 
            data: { message: "No existe el usuario", titulo: "Error" }
          });   
        }else{
          localStorage.setItem('token', data.data.token);
          this.pago();
        }
      },
      error: (err) => {
        this.dialog.open(DialogModalComponent, { 
          data: { message: JSON.stringify(err.error), titulo: "Error" }
        });
      }
    });
  }

  pago(){
    this.payService.pay(this.pay_request).subscribe({
      next: (data) => {
        if(data.data == null){
          this.dialog.open(DialogModalComponent, { 
            data: { message: "Error en el pago", titulo: "Error" }
          });   
        }else{
          this.dialog.open(DialogModalComponent, { 
            data: { message: "Pago exitoso, se le enviara un mensaje al correo de confirmación 🚀", titulo: "Compra compretada" }
          });  
        }
      },
      error: (err) => {
        this.dialog.open(DialogModalComponent, { 
          data: { message: JSON.stringify(err.error), titulo: "Error" }
        });
      }
    });

  }

  close(){
    //localStorage.removeItem('token');
  }

  
}
