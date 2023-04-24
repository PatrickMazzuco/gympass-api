import { type SignupController } from '@/presentation/controllers/users/signup/signup.controller';
import { type IValidator } from '@/presentation/interfaces/validator.interface';
import { z } from 'zod';
import { BaseValidator } from '../base.validator';
import { ValidationError } from '@/presentation/errors/validation.error';

const hasUppercaseRegex = /[A-Z]/;
const hasLowercaseRegex = /[a-z]/;
const hasNumberRegex = /[0-9]/;
const hasSpecialCharacterRegex = /[^a-zA-Z0-9]/;

const signupParamsSchema = z.object({
  name: z.string({ required_error: 'is required' }),
  email: z
    .string({
      required_error: 'is required',
    })
    .email('must be a valid email address'),
  password: z
    .string()
    .min(8, 'must be at least 8 characters')
    .regex(hasUppercaseRegex, 'must contain at least one uppercase letter')
    .regex(hasLowercaseRegex, 'must contain at least one lowercase letter')
    .regex(hasNumberRegex, 'must contain at least one number')
    .regex(
      hasSpecialCharacterRegex,
      'must contain at least one special character',
    ),
});

export class SignupValidator
  extends BaseValidator
  implements IValidator<SignupController.Params>
{
  validate(params: SignupController.Params): ValidationError | null {
    const result = signupParamsSchema.safeParse(params);

    if (!result.success) {
      const errors = this.buildErrorMessages(result.error.issues);
      return new ValidationError(errors);
    }

    return null;
  }
}
