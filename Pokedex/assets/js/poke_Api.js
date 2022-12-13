const pokeApi = {}


function converteApiDetalhesPokemon(pokeDetalhes) {
    const pokemon = new Pokemon ()
    pokemon.imagemMod = pokeDetalhes.sprites.other.home.front_default
    pokemon.nome = pokeDetalhes.name;
    pokemon.id = pokeDetalhes.id;
    pokemon.imagemCard = pokeDetalhes.sprites.other.dream_world.front_default
    const types = pokeDetalhes.types.map((TypeSlot)=> TypeSlot.type.name)
    const [type]= types
    pokemon.types = types
    pokemon.tipo = type
    const abilities = pokeDetalhes.abilities.map((AbilitySlot)=> AbilitySlot.ability.name)
    const [ability]= abilities
    pokemon.abilities = abilities
    pokemon.ability = ability
    pokemon.base_experience = pokeDetalhes.base_experience
    const stats = pokeDetalhes.stats.map((statsSlot)=> statsSlot.base_stat)
    const [stat]= stats
    pokemon.stats = stats
    pokemon.status=stat
    const statName = pokeDetalhes.stats.map((statsnSlot)=> statsnSlot.stat.name)
    const [statn]= statName
    pokemon.statsName = statName
    pokemon.statnames = statn
    return pokemon
}

pokeApi.getPokemonsDetalhes = (pokemon)=>{
    return fetch(pokemon.url)
    .then((response)=>response.json())
    .then(converteApiDetalhesPokemon)

}

    pokeApi.getPokemons = (offset = 0, limit = 20) => {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
   return fetch(url)
        .then ((response)=> response.json())
        .then ((jsonBody)=> jsonBody.results)
        .then ((pokemons)=> pokemons.map(pokeApi.getPokemonsDetalhes))
        .then ((detalhes)=> Promise.all(detalhes))
        .then ((detalhesPokemon)=>detalhesPokemon)
        
        .catch((error)=>console.error(error))
    } 