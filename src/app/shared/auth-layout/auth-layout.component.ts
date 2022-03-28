/**
 * Title: sign-in.components.ts
 * Author: Oksana Kustova
 * Date: 3/27/2022
 * Description: component.
 */

 import { Component, OnInit } from '@angular/core';
 import { SignInService } from '../../sign-in.service';
 import { Router } from '@angular/router';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { CookieService } from 'ngx-cookie-service';

 @Component({
   selector: 'app-auth-layout',
   templateUrl: './auth-layout.component.html',
   styleUrls: ['./auth-layout.component.css'],
 })
 export class AuthLayoutComponent implements OnInit {
   signinForm!: FormGroup;
   errorMessage!: string;

   constructor(
     private router: Router,
     private cookieService: CookieService,
     private fb: FormBuilder,
     private signinService: SignInService
   ) {
     console.log(this.cookieService.get('session_user'));
   }

   ngOnInit(): void {
     this.signinForm = this.fb.group({
       empId: [
         '',
         Validators.compose([
           Validators.required,
           Validators.pattern('^[0-9]*$'),
         ]),
       ],
     });
   }

   get form() {
     return this.signinForm.controls;
   }

   onSubmit() {
     const formValues = this.signinForm.value;
     const empId = parseInt(formValues.empId);

     if (this.signinService.validate(empId)) {
       this.cookieService.set('session_user', empId.toString(), 1);
       this.router.navigate(['/']);
     } else {
       this.errorMessage = `The employee ID you entered is invalid, please try again.`;
     }
   }
 }
