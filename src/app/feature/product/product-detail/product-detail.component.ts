import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();
  title: string = "Product-Detail";
  productId: number = 0;
  request: Request = new Request();

  constructor(private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.productId = parms["id"]);
    this.productSvc.get(this.productId).subscribe(
      jr => {
        this.product = jr.data as Product;
        console.log("Product found: ", this.product);
      });
  }

  delete() {
    this.productSvc.delete(this.productId).subscribe(
      jr => {
        if (jr.errors == null) {
          console.log(jr.data);
          this.router.navigateByUrl("/product/list");
        }
        else {
          console.log("***Error deleting Product: ", this.productId, jr.errors);
        }
      });
  }

}
