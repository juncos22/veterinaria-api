import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PetService } from '../services/pet.service';
import { CreatePetDto, PetList, UpdatePetDto } from '../dtos/pet.dto';
import { UserGuard } from 'src/user/user.guard';

@Controller('pets')
export class PetController {
  constructor(private petService: PetService) {}

  @Get('')
  async findAll(@Query('q') q?: string) {
    // console.log("Owner:", q);
    return q
      ? await this.petService.findAll(q)
      : await this.petService.getAll();
  }

  @UseGuards(UserGuard)
  @Post()
  async create(@Body() newPet: CreatePetDto) {
    return this.petService.create(newPet);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.petService.findOne(id);
  }

  @UseGuards(UserGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdatePetDto) {
    if (!id) return { error: 'Invalid ID format' };
    return this.petService.update(id, data);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    if (!id) return { error: 'Invalid ID format' };
    return this.petService.delete(id);
  }
}
