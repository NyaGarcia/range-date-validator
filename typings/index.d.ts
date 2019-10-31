import { FieldValidationFunctionSync } from '@lemoncode/fonk';

export namespace rangeDate {
  export const validator: FieldValidationFunctionSync;
  export function setErrorMessage(message: string | string[]): void;
}
