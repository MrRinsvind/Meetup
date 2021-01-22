import './styles/index.scss'
import './canvas'

const slides = {
  ds: 'frontend',
  frontend: 'meetup',
  meetup: 'ds',
}

document.querySelector('body').className = 'ds'

setInterval(_ => {
  document.querySelector('body').className = slides[document.querySelector('body').className]
}, 2000)