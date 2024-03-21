import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TasksManagementComponent } from './pages/tasks-management/tasks-management.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, title: "To-do List | Home"},
    {path: 'home', component: HomeComponent, title: "To-do List | Home"},
    {path: 'tasks-management', component: TasksManagementComponent, title: "To-do List | Tasks"},
    {path: '**', component: NotFoundComponent, title: "To-do List | 404"},
];
