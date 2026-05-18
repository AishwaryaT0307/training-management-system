import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormBuilder,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone :true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
registerForm: FormGroup;

register=inject(AuthService);
router=inject(Router);
constructor(private fb: FormBuilder){ 
  this.registerForm = this.fb.group({
    name:["", Validators.required],
    id :["", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    email:["", [Validators.required, Validators.email]],
    password:["", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  });
}

onsubmit(){
  if(this.registerForm.valid){
    console.log(this.registerForm.value);

    this.register.register(this.registerForm.value).subscribe({next:(data)=>{console.log(data);
      this.router.navigate(['/login']);},
  error:(err)=>{console.log(err)}});
  }
}
}
