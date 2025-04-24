import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateOwnerDto } from './owner.dto';
import { OwnerService } from './owner.service';
import { UserGuard } from 'src/user/user.guard';

@Controller('owners')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @UseGuards(UserGuard)
  @Post()
  async post(@Body() data: CreateOwnerDto) {
    const result = await this.ownerService.save(data);
    if (result.id) return { message: 'OK' };
    return { error: 'Error saving the owner' };
  }

  @UseGuards(UserGuard)
  @Get()
  async get() {
    return await this.ownerService.list();
  }
}
