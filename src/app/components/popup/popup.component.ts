import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../interface/task.interface';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {
  @Input() data!: Task;
  @Output() closePopup = new EventEmitter<boolean>();

  ngOnInit(): void {
    console.log(this.data);
  }

  onClosePopup() {
    const showPopup: boolean = false;
    this.closePopup.emit(showPopup);
  }
}
