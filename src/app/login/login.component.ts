import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import { Router } from '@angular/router';
import { EducatorService } from '../educator-service/educator.service';
import { User } from '../shared/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  errorMessage!:string;
  successMessage!:string;
  user!:User;
  showDiv:boolean = false;
  msg!:string;


  constructor(private fb : FormBuilder, private educatorService: EducatorService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailId : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    });
  }

  submitForm(form:FormGroup){
    this.educatorService.validateUser(form.value.emailId, form.value.password).subscribe(
      responseData => {
        this.user = responseData;
        console.log(this.user);
        if(this.user != null){
          this.successMessage = "Login Successful";
          sessionStorage.setItem('userName', form.value.emailId);
          sessionStorage.setItem('userRole', this.user.role);
          this.router.navigate(['/home']);

        }
        else{
          this.showDiv = true;
          this.msg = "Invalid Credentials...Try Again!";
        }
      },
      responseError => {
        this.errorMessage = responseError;
        this.showDiv = true;
        console.log(this.errorMessage);
        this.msg = "Something went wrong....Please Try Again!"
      }
    );
  }
}
