const body = document.querySelector('body')
const container = document.querySelector('.container')
const search = document.querySelector('#btn-search')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')


search.addEventListener('click', () => {

    const APIKey = '46a1f625bac705b8061d8c89ae9d2775'
    const city = document.querySelector('.search-box input').value

    if (city === '')
        return


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then
        (json => {

            if (json.cod === '404') {

                container.style.height = '400px'
                weatherBox.style.display = 'none'
                weatherDetails.style.display = 'none'
                error404.style.display = 'block'
                error404.classList.add('fadeIn')
                return
            }

            error404.style.display = 'none'
            error404.classList.remove('fadeIn')

            const image = document.querySelector('.weather-box img')
            const temperature = document.querySelector('.weather-box .temperature')
            const description = document.querySelector('.weather-box .description')
            const humidity = document.querySelector('.weather-details .humidity span')
            const wind = document.querySelector('.weather-details .wind span')

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = './src/clear.png'
                    body.classList.add('clear-bg')
                    body.classList.remove('clouds-bg')
                    body.classList.remove('rain-bg')
                    body.classList.remove('snow-bg')
                    body.classList.remove('haze-bg')
                    break
                case 'Clouds':
                    image.src = './src/cloud.png'
                    body.classList.add('clouds-bg')
                    body.classList.remove('clear-bg')
                    body.classList.remove('rain-bg')
                    body.classList.remove('snow-bg')
                    body.classList.remove('haze-bg')
                    break
                case 'Rain':
                    image.src = './src/rain.png'
                    body.classList.add('rain-bg')
                    body.classList.remove('clear-bg')
                    body.classList.remove('clouds-bg')
                    body.classList.remove('snow-bg')
                    body.classList.remove('haze-bg')
                    
                    
                    break
                case 'Snow':
                    image.src = './src/snow.png'
                    body.classList.add('snow-bg')
                    body.classList.remove('rain-bg')
                    body.classList.remove('clear-bg')
                    body.classList.remove('clouds-bg')
                    body.classList.remove('haze-bg')

                    break
                case 'Haze':
                    image.src = './src/haze.png'
                    body.classList.add('haze-bg')
                    body.classList.remove('rain-bg')
                    body.classList.remove('clear-bg')
                    body.classList.remove('clouds-bg')
                    body.classList.remove('snow-bg')
                    break

                default:
                    image.src = ''

            }

            const descriptionEnglish = json.weather[0].main

            const descricaoClima = {
                'Clear': 'Céu Limpo',
                'Clouds': 'Nublado',
                'Rain': 'Chuva',
                'Snow': 'Neve',
                'Haze' :'Vento'
            }

            const descricaoPortugues = descricaoClima[descriptionEnglish]

            temperature.innerHTML = `${(parseInt(json.main.temp))}
            <span>ºC</span>`
            description.innerHTML = `${descricaoPortugues}`
            humidity.innerHTML = `${json.main.humidity}%`
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

            weatherBox.style.display = ''
            weatherDetails.style.display = ''
            weatherBox.classList.add('fadeIn')
            weatherDetails.classList.add('fadeIn')
            container.style.height = '590px'


        })

})
