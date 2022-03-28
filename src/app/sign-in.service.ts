/**
 * Title: sign-in.service.ts
 * Author: Oksana Kustova
 * Date: 3/27/2022
 * Description: sign-in service.
 */

 import { Injectable } from '@angular/core';

 @Injectable({
   providedIn: 'root'
 })
 export class SignInService {

   empIds: Array<number>;

   constructor() {
     this.empIds = [1007, 1008, 1009, 1010, 1011, 1012];
   }
   validate(empId: number) {
     return this.empIds.some(id => id === empId);
   }
 }
