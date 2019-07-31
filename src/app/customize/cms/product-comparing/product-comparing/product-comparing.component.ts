import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cx-product-comparing',
  templateUrl: './product-comparing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComparingComponent implements OnInit {

  constructor(
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
  }


}
