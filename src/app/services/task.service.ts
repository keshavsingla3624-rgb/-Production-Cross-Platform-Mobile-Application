
import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks = signal<Task[]>([]);

  loadTasks() {
    const data = localStorage.getItem('tasks');

    if (data) {
      this.tasks.set(JSON.parse(data));
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  addTask(title: string, subject: string) {

    const newTask: Task = {
      id: Date.now(),
      title: title,
      subject: subject,
      completed: false,
      updatedAt: Date.now()
    };

    this.tasks.update(oldTasks => [...oldTasks, newTask]);

    this.saveTasks();
  }

  deleteTask(id: number) {

    this.tasks.update(oldTasks =>
      oldTasks.filter(task => task.id !== id)
    );

    this.saveTasks();
  }

  toggleTask(id: number) {

    this.tasks.update(oldTasks =>
      oldTasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );

    this.saveTasks();
  }

  editTask(id: number, title: string) {

    this.tasks.update(oldTasks =>
      oldTasks.map(task =>
        task.id === id
          ? { ...task, title: title, updatedAt: Date.now() }
          : task
      )
    );

    this.saveTasks();
  }
}
