import { getData } from "./App";

const genList = (array) => {
    array.map(favs => {
        let li = document.createElement('li');
        li.id = 'favItem';
        li.classList.add("capitalize", "hover:brightness-50")
        li.innerText = favs;
        li.addEventListener('click', async () => {
            await getData(li.innerText.toLowerCase());
        })
        document.getElementById('favList').appendChild(li);
    })
}

const saveLS = (fav) => {
    let favorites = getLS();
    document.getElementById('favList').innerHTML = '';
    !favorites.includes(fav) ? favorites.push(fav) : removeLS(fav, favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    genList(favorites);
    favorites.includes(fav) ? document.getElementById('favoriteBtn').textContent = "Unfavorite this Pokemon" : document.getElementById('favoriteBtn').textContent = "Favorite this Pokemon";
}

const getLS = () => {
    let lsData = localStorage.getItem('favorites');
    if (lsData == null) {
        return []
    } else {
        return JSON.parse(lsData);
    }
}

const removeLS = (fav, favorites) => {
    let namedIndex = favorites.indexOf(fav);
    favorites.splice(namedIndex, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    favorites.includes(fav) ? document.getElementById('favoriteBtn').textContent = "Unfavorite this Pokemon" : document.getElementById('favoriteBtn').textContent = "Favorite this Pokemon";
}

export { saveLS, getLS, removeLS, genList };