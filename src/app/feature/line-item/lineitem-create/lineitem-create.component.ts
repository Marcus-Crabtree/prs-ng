import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/lineItem.class';
import { LineItemService } from 'src/app/service/lineitem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-lineitem-create',
  templateUrl: './lineitem-create.component.html',
  styleUrls: ['./lineitem-create.component.css']
})
export class LineItemCreateComponent implements OnInit {
  title: string = "Line-Item-Create";
  lineItem: LineItem = new LineItem();
  submitBtnTitle: string = "Create";
  requestId: number = 0;
  products: Product[] = [];
  request: Request = new Request();


  constructor(private lineItemSvc: LineItemService, 
    private productSvc: ProductService, 
    private requestSvc: RequestService,
    private router: Router, 
    private route: ActivatedRoute,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    
    this.route.params.subscribe(parms => this.requestId = parms["id"]);
    
    this.requestSvc.get(this.requestId).subscribe(jr => {
      this.lineItem.request = jr.data as Request;
      console.log("Request Found!: ", this.lineItem.request);
    });

    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
  }

  save() {
    this.lineItemSvc.create(this.lineItem).subscribe(
      jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/request-lines/" + this.requestId);
      }
      else {
        console.log("***Error creating new line item:", this.lineItem, jr.errors);
      }
    });
  }

}
