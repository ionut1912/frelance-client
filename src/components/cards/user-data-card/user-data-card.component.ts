import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { DialogData, UserDetailsData } from '../../../models/Ui';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-user-data-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatButton,
    MatCardActions,
  ],
  templateUrl: './user-data-card.component.html',
  styleUrl: './user-data-card.component.scss',
})
export class UserDataCardComponent {
  @Input() bio!: string;
  @Input() image!: string;
  @Output() userDataChanged = new EventEmitter<UserDetailsData>();

  constructor(private dialog: MatDialog) {}

  openEditUserDataDialog(): void {
    const userData: UserDetailsData = {
      bio: this.bio,
      image: this.image,
    };
    const data: DialogData = {
      dialogName: 'UserData',
      userDetails: userData,
    };
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userDataChanged.emit(result);
      }
    });
  }
}
