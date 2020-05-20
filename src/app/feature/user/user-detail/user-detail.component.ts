import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  title: string = "User-Detail";
  userId: number = 0;
  request: Request = new Request();


  constructor(private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.userId = parms["id"]);
    this.userSvc.get(this.userId).subscribe(
      jr => {
        this.user = jr.data as User;
        console.log("User found!: ", this.user);
      });
  }


  delete() {
    this.userSvc.delete(this.userId).subscribe(
      jr => {
        if (jr.errors == null) {
          console.log(jr.data);
          this.router.navigateByUrl("/user/list");
        }
        else {
          console.log("***Error deleting user!: ", this.userId, jr.errors);
        }
      });
  }

}
