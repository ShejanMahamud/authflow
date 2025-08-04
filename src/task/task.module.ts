import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    {
      provide: 'LOGGER',
      useFactory: () => new Logger(TaskService.name),
    },
    TaskService,
  ],
  exports: [TaskService],
})
export class TaskModule {}
