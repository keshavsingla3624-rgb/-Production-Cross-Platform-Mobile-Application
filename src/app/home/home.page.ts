import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonBadge
} from '@ionic/angular/standalone';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonList,
    IonBadge
  ]
})
export class HomePage implements OnInit {

  taskService = inject(TaskService);

  newTitle = '';
  newSubject = '';

  ngOnInit() {
    this.taskService.loadTasks();
  }

  addTask() {

    if (this.newTitle.trim() && this.newSubject.trim()) {

      this.taskService.addTask(
        this.newTitle,
        this.newSubject
      );

      this.newTitle = '';
      this.newSubject = '';
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  completeTask(id: number) {
    this.taskService.toggleTask(id);
  }

  editTask(id: number, oldTitle: string) {

    const newTitle = prompt('Enter new task name', oldTitle);

    if (newTitle && newTitle.trim()) {
      this.taskService.editTask(id, newTitle.trim());
    }
  }

  get completedCount() {
    return this.taskService.tasks().filter(task => task.completed).length;
  }

  get totalCount() {
    return this.taskService.tasks().length;
  }
}