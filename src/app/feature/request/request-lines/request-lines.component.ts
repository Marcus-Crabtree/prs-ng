import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/lineItem.class';
import { RequestService } from 'src/app/service/request.service';
import { LineItemService } from 'src/app/service/lineitem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {
  request: Request = new Request();
  title: string = 'Purchase Request Line Items';
  titleLineItems: string = 'Line Items';
  submitBtnTitle: string = "Submit";
  requestId: number = 0;
  lineItems: LineItem[] = [];
  

  constructor(private requestSvc: RequestService,
    private lineItemSvc: LineItemService, 
    private router: Router, 
    private route: ActivatedRoute,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.requestId = parms['id']);
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Request Found! ", this.request);
    });
    this.lineItemSvc.listLineItemsForRequest(this.requestId).subscribe(jr => {
      this.lineItems = jr.data as LineItem[];
      console.log("List of Line Items", this.lineItems);
    });
    
  }

  delete(lineItemId: number){
    this.lineItemSvc.delete(lineItemId).subscribe(jr => {
      if (jr.errors == null){
        console.log(jr.data);
        // Refresh Request 
        this.requestSvc.get(this.requestId).subscribe(jr => {
          this.request = jr.data as Request;
          console.log("Request Found! ", this.request);
        });
        // Refresh Line Items
        this.lineItemSvc.listLineItemsForRequest(this.requestId).subscribe(jr => {
          this.lineItems = jr.data as LineItem[];
          console.log("List of Line Items", this.lineItems);
        });
      }
      else{
        console.log("***Error deleting Line Item!", lineItemId, jr.errors);
      }
    });
  }

  submitForReview(){
    this.requestSvc.submitForReview(this.request).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/list");
      }
      else {
        console.log("***Error submitting request.", this.request, jr.errors);
      }
    });
  }

}
