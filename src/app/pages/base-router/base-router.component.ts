import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-base-router',
  templateUrl: './base-router.component.html',
  styleUrls: ['./base-router.component.css']
})
export class BaseRouterComponent implements OnInit {

  constructor(private ar: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.ar.queryParams.subscribe(params => {
      this.router.navigate(['./menus'], {queryParams: params});
    });
  }

}
