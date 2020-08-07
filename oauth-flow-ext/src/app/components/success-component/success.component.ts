import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit, OnDestroy {
  id = '';
  private sub: Subscription;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
