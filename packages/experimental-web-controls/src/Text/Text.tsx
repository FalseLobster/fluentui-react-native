import { ITextProps } from './Text.types';
import { compose } from '@uifabricshared/foundation-compose';
import { foregroundColorTokens, textTokens } from '../tokens/index';
import { loadTextSettings } from './Text.settings';

loadTextSettings();

export const Text = compose<ITextProps>({
  displayName: 'Text',
  settings: ['RNFText'],
  slots: {
    root: {
      slotType: 'div',
      styleFactories: [textTokens, foregroundColorTokens]
    }
  }
});

export default Text;
