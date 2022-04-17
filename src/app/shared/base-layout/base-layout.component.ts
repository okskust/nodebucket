/**
 * Title: base-layout.components.ts
 * Author: Oksana Kustova
 * Date: 3/27/2022
 * Description: component.
 */

import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/shared/services/sign-in.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();
  isLoggedIn: boolean;
  name: string;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private readonly signInService: SignInService
  ) {
    console.log(this.cookieService.get('session_user'));
    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;
    console.log(this.isLoggedIn);
    this.name = sessionStorage.getItem('name');
  }

  ngOnInit(): void {

    this.signInService.loggedStatus$.subscribe((loggedStatus) => {
      this.log1(loggedStatus);
    });
    this.signInService.loggedName$.subscribe((loggedName) => {
      this.log2(loggedName);
    });
  }

  private log1(data: boolean): void {
    console.log(data);
    this.isLoggedIn = data;
  }
  private log2(data: string): void {
    console.log(data);
    this.name = data;
  }


  signOut() {
    this.isLoggedIn = false;
    this.cookieService.deleteAll();
    console.log(this.cookieService);
    this.router.navigate(['/session/sign-in']);
  }
}
