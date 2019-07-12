import {PageLayoutService, ProductListComponent, ɵf as ProductListComponentService} from '@spartacus/storefront';
import {Component} from '@angular/core';


@Component({
  selector: 'cx-spartacus-product-list',
  templateUrl: './spartacus-product-list.component.html'
})
export class SpartacusProductListComponent extends ProductListComponent {

  constructor(
    pageLayoutService: PageLayoutService,
    productListComponentService: ProductListComponentService
  ) {
    super(pageLayoutService, productListComponentService);
  }

}


