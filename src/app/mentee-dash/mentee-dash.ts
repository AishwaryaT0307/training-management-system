import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentee-dash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mentee-dash.html',
  styleUrls: ['./mentee-dash.css'],
})
export class MenteeDash implements OnInit {
  menteeName: string = 'Unknown';
  menteeEmail: string = 'Unknown';
  mentorName: string = 'Unknown';
  techstack: string = 'Unknown';
  menteeId: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadMenteeProfile();
  }

  loadMenteeProfile() {
    this.authService.getUserProfile().subscribe({
      next: (response: any) => {
        console.log('Full API response:', response);
        console.log('Response status:', response?.status);
        console.log('Response data:', response?.data);
        
        // Handle the entire user object, not nested in data
        const userData = response?.data || response || {};
        
        this.menteeId = userData?._id || userData?.id || '';
        this.menteeName = userData?.name || 'Unknown';
        this.menteeEmail = userData?.email || 'Unknown';
        this.techstack = userData?.techstack || 'Unknown';
        this.mentorName = userData?.mentorName || 'Unknown';
        
        console.log('Mapped values:', { 
          id: this.menteeId,
          name: this.menteeName, 
          email: this.menteeEmail, 
          mentor: this.mentorName, 
          techstack: this.techstack 
        });
      },
      error: (err: any) => {
        console.error('Full error response:', err);
        console.error('Error status:', err?.status);
        console.error('Error message:', err?.error?.message);
      }
    });
  }

  gotoTrainingPlan(menteeId: string) {
    this.router.navigate(['/training-plan', menteeId]);
  }
}
