import { findPokemon } from '../findPokemon';

describe('findPokemon', () => {
  const mockedPokemons = [
    {
      id: 0,
      name: 'charizard',
    },
    {
      id: 1,
      name: 'pikachu',
    },
    {
      id: 2,
      name: 'golduck',
    },
  ];
  const searchedId = 2;
  const id = 'id';
  const name = 'name';
  const searchedName = 'pikachu';
  it('it should return pokemon if you search by id', () => {
    const result = findPokemon(mockedPokemons, id, searchedId);
    expect(result.id).toBe(searchedId);
  });
  it('it should return pokemon if you search by name', () => {
    const result = findPokemon(mockedPokemons, name, searchedName);
    expect(result.name).toBe(searchedName);
  });
  it('it should return undefined if no pokemons found, if you search by id', () => {
    const result = findPokemon([], id, searchedId);
    expect(result).toBe(undefined);
  });
  it('it should return undefined if no pokemons found, if you search by name', () => {
    const result = findPokemon([], name, searchedName);
    expect(result).toBe(undefined);
  });
  it('it should return undefined if pokemons not an array, if you search by id', () => {
    const result = findPokemon(null, id, searchedId);
    expect(result).toBe(undefined);
  });
  it('it should return undefined if pokemons not an array , if you search by name', () => {
    const result = findPokemon(null, name, searchedName);
    expect(result).toBe(undefined);
  });
  it('it should return undefined if searchedAttr is not presented', () => {
    const result = findPokemon(mockedPokemons, null, searchedId);
    expect(result).toBe(undefined);
  });
  it('it should return undefined if searchedVal is not presented', () => {
    const result = findPokemon(mockedPokemons, id, null);
    expect(result).toBe(undefined);
  });
});
