import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ProductViewComponent} from '@spartacus/storefront';

@Component({
  selector: 'cx-spartacus-product-view',
  templateUrl: './spartacus-product-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpartacusProductViewComponent extends ProductViewComponent {
}
