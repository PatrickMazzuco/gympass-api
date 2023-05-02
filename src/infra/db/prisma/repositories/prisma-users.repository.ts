import { type ICreateUserRepository } from '@/application/interfaces/db/users/create-user.repository.interface';
import { type IEmailExistsRepository } from '@/application/interfaces/db/users/email-exists.repository.interface';
import { type PrismaClient } from '@prisma/client';
import { prisma } from '../client';

export class PrismaUsersRepository
  implements ICreateUserRepository, IEmailExistsRepository
{
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async create({
    name,
    email,
    password,
  }: ICreateUserRepository.Params): Promise<ICreateUserRepository.Result> {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password,
      },
    });

    return { id: user.id };
  }

  async emailExists(
    email: IEmailExistsRepository.Params,
  ): Promise<IEmailExistsRepository.Result> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return Boolean(user);
  }
}
