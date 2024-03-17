import React, { useState } from 'react'
import pokeAPIImg from '../Assets/pokeAPI.png'
import Empty from '../Assets/Empty.png'
import { getData } from '../DataServices/APICall'

const MainComponent = () => {
const [searchVal, setsearchVal] = useState('');

function handleChange(e) {
    setsearchVal(e.target.value);
  }

async function randomGen(){
    const randInt = Math.floor(Math.random() * 651);
    console.log(randInt)
    getData(randInt)
}

  return (
    <div className="bg-bgImg  bg-[#3B4CCA] backdrop-brightness-40 bg-no-repeat bg-center flex justify-center items-start font-mainFont">
      <div id="content" className="container flex flex-col min-h-[98.45vh] items-center mt-5">
        <div className="flex flex-wrap justify-center p-4 w-full lg:gap-x-8 max-w-[1100px]">
          <input className="rounded-full border-4 border-black text-xl w-60" id="searchval" type="text"
            placeholder="Search..." onChange={handleChange} />
          <button id="search"
            className="bg-[#3B4CCA]  rounded-full w-fit border-4 border-black text-3xl px-4 hover:brightness-75" onClick={()=>{getData(searchVal)}}>
            Search
          </button>
          <br />
          <button id="random"
            className="bg-[#CC0000]  rounded-full w-fit border-4 border-black text-3xl px-4 hover:brightness-75" onClick={()=>{randomGen()}}>
            Random
          </button>
          <button id="favorite" data-dropdown-toggle="favoriteDDown"
            className="bg-[#B3A125]  rounded-full w-fit border-4 border-black text-3xl px-4 hover:brightness-75">
            Favorites
          </button>
          <div id="favoriteDDown"
            className="z-10 hidden bg-[#D9D9D9] border-4 border-black divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul id="favList" className="py-2 p-4 gap-y-3 text-2xl cursor-pointer text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton">
            </ul>
          </div>
          <div id="trademark" className="bg-[#D9D9D9] md:flex w-fit items-center border-4 border-black hidden ">
            using <img src={pokeAPIImg} alt="pokeAPI Logo" />
          </div>
        </div>

        <div className="lg:flex justify-around gap-x-6 lg:w-[975px] mt-5">
          <div className="col flex justify-center">
            <div id="mainData" className="flex flex-col h-[906px] justify-around w-full md:min-w-[500px] gap-1">
              <div id="pkmImage" className="bg-[#D9D9D9] border-4 border-black h-[475px] flex justify-center">
                <img id="pkmImg" src={Empty} className="text-[0px]" alt="pokemon Image" />
              </div>
              <div className="btnDiv flex">
                <button id="shinyBtn"
                  className="border-4 border-black rounded-full w-40 md:w-60 mx-auto bg-[#CC0000]">Normal Form
                </button>
                <button id="favoriteBtn"
                  className="border-4 border-black rounded-full w-40 h-8 md:w-60 mx-auto bg-[#B3A125]">
                  Favorite this Pokemon
                </button>
              </div>

              <div id="pkmMainInf" className="bg-[#D9D9D9] h-[390px] p-4 flex flex-col border-4 border-black mb-5">
                <h1 id="pkmName" className="underline capitalize text-[72px]">Pokemon Name</h1>
                <p id="types" className="capitalize">Types: </p>
                <p id="abilities" className="capitalize">Abilities: </p>
                <p className="capitalize max-h-[150px] overflow-y-scroll" id="move">Moves: </p>
              </div>
            </div>
          </div>
          <div className="col flex justify-center">
            <div id="sideData" className="flex flex-col h-[906px] justify-between w-full lg:min-w-[450px]">
              <div id="encounter" className="bg-[#D9D9D9] h-[150px] p-4 border-4 border-black text-3xl">
                <p id="location">You can find this Pokemon at</p>
              </div>
              <div id="stats"
                className="bg-[#D9D9D9] h-[150px] auto-rows-auto px-5 border-4 border-black text-[24px]">
                <div className="row h-[75px] flex justify-between items-center">
                  <p id="hp">HP: </p>
                  <p id="atk">ATK: </p>
                  <p id="def">DEF: </p>
                </div>
                <div className="row flex justify-between items-center">
                  <p id="satk">SATK: </p>
                  <p id="sdef">SDEF: </p>
                  <p id="spd">SPD: </p>
                </div>
              </div>
              <div id="pokedex" className="bg-[#D9D9D9] flex border-4 border-black h-[150px] flex-col px-4">
                <p className="text-[32px] underline">Pokedex Entry</p>
                <p id="pokedexData"></p>
              </div>
              <div id="evolutions"
                className="flex h-[380px] w-full bg-[#D9D9D9] justify-around border-4 border-black flex-wrap items-center mb-5 capitalize">
                <h1 className="text-[32px] underline self-start w-full p-4">Evolutions</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainComponent
