/**
 * Title: sign-in.service.ts
 * Author: Oksana Kustova
 * Date: 2/5/2022
 * Description: SignInService
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SignInService {
    public loggedStatus$ = new Subject<boolean>();

		public changeStatus(loggedStatus: boolean) {
   		this.loggedStatus$.next(loggedStatus);
       console.log("where?");
  	}

    public loggedName$ = new Subject<string>();

		public changeName(loggedName: string) {
   		this.loggedName$.next(loggedName);
       console.log("here?");
  	}
}
