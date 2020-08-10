import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace isNumber {
  export interface CustomValidatorArgs {
    strictTypes: boolean;
  }
  export const validator: FieldValidationFunctionSync<CustomValidatorArgs>;
  export function setErrorMessage(message: string | string[]): void;
  export function setCustomArgs(customArgs: CustomValidatorArgs): void;
}
