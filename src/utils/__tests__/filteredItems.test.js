import filteredItem from '../filteredItems';

describe('filteredItems', () => {
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
  const page = 1;
  it('it should return arr length === ', () => {
    const result = filteredItem(page, mockedPokemons);
    expect(result.length).toBe(mockedPokemons.length);
  });
});
