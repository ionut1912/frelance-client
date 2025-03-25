import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { AddressDto } from '../../../models/UserProfile';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import { DialogData } from '../../../models/Ui';

@Component({
  selector: 'app-address-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatButton,
    MatCardActions,
  ],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss',
})
export class AddressCardComponent {
  @Input() userProfileId!: number;
  @Input() address!: AddressDto;
  @Output() addressChanged = new EventEmitter<AddressDto>();

  constructor(private dialog: MatDialog) {}

  openEditAddressDialog(): void {
    const data: DialogData = {
      userProfileId: this.userProfileId,
      dialogName: 'Address',
      address: this.address,
    };
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addressChanged.emit(result);
      }
    });
  }
}
