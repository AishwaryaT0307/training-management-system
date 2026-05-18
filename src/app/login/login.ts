import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})


export class Login {
loginForm: FormGroup;

constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
  this.loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]] 
  })
}
onSubmit(){
  console.log(this.loginForm.value);
  
  this.authService.login(this.loginForm.value).subscribe({
    next:(data: any)=>{console.log(data)
      if(data.status==="success"){
        this.authService.getUserProfile().subscribe({
          next:(profileData: any)=>{
            console.log(profileData);
            const role = profileData.data.role?.toLowerCase();
            if(role==="manager"){
               this.router.navigate(['/ManagerDash']); //navigate to manager dashboard
            }
          else if(role==="mentor"){
              this.router.navigate(['/MentorDash']); //navigate to mentor dashboard
          }
          else if(role==="mentee"){
              this.router.navigate(['/MenteeDash']); //navigate to mentee dashboard
          }
          else{
              this.router.navigate(['/home']); //navigate to home dashboard
          }
          },
          error:(err: any)=>{console.log(err)}
        });
      }
    },
    error:(err: any)=>{console.log(err)
      alert("Login failed. Please check your credentials and try again.");
    }
  })

  
}
}
