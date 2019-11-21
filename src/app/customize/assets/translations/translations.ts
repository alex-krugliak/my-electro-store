import {translationChunksConfig, translations} from '@spartacus/assets';
import { customComparing } from './en/comparing';

translationChunksConfig.customComparing = ['comparingCategoriesPage', 'comparingProductsPage'];
export const customTranslationChunksConfig = translationChunksConfig;

translations.en.customComparing = customComparing;
export const customTranslations = translations;


