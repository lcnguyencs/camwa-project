import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-attendance.component.html',
  styleUrls: ['./popup-attendance.component.scss'],
})
export class PopupAttendanceComponent {
  @Input() date: string = '';
  @Input() time: string = '';
  @Input() students: { name: string; id: string; status: string }[] = [];

  @Output() close = new EventEmitter<void>(); 

  closePopup() {
    this.close.emit(); 
  }
}