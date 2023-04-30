import { PasswordValidator } from './PasswordValidator';

describe('PasswordValidator', () => {
  it('returns true when password has numbers', () => {
    const password = 'qwe321';

    expect(PasswordValidator.hasNumber(password)).toEqual(true);
  });

  it('returns false when password does not has numbers', () => {
    const password = 'qwewee';

    expect(PasswordValidator.hasNumber(password)).toEqual(false);
  });

  it('returns true when password has special characters', () => {
    const password = 'qwe#wee';

    expect(PasswordValidator.hasSpecialCharacter(password)).toEqual(true);
  });

  it('returns false when password does not has special characters', () => {
    const password = 'qwe2wee';

    expect(PasswordValidator.hasSpecialCharacter(password)).toEqual(false);
  });

  it('returns true when password has lower characters', () => {
    const password = 'QWeR342s!!';

    expect(PasswordValidator.hasLower(password)).toEqual(true);
  });

  it('returns false when password does not has lower characters', () => {
    const password = 'QWE#21';

    expect(PasswordValidator.hasLower(password)).toEqual(false);
  });

  it('returns true when password has upper characters', () => {
    const password = 'QWeR342s!!';

    expect(PasswordValidator.hasUpper(password)).toEqual(true);
  });

  it('returns false when password does not has upper characters', () => {
    const password = 'wqwerfg#21';

    expect(PasswordValidator.hasUpper(password)).toEqual(false);
  });

  it('returns true when password has minimum length', () => {
    const password = 'QWeR34dd2s!!';

    expect(PasswordValidator.hasMinLength(password)).toEqual(true);
  });

  it('returns false when password does not has minimum length', () => {
    const password = 'wqg#21';

    expect(PasswordValidator.hasMinLength(password)).toEqual(false);
  });
});
