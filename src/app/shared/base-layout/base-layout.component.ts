/**
 * Title: base-layout.components.ts
 * Author: Oksana Kustova
 * Date: 3/27/2022
* Description: component.
 */

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();
  isLoggedIn: boolean;
  name: string;

  constructor(private cookieService: CookieService, private router: Router)  {
    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;
  }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name');
  }
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/sign-in']);
  }
}
