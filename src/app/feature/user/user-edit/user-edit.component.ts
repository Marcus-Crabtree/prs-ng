import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: '../user-maint-shared/user-maint.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  title: string= "User-edit";
  submitBtnTitle: string="Edit";
  user: User = new User();
  userId: number=0;

  constructor(private userSvc: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => this.userId = parms["id"]);
    this.userSvc.get(this.userId).subscribe(
      jr => {
        this.user = jr.data as User;
      });
  }

save() {
  this.userSvc.edit(this.user).subscribe(
    jr => {
      if(jr.errors==null){
        this.router.navigateByUrl("/user/list");
      }
      else {
        console.log("***Error editing this User!: ",this.user, jr.errors);
      }
    }
  )  
}

}
