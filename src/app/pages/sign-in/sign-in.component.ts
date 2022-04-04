/**
 * Title: sign-in.components.ts
 * Author: Oksana Kustova
 * Date: 3/27/2022
 * Description: component.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient
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

  onSubmit(): void {
    const empId = this.signinForm.controls['empId'].value;

    this.http.get('/api/employees/' + empId).subscribe((res) => {
      if (res) {
        sessionStorage.setItem(
          'name',
          `${res['firstName']} ${res['lastName']}`
        );
        this.cookieService.set('session_user', empId, 1);
        this.router.navigate(['/']);
      } else {
        this.errorMessage = `The employee ID you entered is invalid, please try again.`;
      }
    });
  }
}
