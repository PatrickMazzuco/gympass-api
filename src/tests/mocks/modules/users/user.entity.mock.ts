import { type User } from '@/domain/entities/user.entity';
import falso from '@ngneat/falso';

export function mockUserEntiry(): User {
  return {
    id: falso.randUuid(),
    name: falso.randFullName(),
    email: falso.randEmail(),
    password: `@${falso.randPassword()}`,
  };
}
