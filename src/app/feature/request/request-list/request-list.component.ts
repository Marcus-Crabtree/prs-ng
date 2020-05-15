import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  requests: Request[] = [];
  title: string = "Request List";

  constructor(private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.requestSvc.list().subscribe(
      jr => {
      this.requests = jr.data as Request[];

    });


  }
}


