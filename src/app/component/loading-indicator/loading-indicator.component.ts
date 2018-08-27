import {Component, OnInit} from '@angular/core';
import {LoadingIndicatorService} from '../../service/loading-indicator-service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit {

  constructor(public loadingIndicatorService: LoadingIndicatorService) {
  }

  ngOnInit() {
  }


}
