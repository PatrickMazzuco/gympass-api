import { type SignupRequestBody } from '@/infra/http/routes/users.router';
import falso from '@ngneat/falso';

export function mockSignupRequestBody(): SignupRequestBody {
  return {
    name: falso.randFullName(),
    email: falso.randEmail(),
    password: '@Password123',
  };
}
