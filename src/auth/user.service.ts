import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    //inject prisma service
    private prisma: PrismaService,
  ) {}

  //get all users
  public async allUsers(limit: number, cursor?: string) {
    const queryOptions: Prisma.UserFindManyArgs = {
      take: limit ?? 10,
      orderBy: {
        createdAt: 'desc',
      },
    };
    if (cursor) {
      queryOptions.skip = 1;
      queryOptions.cursor = { id: cursor };
    }
    const users = await this.prisma.user.findMany(queryOptions);
    return {
      success: true,
      message: 'All users fetched successfully',
      data: users,
      meta: {
        ...(limit &&
          cursor && {
            limit,
            count: users.length,
            hasNextPage: users.length > limit,
            nextCursor: users.length > 0 ? users[users.length - 1].id : null,
          }),
      },
    };
  }

  //delete a specific user
  public async deleteUser(id: string) {
    const res = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      message: `${res.id} is deleted successfully!`,
    };
  }
  //get a specific user
  public async getAUser(id: string) {
    const res = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return {
      success: true,
      message: `User fetched successfully!`,
      data: res,
    };
  }
}
