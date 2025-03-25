import { Component, OnInit } from '@angular/core';
import { ChangeStateRequest } from '../../models/change-state.interface';
import { User } from '../../models/user.interface';
import { ClientsService } from '../../services/clients/clients.service';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';  


import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@Component({
  selector: 'app-clients',
  imports: [MatTableModule, MatSlideToggleModule, FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'email', 'telefono', 'estado'];
  state_request: ChangeStateRequest = {
    id: 0,
    estado: true
  };
  clientes: User[] = [];

  constructor(private clienteService: ClientsService) {}

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(data => {
      this.clientes = data.data;
      console.log(this.clientes);
    });
  }

  onEstadoChange(element: User): void {
    this.state_request.id = element.userId;
    this.state_request.estado = element.activo;

    this.clienteService.changeState(this.state_request).subscribe(data => {
      if(data.success){
        console.log("Se actualizo registro");
      }
    });
  }
}
