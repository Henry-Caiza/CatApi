const API3 = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
});
API3.defaults.headers.common['x-api-key'] = 'live_2J1dd7btw4OvEYGL56VCQhbc6oWnN2ZYVjMwo5MPKlBR1FuevpHBLMHbECj1J7h0';

// const API = 'https://api.thecatapi.com/v1/images/search';
// const API_FAVORITES = 'https://api.thecatapi.com/v1/favourites';
const API_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'

const API_ANIME = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10';

const btn = document.querySelector('#btnGnerate');
const btnFav1 = document.querySelector('#btnFav1');
const btnFav2 = document.querySelector('#btnFav2');
const btnFav3 = document.querySelector('#btnFav3');
const spanError = document.querySelector('#error');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'b238a60885msh099b034f1de1456p12c7f3jsn1dc1835bfbae',
        'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
    }
};


const loadCats = async () => {
    const { data, status } = await API3.get('/images/search?limit=4');
    if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {

        //const dataCat = await fectchData(`${API}?limit=3`);
        const containerRandom = document.querySelector("#random");

        containerRandom.innerHTML = ""
        data.map((cat) => {
            containerRandom.insertAdjacentHTML("beforeend", `
            <article class="container-article-a">
                <div class="w-full h-5/6">
                    <img src="${cat.url}" id="img" alt="imagen" class="w-full h-full rounded-t-md object-cover">
                </div>
                <button id="${cat.id}" type="button" class="btn-like">
                </button>
            </article>`)
            const button = document.getElementById(cat.id)
            button.addEventListener("click", () => saveFavoritesCat(cat.id))
        });
    }
};

const loadFavoriteCat = async () => {
    const { data, status } = await API3.get('/favourites');
    if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
        const content = document.querySelector('#favorites');
        content.innerHTML = ""
        // content.innerHTML = "<h2>MIS FAVORITOS</h2>";
        data.map(cat => {
            content.insertAdjacentHTML("beforeend", `
             <article class="container-article-f">
                <div class="w-full h-5/6">
                    <img src="${cat.image.url}" id="img" alt="imagen" class="w-full h-full rounded-t-md object-cover">
                </div>
                <button id="${cat.id}" type="button" class="btn-dislike">
                </button>
            </article>`)

            const button = document.getElementById(cat.id)
            button.addEventListener("click", () => deleteFavorite(cat.id))

        })
        //content.innerHTML = viewFavorite;

        // dataCat.forEach(cat =>{
        //     const section = document.getElementById('favorites');
        //     const article = document.createElement('article');
        //     const img = document.createElement('img')
        //     const btn =  document.createElement('button');
        //     const btnText = document.createTextNode('Quitar de favoritos');
        //     btn.appendChild(btnText);
        //     img.src = cat.image.url
        //     article.appendChild(img);
        //     article.appendChild(btn);
        //     section.appendChild(article);

        // });
    }
};

const saveFavoritesCat = async (id) => {

    const { data, status } = await API3.post('/favourites', {
        image_id: id,
        //     'Content-Type': 'application/json',
        //   body: JSON.stringify({
        //     image_id: id
        //   }),
    });
    if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
        loadFavoriteCat();
    }
};

const generateAnime = async () => {
    try {
        const response = await fetch(API_ANIME, options);
        const dataALL = await response.json();
        const data = dataALL.data;
        console.log(data);
        //const images = document.getElementsByTagName("img");

        const containerRandom = document.querySelector("#animes");

        containerRandom.innerHTML = ""
        data.map((anime) => {
            containerRandom.insertAdjacentHTML("beforeend", `
            <article class="container-article-ani">
                <div class="w-full h-5/6">
                    <img src="${anime.image}" alt="imagen" class="w-full h-full rounded-t-md object-cover">
                </div>
                <p class="text-gray-300">${anime.title}
                </p>
            </article>`)
            // const button = document.getElementById(anime.image)
            // button.addEventListener("click", () => saveFavoritesCat(cat.id))
        });

        // const arrImages = [...images];
        // arrImages.forEach((image) => {
        //     image.src = dataAn.data[Math.floor(Math.random() * 29)].image;
        // })
    }
    catch (err) {
        spanError.innerHTML = 'Hubo un error';
    }
};

async function deleteFavorite(id) {
    const { data, status } = await API3.delete(`/favourites/${id}`, {
        image_id: id,
    });
    if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
        loadFavoriteCat();
    }
}

async function uploadPhoto() {
    try {
        const form = document.getElementById('uploadingForm')
        const formData = new FormData(form);
        const response = await fetch(API_UPLOAD, {
            method: 'POST',
            headers: {
                'x-api-key': 'live_2J1dd7btw4OvEYGL56VCQhbc6oWnN2ZYVjMwo5MPKlBR1FuevpHBLMHbECj1J7h0',
            },
            body: formData,
        });
        const data = await response.json();
        saveFavoritesCat(data.id);
        console.log(data.url);
    }
    catch (err) {
        spanError.innerHTML = 'Hubo un error';
    }
}

loadFavoriteCat();
loadCats();
//generateAnime();

//btn.addEventListener("click", generateAnime);
btn.addEventListener("click", loadCats);
//btnFav.addEventListener("click", saveFavoritesCat);