import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request.class';
import { LineItem } from 'src/app/model/lineItem.class';
import { RequestService } from 'src/app/service/request.service';
import { LineItemService } from 'src/app/service/lineitem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {
  request: Request = new Request();
  title:string = "Approve/Reject";
  titleLineItems: string = "Line Items";
  submitBtnTitle: string = "Approve";
  rejectBtnTitle: string = "Reject";
  lineItems: LineItem[] = [];
  requestId: number = 0;

  constructor(private requestSvc: RequestService,
    private lineitemSvc: LineItemService,
    private router: Router,
    private route: ActivatedRoute,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    this.requestSvc.get(this.requestId).subscribe(
      jr => {
        this.request = jr.data as Request;
        console.log("Request Found!: ", this.request);
      });
      this.lineitemSvc.listLineItemsForRequest(this.requestId).subscribe(
        jr => {
          this.lineItems = jr.data as LineItem[];
          console.log("List of Line Items: ", this.lineItems);
        });
  }

  approve() {
    this.requestSvc.approveRequest(this.request).subscribe(
      jr => {
        if (jr.errors == null) {
          this.router.navigateByUrl("/request/review");
        }
        else {
          console.log("***Error Approving request: ",this.request,jr.errors);
        }
      });
  }
  reject(){
    this.requestSvc.rejectRequest(this.request).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/review");
      }
      else {
        console.log("***Error approving request:", this.request, jr.errors);
      }
    });
  }
}
