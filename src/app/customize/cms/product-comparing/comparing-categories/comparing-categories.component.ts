import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cx-comparing-categories',
  templateUrl: './comparing-categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparingCategoriesComponent implements OnInit {

  constructor(
    private cd: ChangeDetectorRef,
  ) {
    debugger;
  }

  ngOnInit(): void {
  }


}
