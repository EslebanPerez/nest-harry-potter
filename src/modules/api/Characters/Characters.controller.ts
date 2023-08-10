import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CharactersService } from "./Characters.service";
import { Character } from "./entities/Character.entity";
import { CreateCharacterDto } from "./dto/create-character.dto";

@Controller('api/characters')
export class CharactersController{
    constructor(private characterService: CharactersService){}
    
    @Get()
    async findAll(@Query("house") house: string): Promise<Character[]>{
        const characters: Character[] =  house ?  await this.characterService.findByHouse(house) : await this.characterService.findAll()
        return characters
    }
    /*@Get()
    async findByHouse(@Query("house") house: string):Promise<Character[]>{
        const characters: Character[] = await this.characterService.findByHouse(house)
        return characters
    }*/

    @Get(":id")
    async findById(@Param("id") id : string): Promise<Character>{
        const character: Character = await this.characterService.findById(+id)
        return character
    }

    @Post()
    async create(@Body() createCharacterDto:CreateCharacterDto ): Promise<Character>{
        const character: Character = await  this.characterService.create(createCharacterDto)
        return character;
    }
}