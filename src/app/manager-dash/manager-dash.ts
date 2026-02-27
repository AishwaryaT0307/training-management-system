import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-manager-dash',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-dash.html',
  styleUrl: './manager-dash.css',
})
export class ManagerDash {

  users :any[]= [];
  mentees:any[]=[];
  
  constructor(private service: AuthService, private cdr: ChangeDetectorRef) {
    this.loadUsers();

    this.loadMentees();
    console.log('ManagerDash component initialized');
  }

  ngOnInit() {
    console.log('ManagerDash ngOnInit called');
    this.loadUsers();

    this.loadMentees();
  }



  loadUsers() {
    this.service.getNoRoleUsers().subscribe({
      next: (res: any) => {
        console.log('Full users response:', res);
        this.users = res?.data || [];
        console.log('Users after assignment:', this.users);
        // manually trigger change detection in case async update wasn't picked up
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error loading users:', err);
      }
    });
  }

  assignRole(userId:string, role:string){
    console.log('Assigning role:', role, 'to user:', userId);
    this.service.updateRole(userId, role).subscribe({
      next: () => {
        console.log('Role updated successfully');
        // remove the updated user from the list using Mongo _id
        this.users = this.users.filter(u => u._id !== userId);
      },
      error: (err: any) => {
        console.error('Error assigning role:', err);
      }
    });
  }

  loadMentees(){
    this.service.getAllMentees().subscribe({
      next: (res:any)=>{
        this.mentees = res.data || [];
        console.log('Mentees loaded:', this.mentees);
      },
      error: (err: any) => {
        console.error('Error loading mentees:', err);
      }
    })
  }

  updateTechStack(userId:string, techStack: string){
    console.log('Updating tech stack for user:', userId, 'to:', techStack);
    this.service.assignTechStack(userId, techStack).subscribe({
      next: () => {
        alert('Tech stack updated successfully');
        this.loadMentees(); // Refresh the mentees list to reflect changes
      },
      error: (err: any) => {
        console.error('Error updating tech stack:', err);
      }
    });
  }
}
