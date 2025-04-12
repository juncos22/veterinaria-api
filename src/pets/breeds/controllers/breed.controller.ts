import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CreateBreedDto } from '../dto/create-breed.dto';
import { UpdateBreedDto } from '../dto/update-breed.dto';
import { BreedsService } from '../services/breed.service';
import { UserGuard } from 'src/user/user.guard';

@Controller('breeds')
export class BreedsController {
    constructor(private readonly breedsService: BreedsService) { }

    @UseGuards(UserGuard)
    @Post()
    create(@Body() createBreedDto: CreateBreedDto) {
        return this.breedsService.create(createBreedDto);
    }

    @Get()
    findAll() {
        return this.breedsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.breedsService.findOne(+id);
    }

    @UseGuards(UserGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBreedDto: UpdateBreedDto) {
        return this.breedsService.update(+id, updateBreedDto);
    }

    @UseGuards(UserGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.breedsService.remove(+id);
    }
}
