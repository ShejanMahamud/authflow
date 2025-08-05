import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CustomLoggerService } from 'src/common/logger.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(
    //inject prisma
    private prisma: PrismaService,
    //inject custom logger service
    private readonly logger: CustomLoggerService,
  ) {}

  //added cron job which will run every 12 hours
  @Cron(CronExpression.EVERY_12_HOURS, {
    name: 'delete-user',
    timeZone: 'Asia/Dhaka',
  })
  //soft delete user
  public async softDeleteUnVerifiedUser() {
    try {
      const startTime = Date.now();
      const result = await this.prisma.user.updateMany({
        where: {
          emailVerified: false,
          isDeleted: false,
        },
        data: {
          isDeleted: true,
        },
      });
      const duration = Date.now() - startTime;

      this.logger.logDatabaseOperation('UPDATE', 'user', duration);
      this.logger.debug(
        `${result.count} unverified users deleted from database`,
        'TaskService',
      );
    } catch (error) {
      this.logger.logError(error, 'TaskService', {
        task: 'softDeleteUnVerifiedUser',
      });
    }
  }

  @Cron(CronExpression.EVERY_WEEK, {
    name: 'expired-token-remove',
    timeZone: 'Asia/Dhaka',
  })
  public async removeRefreshToken() {
    try {
      const startTime = Date.now();
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

      const duration = Date.now() - startTime;
      this.logger.logDatabaseOperation('UPDATE', 'user', duration);
      this.logger.debug(
        `${expiredUsers.length} users refresh token reset`,
        'TaskService',
      );
    } catch (error) {
      this.logger.logError(error, 'TaskService', {
        task: 'removeRefreshToken',
      });
    }
  }
}
