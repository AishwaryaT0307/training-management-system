import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  mentors:any[]=[];
  constructor(private service: AuthService, private cdr: ChangeDetectorRef, private router: Router) {
   this.loadUsers();

    this.loadMentees();
   this.getMentors();
  }

  ngOnInit() {
    
   // this.loadUsers();

    //this.loadMentees();
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
     this.loadMentees();
   this.getMentors();
  }

  loadMentees(){
    this.service.getAllMentees().subscribe({
      next: (res:any)=>{
        this.mentees = res.data || [];
        console.log('Mentees loaded:', this.mentees);
        this.cdr.detectChanges();
     
      },
      error: (err: any) => {
        console.error('Error loading mentees:', err);
      }
    })
  }

  updateTechStack(userId:string, techstack: string){
    console.log('Updating tech stack for user:', userId, 'to:', techstack);
    this.service.assignTechStack(userId, techstack).subscribe({
      next: () => {
        alert('Tech stack updated successfully');
        this.loadMentees(); // Refresh the mentees list to reflect changes
      },
      error: (err: any) => {
        console.error('Error updating tech stack:', err);
      }
    });
  }
  
  getMentors(){
    this.service.getMentors().subscribe({
      next: (res:any)=>{
        console.log('Mentors response:', res);
        this.mentors = res.data || [];
        console.log('Mentors loaded:', this.mentors);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error loading mentors:', err);
      }
    })
  }

  assignMentor(menteeId:string, mentorId:string){
    console.log('Assigning mentor:', mentorId, 'to mentee:', menteeId);
    this.service.assignMentor(menteeId, mentorId).subscribe({
      next: () => {
        alert('Mentor assigned successfully');
        this.loadMentees(); // Refresh the mentees list to reflect changes
      },
      error: (err: any) => {
        console.error('Error assigning mentor:', err);
      }
    });
  }
  viewTrainingPlan(menteeId:string){
    this.router.navigate(['/training-plan', menteeId]);

  }

   logout() {
    this.service.logout().subscribe((next)=>{
      console.log("Logged out successfully");
      this.router.navigate(['/login']);
     },(error)=>{
      console.error("Logout failed", error);
      this.router.navigate(['/login']);
     });
  }
}
