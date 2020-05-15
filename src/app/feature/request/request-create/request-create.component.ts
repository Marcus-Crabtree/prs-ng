import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title: string = "Request Create";
  request: Request = new Request();
  submitBtnTitle: string = "Create";
  validated: boolean = true;



  constructor(
    private requestSvc: RequestService,
    private sysSvc: SystemService,
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
  }


  save() {
    this.requestSvc.create(this.request).subscribe(
      jr => {
        if (jr.errors == null) {
          this.router.navigateByUrl("/request/list");
        }
        else {
          console.log("***Error creating new Request: ", this.request, jr.errors);
        }
        if (this.request.description == '' || this.request.justification == '' || this.request.dateNeeded == null || this.request.deliveryMode == '') {

          this.validated = false;

        }
        else {

          this.validated = true;

         

        }

      }
    )
  }

}
