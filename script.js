const API_KEY = "43769455cf6b445e9dbfe99805f7f6cf"
const url = "https://newsapi.org/v2/everything?q="
window.addEventListener("load", () => fetchNews("India"))

function reload() {
    window.location.reload()
}
async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await response.json()
    console.log(data);
    bindData(data.articles)
}
function bindData(articles) {
    const cardscontainer = document.getElementById("cards-container")
    const newsTemplate = document.getElementById("template-news-card")

    cardscontainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return
        if (!article.title) return
        const cardClone = newsTemplate.content.cloneNode(true)
        fillDataInCard(cardClone, article)
        cardscontainer.appendChild(cardClone)
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img")
    const newsTitle = cardClone.querySelector("#news-title")
    const newsSrc = cardClone.querySelector("#news-source")
    const newsDesc = cardClone.querySelector("#news-description")
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })
    newsSrc.innerHTML = `${article.source.name} | ${date}`
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank")
    })
}
let currentItem = null
function onNavItemClick(id) {
    fetchNews(id)
    const navItem = document.getElementById(id)
    currentItem?.classList.remove('active')
    currentItem = navItem;
    currentItem.classList.add('active')
}

const searchBar = document.getElementById("search")
const searchButton = document.getElementById("search-button")

searchButton.addEventListener('click', () => {
    const searchData = searchBar.value;
    if (!searchData) alert("Dont Leave Empty")
    fetchNews(searchData)
    currentItem?.classList.remove('active')
    currentItem = null
})