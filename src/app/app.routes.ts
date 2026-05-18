import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './auth/register/register';
import { Home } from './home/home';
import { ManagerDash } from './manager-dash/manager-dash';
import { MentorDash } from './mentor-dash/mentor-dash';
import { MenteeDash } from './mentee-dash/mentee-dash';
import { roleGuard } from './role-guard';
import { TrainingPlan } from './training-plan/training-plan';
export const routes: Routes = [
    {path:"", redirectTo :"login",pathMatch:"full"},
{path:"login", component:Login},
{path:"register", component:Register},
{path:"home", component:Home},
{path:"ManagerDash", component:ManagerDash,canActivate:[roleGuard],data:{role:"manager"}},
{path:"MentorDash", component:MentorDash,canActivate:[roleGuard],data:{role:"mentor"}},
{path:"MenteeDash", component:MenteeDash,canActivate:[roleGuard],data:{role:"mentee"}},
{path:"training-plan/:menteeId", component: TrainingPlan},
{path:"**",redirectTo:"login"}
];
