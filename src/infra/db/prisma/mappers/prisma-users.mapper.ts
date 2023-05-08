import { type User } from '@/domain/entities/user.entity';
import { type User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(user: PrismaUser): User {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.passwordHash,
    };
  }
}
