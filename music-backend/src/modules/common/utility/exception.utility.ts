import { ValidationError } from 'class-validator';

export interface NormalizeError {
  field: string;
  errorDetail: {
    [type: string]: string;
  };
  messageCode: string;
}

/**
 * Beautiful Validation Errors
 * @param {ValidationError[]} errors
 * @returns {NormalizeError[]}
 */
export function normalizeValidationError(errors: ValidationError[]): NormalizeError[] {
  return errors.map(err => ({
    field: err.property,
    errorDetail: err.constraints,
    messageCode: err.children.length
      ? `${err.property.toUpperCase()}_CHILDREN`
      : `${err.property.toUpperCase()}_${Object.keys(err.constraints)[0].toUpperCase()}`,
  }));
}
