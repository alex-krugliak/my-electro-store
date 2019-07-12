import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrencyService, LanguageService, ProductSearchService, RoutingService} from '@spartacus/core';
import {ɵf as ProductListComponentService} from '@spartacus/storefront';


@Injectable()
export class SpartacusProductListComponentService extends ProductListComponentService {

  constructor(
    protected productSearchService: ProductSearchService,
    protected routing: RoutingService,
    protected activatedRoute: ActivatedRoute,
    protected currencyService: CurrencyService,
    protected languageService: LanguageService,
    protected router: Router
  ) {
    super(productSearchService, routing, activatedRoute, currencyService, languageService, router);
  }
}
