import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(
    //inject prisma
    private prisma: PrismaService,
    //inject custom made logger service
    @Inject('LOGGER') private readonly logger: Logger,
  ) {}

  //added cron job which will run every 12 hours
  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'delete-user',
    timeZone: 'Asia/Dhaka',
  })
  //soft delete user
  public async softDeleteUnVerifiedUser() {
    const result = await this.prisma.user.updateMany({
      where: {
        emailVerified: false,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });
    this.logger.debug(`${result.count} unverified users deleted from database`);
  }

  @Cron(CronExpression.EVERY_WEEK, {
    name: 'expired-token-remove',
    timeZone: 'Asia/Dhaka',
  })
  public async removeRefreshToken() {
    const expiredUsers = await this.prisma.user.findMany({
      where: {
        refreshToken: {
          not: null,
        },
        refreshTokenExp: {
          lt: new Date(),
        },
      },
    });
    await Promise.all([
      expiredUsers.map(async (user) => {
        return this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            refreshToken: null,
            refreshTokenExp: null,
          },
        });
      }),
    ]);
    this.logger.debug(`${expiredUsers.length} users refresh token reset`);
  }
}
