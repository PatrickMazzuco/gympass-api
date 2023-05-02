import { type z } from 'zod';

export type ErrorMessage = {
  field: string;
  errors: string[];
};

export class BaseValidator {
  buildErrorMessages(errors: z.ZodIssue[]): ErrorMessage[] {
    const messages: Record<string, string[]> = {};
    errors.forEach((error) => {
      const { path, message } = error;
      const fieldName = path[0] as string;

      if (!messages[fieldName]) {
        messages[fieldName] = [];
      }

      messages[fieldName].push(`${fieldName} ${message}`);
    });

    return Object.entries(messages).map(([field, errors]) => ({
      field,
      errors,
    }));
  }
}
