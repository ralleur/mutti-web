import { describe, expect, it } from 'vitest';
import { selectSetupLanguage } from './locale';

const languages = [ { Value: 'de' }, { Value: 'en-US' }, { Value: 'en-GB' } ];
describe('setup language selection', () => {
    it('maps regional German browser locales to the server option', () => {
        expect(selectSetupLanguage(languages, 'de-DE', 'en-US')).toBe('de');
        expect(selectSetupLanguage(languages, 'de_AT', 'en-US')).toBe('de');
    });
    it('preserves exact regional options regardless of casing', () => {
        expect(selectSetupLanguage(languages, 'en-gb', 'de')).toBe('en-GB');
        expect(selectSetupLanguage(languages, 'en-us', 'de')).toBe('en-US');
    });
    it('falls back to a valid configured option', () => {
        expect(selectSetupLanguage(languages, 'xx', 'de')).toBe('de');
        expect(selectSetupLanguage(languages, 'xx', 'yy')).toBe('en-US');
    });
});
