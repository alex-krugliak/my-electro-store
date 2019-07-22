import {Injectable} from '@angular/core';
import {ICON_TYPE, IconConfig, IconLoaderService} from '@spartacus/storefront';
import {WindowRef} from '@spartacus/core';

// Just an example how overwrite service
@Injectable({
  providedIn: 'root',
})
export class SpartacusIconLoaderService extends IconLoaderService {

  constructor(protected winRef: WindowRef, protected config: IconConfig) {
    super(winRef, config);

  }

  getStyleClasses(iconType: ICON_TYPE | string): string {
    return super.getStyleClasses(iconType);
  }
}
