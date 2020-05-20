import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/lineItem.class';
import { Product } from 'src/app/model/product.class';
import { LineItemService } from 'src/app/service/lineitem.service';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-lineitem-edit',
  templateUrl: './lineitem-edit.component.html',
  styleUrls: ['./lineitem-edit.component.css']
})
export class LineItemEditComponent implements OnInit {
   title: string = "Line-Item-Edit";
  submitBtnTitle: string = "Change";
  lineItem: LineItem = new LineItem();
  lineItemId: number = 0;
  products: Product[] = [];
  request: Request = new Request();

  constructor(private lineItemSvc: LineItemService, 
    private productSvc: ProductService,
    private router: Router, 
    private route: ActivatedRoute,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    
    this.route.params.subscribe(parms => this.lineItemId = parms["id"]);
    this.lineItemSvc.get(this.lineItemId).subscribe(jr => {
      this.lineItem = jr.data as LineItem;
    });
    // get list of products
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });
  }

  save() {
    this.lineItemSvc.edit(this.lineItem).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/request/lines/" + this.lineItem.request.id);
      }
      else {
        console.log("***Error editing line item.", this.lineItem, jr.errors);
      }
    });
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }

  }


