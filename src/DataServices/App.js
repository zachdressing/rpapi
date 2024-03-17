const getData = async (value) => {
    const monPromise = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
    let monData = await monPromise.json();

    const dexPromise = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${value}`);
    let dexData = await dexPromise.json();

    const locPromise = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}/encounters`);
    let locData = await locPromise.json();

    const evoPromise = await fetch(`${dexData.evolution_chain.url}`);
    let evoData = await evoPromise.json();

    let typeArray = [];
    let abiArray = [];
    let moveArray = [];
    let evoArray = [];
    let enIndex;
    document.getElementById('evolutions').innerHTML = '';

    //Location
    let location = document.getElementById('location')

    if (locData.length > 0) {
        let locArray = locData[0].location_area.name.split('-').slice(0, -1).join(' ');
        location.innerText = `You can find this Pokemon at ${locArray}`;
    }
    else {
        location.innerText = `You cannot find this Pokemon in the wild.`
    }

    //Types
    monData.types.map(value => {
        typeArray.push(value.type.name);
    })
    var typeJoined = typeArray.join(', ');

    //Abilities
    monData.abilities.map(value => {
        abiArray.push(value.ability.name);
    })
    var abiJoined = abiArray.join(', ');

    //Moves
    monData.moves.map(value => {
        moveArray.push(value.move.name);
    })
    var moveJoined = moveArray.join(', ')


    //Set all Variables
    document.getElementById('pkmName').textContent = `${monData.name} - ${monData.id}`;
    document.getElementById('pkmImg').src = monData.sprites.other['official-artwork'].front_default;
    document.getElementById('hp').textContent = `HP: ${monData.stats[0].base_stat}`;
    document.getElementById('atk').textContent = `Atk: ${monData.stats[1].base_stat}`;
    document.getElementById('def').textContent = `Def: ${monData.stats[2].base_stat}`;
    document.getElementById('satk').textContent = `SAtk: ${monData.stats[3].base_stat}`;
    document.getElementById('sdef').textContent = `SDef: ${monData.stats[4].base_stat}`;
    document.getElementById('spd').textContent = `Spd: ${monData.stats[5].base_stat}`;
    document.getElementById('types').textContent = `Types: ${typeJoined}`
    document.getElementById('abilities').textContent = `Abilities: ${abiJoined}`
    document.getElementById('move').textContent = `Moves: ${moveJoined}`;

    //Grab English PokeDex
    dexData.flavor_text_entries.map(value => {
        if (value.language.name == 'en') {
            enIndex = value.flavor_text;
        }
    })
    document.getElementById('pokedexData').textContent = enIndex;


    //Evolution Stuff
    if (evoData.chain.evolves_to.length === 0) {
    } else {
        evoArray = [evoData.chain.species.name];
        const seeEvos = (chain) => {
            if (chain.evolves_to.length === 0) return;
            chain.evolves_to.forEach((evo) => {
                evoArray.push(evo.species.name);
                seeEvos(evo);
            });
        };
        seeEvos(evoData.chain);
    }

    const grabEvos = async () => {
        if (evoArray.length > 0) {
            evoArray.map(async evo => {
                const evoCall = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo}`)
                const data = await evoCall.json();

                //create the div
                let div = document.createElement('div');
                div.setAttribute('id', `${evo}`)
                div.classList.add('flex', 'flex-col', 'text-center')
                document.getElementById('evolutions').appendChild(div);

                //create the img
                let img = document.createElement('img');
                img.src = data.sprites.other['official-artwork'].front_default;
                img.style.height = `${(document.getElementById('evolutions').clientHeight / 3) - (24)}px`;
                document.getElementById(`${evo}`).appendChild(img);

                //create the nametag
                let p = document.createElement('p');
                p.textContent = data.name;
                document.getElementById(`${evo}`).appendChild(p);
            })
        }
        else {
            let p = document.createElement('p');
            p.textContent = "There are no Evolutions for this Pokemon";
            document.getElementById('evolutions').appendChild(p);
        }
    }

    document.getElementById('evolutions').classList.add("animate-pulse");
    await grabEvos();
    document.getElementById('evolutions').classList.remove("animate-pulse");

    localStorage.getItem('favorites').includes(monData.name) ? document.getElementById('favoriteBtn').textContent = "Unfavorite this Pokemon" : document.getElementById('favoriteBtn').textContent = "Favorite this Pokemon";

    return [monData, dexData, evoData, locData];
}

export {getData};