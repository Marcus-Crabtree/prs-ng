import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-user-create',
  templateUrl: '../user-maint-shared/user-maint.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  title: string = "User-Create";
  user: User = new User;
  submitBtnTitle: string = "Create";
  request: Request = new Request();

  constructor(private userSvc: UserService,
    private router: Router,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
  }



  save() {
    this.userSvc.create(this.user).subscribe(
      jr => {
        if (jr.errors == null) {
          this.router.navigateByUrl("/user/list");
        }
        else {
          console.log("***Error creating new user: ", this.user, jr.errors);
        }

      }
    );
  }

}
