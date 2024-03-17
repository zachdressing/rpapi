export const getData = async(pokemon: string | number) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const pokedata = await promise.json();
    console.log(pokedata)
    return pokedata;
}