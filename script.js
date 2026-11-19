const dogImg = document.getElementById('dog-img')
const Dogname = document.getElementById('Dogname')

const BreedGroup = document.getElementById('Breed-Group')
const Bredfor = document.getElementById('Bred-For')
const LifeSpan = document.getElementById('Life-Span')
const Temperament = document.getElementById('Temperament')
const Height = document.getElementById('Height')
const weight = document.getElementById('weight')

const btn = document.getElementById('profile-btn')

async function fetchDogDetails() {
    Dogname.textContent = "Loading..."

    try {
        // 1. Get a random dog image from Dog CEO API (no 403 errors)
        const response = await axios.get("https://dog.ceo/api/breeds/image/random")
        const imageUrl = response.data.message

        // Extract breed name from the image URL
        const rawBreed = imageUrl.split("/breeds/")[1].split("/")[0]
        const breedName = rawBreed
            .split("-")
            .reverse()
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")

        dogImg.src = imageUrl
        Dogname.textContent = breedName

        // 2. Fetch breed details from Dog API v2 (open endpoint)
        const infoRes = await axios.get("https://dogapi.dog/api/v2/breeds")
        const breeds = infoRes.data.data
        const randomInfo = breeds[Math.floor(Math.random() * breeds.length)].attributes

        BreedGroup.textContent = randomInfo.name || "Companion"
        Bredfor.textContent = randomInfo.description ? randomInfo.description.slice(0, 60) + "..." : "Companionship"
        LifeSpan.textContent = `${randomInfo.life.min} - ${randomInfo.life.max} years`
        Temperament.textContent = randomInfo.hypoallergenic ? "Hypoallergenic, Friendly" : "Loyal, Alert, Active"
        Height.textContent = "35 - 60 cm"
        weight.textContent = `${randomInfo.male_weight.min} - ${randomInfo.male_weight.max} kg`
    } catch (error) {
        Dogname.textContent = "Failed to load dog"
        console.error(error)
    }
}

btn.addEventListener('click', fetchDogDetails)

fetchDogDetails()