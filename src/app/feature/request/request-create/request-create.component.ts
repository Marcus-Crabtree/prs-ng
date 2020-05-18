import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';
import { LineItem } from 'src/app/model/lineItem.class';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { LineItemService } from 'src/app/service/lineitem.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title: string = "Request Create";
  request: Request = new Request();
  submitBtnTitle: string = "Create";
  lineItem: LineItem = new LineItem();
  products: Product[] = [];
  validated: boolean = true;



  constructor(
    private requestSvc: RequestService,
    private sysSvc: SystemService,
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private lineitemSvc: LineItemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
   
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
  }


  save() {
    this.requestSvc.create(this.request).subscribe(
      jr => {
        console.log("request create",jr);
        if (jr.errors == null) {
          //save line item
          this.request= jr.data as Request;
          this.lineItem.request = this.request
          this.lineitemSvc.create(this.lineItem).subscribe(
            jr => {
              this.lineItem = jr.data as LineItem;
            });
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
