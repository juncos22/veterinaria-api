import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ownerProviders } from './owner.provider';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...ownerProviders, OwnerService],
  controllers: [OwnerController],
})
export class OwnerModule {}
