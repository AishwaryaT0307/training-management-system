import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service';
@Component({
  selector: 'app-manager-dash',
  imports: [],
  templateUrl: './manager-dash.html',
  styleUrl: './manager-dash.css',
})
export class ManagerDash {

  users :any[]= [];

  constructor(private service: AuthService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.service.getNoRoleUsers().subscribe({
      next: (res) => {
        // API returns { status, data }
        this.users = res && res.data ? res.data : [];
      }
    });
  }

  assignRole(userId:string, role:string){
    // Ensure role is uppercase to match backend expectations and userId is Mongo _id
    const roleUpper = role.toUpperCase();
    this.service.updateRole(userId, roleUpper).subscribe(()=>{
      // remove the updated user from the list using Mongo _id
      this.users = this.users.filter(u => u._id !== userId);
    });
  }
}
