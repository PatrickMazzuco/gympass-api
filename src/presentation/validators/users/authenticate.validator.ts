import { type AuthenticateController } from '@/presentation/controllers/users/authenticate/authenticate.controller';
import { type IValidator } from '@/presentation/interfaces/validator.interface';
import { z } from 'zod';
import { BaseValidator } from '../base.validator';
import { ValidationError } from '@/presentation/errors/validation.error';

const authenticateParamsSchema = z.object({
  email: z
    .string({
      required_error: 'is required',
    })
    .email('must be a valid email address'),
  password: z.string({
    required_error: 'is required',
  }),
});

export class AuthenticateValidator
  extends BaseValidator
  implements IValidator<AuthenticateController.Params>
{
  validate(params: AuthenticateController.Params): ValidationError | null {
    const result = authenticateParamsSchema.safeParse(params);

    if (!result.success) {
      const errors = this.buildErrorMessages(result.error.issues);
      return new ValidationError(errors);
    }

    return null;
  }
}
