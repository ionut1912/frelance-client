import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-password-legend',
  imports: [NgIf],
  templateUrl: './password-legend.component.html',
  styleUrl: './password-legend.component.scss',
  animations: [
    trigger('fade', [
      transition(':leave', [animate('0.5s ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class PasswordLegendComponent {
  @Input() form!: FormGroup;

  isMinLengthMet(): boolean {
    const password = this.form.get('password')?.value;
    return password && password.length >= 8;
  }

  isSpecialCharMet(): boolean {
    const password = this.form.get('password')?.value;
    return password && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }

  isUpperCaseMet(): boolean {
    const password = this.form.get('password')?.value;
    return password && /[A-Z]/.test(password);
  }

  isLowerCaseMet(): boolean {
    const password = this.form.get('password')?.value;
    return password && /[a-z]/.test(password);
  }
}
