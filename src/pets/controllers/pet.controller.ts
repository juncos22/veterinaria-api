import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PetService } from '../services/pet.service';
import { CreatePetDto, PetList } from '../dtos/pet.dto';
import { UserGuard } from 'src/user/user.guard';

@Controller('pets')
export class PetController {
    constructor(private petService: PetService) { }

    @Get('')
    async findAll(@Query('q') q?: string) {
        // console.log("Owner:", q);
        return q ? await this.petService.findAll(q)
            : await this.petService.getAll();
    }

    @UseGuards(UserGuard)
    @Post()
    async create(@Body() newPet: CreatePetDto) {
        return this.petService.create(newPet)
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        return this.petService.findOne(id)
    }
}
