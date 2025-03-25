import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { NgForOf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { DialogData, FreelancerDetailsData } from '../../../models/Ui';
import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-programming-card',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    NgForOf,
    MatButton,
    MatCardActions,
  ],
  templateUrl: './programming-card.component.html',
  styleUrl: './programming-card.component.scss',
})
export class ProgrammingCardComponent {
  @Input() profile!: FreelancerDetailsData;
  @Input() userProfileId!: number;
  @Output() freelancerDataChanged = new EventEmitter<FreelancerDetailsData>();

  constructor(private dialog: MatDialog) {}

  openEditFreelancerDataDialog(): void {
    const data: DialogData = {
      userProfileId: this.userProfileId,
      dialogName: 'FreelancerData',
      freelancerData: this.profile,
    };
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.freelancerDataChanged.emit(result);
      }
    });
  }
}
