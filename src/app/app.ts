import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Register } from './auth/register/register';
import { Login } from './login/login';
import { ManagerDash } from './manager-dash/manager-dash';
import { MenteeDash } from './mentee-dash/mentee-dash';
import { MentorDash } from './mentor-dash/mentor-dash';
import { TrainingPlan } from './training-plan/training-plan';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Register, Login, ManagerDash, MenteeDash,MentorDash,TrainingPlan],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('auth-app');
}
