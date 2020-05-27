import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.menuItems = [
      new MenuItem("Home","/home", "Return Home"),
      new MenuItem("Users", "/user/list", "List of Users"),
      new MenuItem("Vendors", "/vendor/list","List of Vendors"),
      new MenuItem("Products", "/product/list", "List of Products"),
      new MenuItem("Purchase Request", "/request/list", "List of Requests")];
      if (this.sysSvc.isReviewer()) {
        this.menuItems.push(new MenuItem("Review", "/request/review", "Request Review List")); 
      }
      this.menuItems.push( new MenuItem("Log Out", "/user/login", "Log Out"));
    
  }

}
