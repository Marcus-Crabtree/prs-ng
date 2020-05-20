import { Injectable } from '@angular/core';
import { User } from '../model/user.class';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SystemService {
  loggedInUser: User = null;


  constructor(private router: Router) { 
  }

  isAdmin(): boolean { 
    return (this.loggedInUser == null) ? false : this.loggedInUser.admin;
  }

  checkLogin(): void {
    // if user is not logged in, send to login page
    // comment out this code for testing purposes
    if(this.loggedInUser == null) {
      console.log("User is not logged in... redirecting to login.");
      this.router.navigateByUrl("/user/login");
    }
  }
  isReviewer(): boolean { 
    return (this.loggedInUser == null) ? false : this.loggedInUser.reviewer;
  }

}
