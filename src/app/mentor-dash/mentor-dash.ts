import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mentor-dash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mentor-dash.html',
  styleUrls: ['./mentor-dash.css'],
})
export class MentorDash implements OnInit {
  mentees: any[] = [];

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.loadMentees();
  }

  loadMentees() {
    this.authService.getUserProfile().subscribe({
      next: (profile: any) => {
        const mentorId = profile?.data?._id || profile?.data?.id;
        if (!mentorId) {
          console.error('Mentor ID not found in profile:', profile);
          return;
        }

        this.authService.getMentorMentees(mentorId).subscribe({
          next: (res: any) => {
            console.log('Full mentees response:', res);
            this.mentees = res?.data || [];
            console.log('Mentees after assignment:', this.mentees);
            this.cdr.detectChanges();
          },
          error: (err: any) => {
            console.error('Error loading mentees:', err);
          }
        });
      },
      error: (err: any) => {
        console.error('Error loading mentor profile:', err);
      }
    });
  }

  viewTrainingPlan(menteeId: string) {
    this.router.navigate(['/training-plan', menteeId]);
  }

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
