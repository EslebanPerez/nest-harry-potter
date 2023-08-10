import { Injectable } from '@nestjs/common';
import { Character } from './entities/Character.entity';
import { CreateCharacterDto } from './dto/create-character.dto';

@Injectable()
export class CharactersService {
  repository: Character[];
  constructor() {
    this.repository = [{
      id: 1,
      name: "Harry Potter",
      age: 10,
      alive: true,
      house: "Gryffindor"
    },
    {
      id: 1,
      name: "Draco Malfoy",
      age: 10,
      alive: true,
      house: "Slythering"
    },
  ];

  }

  // Listar todos los personajes
  async findAll(): Promise<Character[]> {
    return this.repository;
  }
  // Obtener un personaje por ID
  async findById(id: number): Promise<Character> {
    return this.repository.find((char) => char.id === id);
  }

  // Obtener todos los personajes por casa
  async findByHouse(house: string): Promise<Character[]> {
    return this.repository.filter((char) => char.house === house);
  }
  // Crear un personaje nuevo
  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const { name, house, age, alive } = createCharacterDto;
    const newCharacter: Character = {
      id: this.repository.length + 1,
      name,
      house,
      alive,
      age,
    };
    this.repository.push(newCharacter);
    return newCharacter;
  }
  // Eliminar un personaje
}
