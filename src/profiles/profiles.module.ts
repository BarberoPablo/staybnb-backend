import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class UsersModule {}
