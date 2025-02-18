import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  imports: [FormsModule, MatRadioModule, MatCard, RouterLink],
  styleUrls: ['./join.component.scss'],
  standalone: true,
})
export class JoinComponent {
  role: 'Freelancer' | 'Client' = 'Freelancer';
}
