import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit,} from '@angular/core';

@Component({
  selector: 'cx-add-to-comparing',
  templateUrl: './add-to-comparing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToComparingComponent implements OnInit, OnDestroy {
  @Input() productCode: string;
  @Input() isAdded = true;

  constructor(
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //TODO
  }

  addToComparing() {
    //TODO
    debugger;
  }

  ngOnDestroy() {
    //TODO
  }
}
