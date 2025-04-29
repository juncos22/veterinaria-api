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
import { CreatePetDto, PetResponse, UpdatePetDto } from '../dtos/pet.dto';
import { UserGuard } from 'src/user/user.guard';

@Controller('pets')
export class PetController {
  constructor(private petService: PetService) {}

  @Get('')
  async findAll(@Query('q') q?: string) {
    // console.log("Owner:", q);
    let response: PetResponse;
    try {
      const result = q
        ? await this.petService.findAll(q)
        : await this.petService.getAll();
      response = new PetResponse(true, '', result);
    } catch (error: any) {
      console.log('ListPets error:', error);
      response = new PetResponse(false, error.message);
    }
    return response;
  }

  @UseGuards(UserGuard)
  @Post()
  async create(@Body() newPet: CreatePetDto) {
    let response: PetResponse;
    try {
      const result = await this.petService.create(newPet);
      response = result.id
        ? new PetResponse(true, 'Mascota registrada con exito!')
        : new PetResponse(false, 'No se pudo registrar la mascota');
    } catch (error: any) {
      console.log('CreatePet error:', error);
      response = new PetResponse(false, error.message);
    }
    return response;
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    let response: PetResponse;
    try {
      const result = await this.petService.findOne(id);
      response = result
        ? new PetResponse(true, '', result)
        : new PetResponse(false, 'No se encontró a la mascota');
    } catch (error: any) {
      console.log('FindOnePet error:', error);
      response = new PetResponse(false, error.message);
    }
    return response;
  }

  @UseGuards(UserGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdatePetDto) {
    let response: PetResponse;
    if (!id) return new PetResponse(false, 'Id malformada');
    try {
      const result = await this.petService.update(id, data);
      response = result
        ? new PetResponse(true, 'Datos de mascota actualizados!')
        : new PetResponse(false, 'No se pudo actualizar a la mascota');
    } catch (error: any) {
      console.log('UpdatePetError:', error);
      response = new PetResponse(false, error.message);
    }
    return response;
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    let response: PetResponse;
    if (!id) return new PetResponse(false, 'Id malformada');
    try {
      const result = await this.petService.delete(id);
      response = result
        ? new PetResponse(true, 'Mascota eliminada con exito!')
        : new PetResponse(false, 'No se pudo eliminar a la mascota');
    } catch (error: any) {
      console.log('DeletePetError:', error);
      response = new PetResponse(false, error.message);
    }
    return response;
  }
}
