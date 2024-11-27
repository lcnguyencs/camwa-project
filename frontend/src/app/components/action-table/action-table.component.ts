import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-table.component.html',
  styleUrls: ['./action-table.component.scss'],
})
export class ActionTableComponent {
  @Input() columns: { field: string; header: string; style?: any }[] = [];
  @Input() data: any[] = [];
  @Input() showEditButton: boolean = true;
  @Input() showDeleteButton: boolean = true;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  get hasActionColumn(): boolean {
    return this.showEditButton || this.showDeleteButton;
  }

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }
  ngOnInit() {
    console.log('Show Edit Button:', this.showEditButton);
    console.log('Show Delete Button:', this.showDeleteButton);
  }
}
