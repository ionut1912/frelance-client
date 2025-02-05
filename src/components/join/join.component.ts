import { Component } from '@angular/core';
import {MatRadioButton} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MatCard} from '@angular/material/card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  imports: [
    FormsModule,
    MatRadioButton,
    MatCard,
    RouterLink
  ],
  styleUrls: ['./join.component.scss']
})
export class JoinComponent {
  isClient: boolean = true;

  toggleRole(role: string): void {
    this.isClient = role === 'client';
  }
}
