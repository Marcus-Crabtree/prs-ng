import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {
  vendor: Vendor = new Vendor();
  title: string = "Vendor-Detail";
  vendorId: number = 0;
  request: Request = new Request();

  constructor(private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.sysSvc.checkLogin();
    this.request.user = this.sysSvc.loggedInUser;
    this.route.params.subscribe(parms => this.vendorId = parms["id"]);
    this.vendorSvc.get(this.vendorId).subscribe(
      jr => {
        this.vendor = jr.data as Vendor;
        console.log("Vendor Found!: ", this.vendor);
      });
  }

  delete() {
    this.vendorSvc.delete(this.vendorId).subscribe(
      jr => {
        if (jr.errors == null) {
          console.log(jr.data);
          this.router.navigateByUrl("/vendors/list");
        }
        else {
          console.log("***Error deleting Vendor!: ", this.vendorId, jr.errors);
        }
      });
  }

}
