export class PasswordValidator {
  private static MinimumLength = 10;

  static isMaching = (
    newPassword: string,
    confirmPassword: string
  ): boolean => {
    if (!newPassword.length || !confirmPassword) {
      return false;
    }
    return newPassword === confirmPassword;
  };

  static hasUpper = (password: string): boolean => {
    const expression = /^(?=.*?[A-Z])/gm;
    return this.hasPattern(expression, password);
  };

  static hasLower = (password: string): boolean => {
    const expression = /^(?=.*?[a-z])/gm;
    return this.hasPattern(expression, password);
  };

  private static hasPattern = (pattern: RegExp, input: string): boolean =>
    pattern.test(input);

  static hasNumber = (password: string): boolean => {
    const expression = /^(?=.*?[0-9])/gm;
    return this.hasPattern(expression, password);
  };

  static hasSpecialCharacter = (password: string): boolean => {
    const expression = /^(?=.*?[@#$%^& *\-_!+={}|\\:',.?/`~"();<>[\]])/gm;
    return this.hasPattern(expression, password);
  };

  static hasMinLength = (newPassword: string): boolean => {
    return newPassword.length >= this.MinimumLength;
  };
}
