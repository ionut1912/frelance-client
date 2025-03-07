import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { NgForOf, NgIf } from '@angular/common';
import { TableColumn } from '../../../models/generics';

@Component({
  selector: 'app-table',
  imports: [
    MatTooltip,
    MatIcon,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatTable,
    NgForOf,
    NgIf,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Output() addItem = new EventEmitter<void>();
  @Output() editItem = new EventEmitter<T>();
  @Output() deleteItem = new EventEmitter<T>();

  get displayedColumns(): string[] {
    let cols = this.columns.map((c) => c.columnDef);
    if (this.data.length > 0) {
      cols.push('add');
    }
    cols.push('actions');
    return cols;
  }
}
