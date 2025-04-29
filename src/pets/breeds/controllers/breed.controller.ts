import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateBreedDto } from '../dto/create-breed.dto';
import { BreedsService } from '../services/breed.service';
import { UserGuard } from 'src/user/user.guard';
import { ResponseDto } from 'src/utils/response.dto';
import { Breed } from '../entities/breed.entity';

@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @UseGuards(UserGuard)
  @Post()
  async create(
    @Body() createBreedDto: CreateBreedDto,
  ): Promise<ResponseDto<Breed>> {
    try {
      const result = await this.breedsService.create(createBreedDto);
      if (result.id)
        return new ResponseDto<Breed>(true, 'Raza creada exitosamente!');
      return new ResponseDto<Breed>(false, 'No se pudo crear la raza');
    } catch (error: any) {
      console.log('CreateBreedError:', error);
      return new ResponseDto<Breed>(false, error.message);
    }
  }

  @Get()
  async findAll(): Promise<ResponseDto<Breed>> {
    try {
      const result = await this.breedsService.findAll();
      return new ResponseDto<Breed>(true, '', result);
    } catch (error: any) {
      console.log('ListBreedError:', error);
      return new ResponseDto<Breed>(false, error.message);
    }
  }

  //   @UseGuards(UserGuard)
  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateBreedDto: UpdateBreedDto) {
  //     return this.breedsService.update(+id, updateBreedDto);
  //   }

  //   @UseGuards(UserGuard)
  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.breedsService.remove(+id);
  //   }
}
