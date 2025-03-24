import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-administration',
  imports: [MatTabsModule, MatIconModule],
  templateUrl: './administration.component.html'
})
export class AdministrationComponent {

}
