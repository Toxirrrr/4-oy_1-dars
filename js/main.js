let moviesArray = movies.slice(0,12);
function normalizedArray(array) {
    let newArray = []
    array.forEach(item => {
        let newObject = {}
        newObject.title = item.Title.toString()
        newObject.movieYear = item.movie_year
        newObject.categories = item.Categories.split("|")
        newObject.videoUrl = `https://www.youtube.com/watch?v=${item.ytid}`
        newObject.imgSrc = `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`
        newObject.movieRating = item.imdb_rating
        newArray.push(newObject)
    });
    return newArray 
}
let elMovieWrapper = document.querySelector(".movie__wrapper")
let elTemplate = document.querySelector("#movie_card").content
let newArray = normalizedArray(moviesArray) 
function render(array,wrapper) {
    wrapper.innerHTML = null
    let tempFragment = document.createDocumentFragment()
    for (const item of array) {
        let templateItem = elTemplate.cloneNode(true)
        templateItem.querySelector(".movie__img").src = item.imgSrc
        templateItem.querySelector(".movie__title").textContent = item.title
        templateItem.querySelector(".movie__year").textContent = item.movieYear
        templateItem.querySelector(".movie__rating").textContent = item.movieRating
        templateItem.querySelector(".movie__url").href = item.videoUrl
        tempFragment.appendChild(templateItem)
    }
    wrapper.appendChild(tempFragment)
}
render(newArray,elMovieWrapper)
let elForm = document.querySelector(".form")
elForm.addEventListener("submit" , function (event) {
    event.preventDefault()
    let elInput = document.querySelector(".item").value.trim()
    let inputArray = []
    for (let i = 0; i < newArray.length; i++) {
        if(elInput <= newArray[i].movieRating) {
            inputArray.push(newArray[i])
        }   
    }
    render(inputArray,elMovieWrapper)
})