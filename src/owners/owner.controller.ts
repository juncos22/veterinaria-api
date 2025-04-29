import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateOwnerDto, ListOwnerDto } from './owner.dto';
import { OwnerService } from './owner.service';
import { UserGuard } from 'src/user/user.guard';
import { ResponseDto } from 'src/utils/response.dto';

@Controller('owners')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @UseGuards(UserGuard)
  @Post()
  async post(@Body() data: CreateOwnerDto) {
    try {
      const result = await this.ownerService.save(data);
      if (result.id)
        return new ResponseDto<CreateOwnerDto>(
          true,
          'Dueño creado exitosamente!',
        );
      return new ResponseDto<CreateOwnerDto>(false, 'Error saving the owner');
    } catch (error: any) {
      console.log('CreateOwnerError:', error);
      return new ResponseDto<CreateOwnerDto>(false, error.message);
    }
  }

  @UseGuards(UserGuard)
  @Get()
  async get() {
    try {
      const result = await this.ownerService.list();
      return new ResponseDto<ListOwnerDto>(true, '', result);
    } catch (error: any) {
      console.log('GetOwnersError:', error);
      return new ResponseDto<ListOwnerDto>(false, error.message);
    }
  }
}
