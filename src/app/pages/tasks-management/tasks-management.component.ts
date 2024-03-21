import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksManagementService } from '../../service/tasks-management.service';
import { Task } from '../../interface/task.interface';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../../components/popup/popup.component';


@Component({
  selector: 'app-tasks-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PopupComponent
  ],
  templateUrl: './tasks-management.component.html',
  styleUrl: './tasks-management.component.css'
})
export class TasksManagementComponent implements OnInit {
  todoTasks!: Task;
  updateBtn: boolean = false;
  temp_id!: string;
  temp_task!: Task;
  showPopup: boolean = false;
  closePopupParent(checkToClose: boolean){
    this.showPopup = checkToClose;
  }

  constructor(private _TasksManagementService: TasksManagementService) { }

  todoActionForm: FormGroup = new FormGroup({
    task_title: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_\s]{5,50}$/)]),
    task_description: new FormControl(null),
    task_deadline: new FormControl(null),
    compeleted: new FormControl(false),
    archived: new FormControl(false),
  })



  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._TasksManagementService.getAllTasks().subscribe({
      next: (response) => {
        this.todoTasks = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => { },
    })
  }

  onAdd(newTask: Task) {
    this._TasksManagementService.addTask(newTask).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.getAll();
        this.todoActionForm.reset();
      }
    })
  }

  // compelete task
  onCompelete(id: string, fullTask: Task) {
    fullTask.compeleted = !fullTask.compeleted;
    this._TasksManagementService.updateTask(id, fullTask).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("onCompelete is compeleted");
        this.getAll();
      },
    })
  }


  // delete task
  onDelete(id: string) {
    this._TasksManagementService.removeTask(id).subscribe({
      next: (response) => {
        this.todoTasks = response;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.getAll();
      },
    })
  }

  // edit task
  retrieveTask(task: Task) {
    console.log(task);
    this.updateBtn = true;
    this.temp_id = task.id;
    this.todoActionForm.patchValue(task);
    console.log(this.todoActionForm.value);
  }

  cancelUpdate() {
    this.updateBtn = false;
    this.todoActionForm.reset();
  }

  updateTask(updatedForm: Task) {
    this._TasksManagementService.updateTask(this.temp_id, updatedForm).subscribe({
      next: () => { },
      error: () => { },
      complete: () => {
        this.getAll()
        this.todoActionForm.reset();
        this.updateBtn = false;
        this.todoActionForm.reset();
      }
    })
  }

  onTaskClick(getTask: Task) {
    this.showPopup = true;
    this.temp_task = getTask;    
  }
}
