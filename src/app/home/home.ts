import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe((next)=>{
      console.log("Logged out successfully");
      this.router.navigate(['/login']);
     },(error)=>{
      console.error("Logout failed", error);
      this.router.navigate(['/login']);
     });
  }
}