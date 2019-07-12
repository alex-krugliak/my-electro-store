import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'cx-spartacus-product-list-item',
  templateUrl: './spartacus-product-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpartacusProductListItemComponent {
  @Input() product: any;
}
