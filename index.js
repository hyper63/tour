const { join, toLower } = require('ramda')
const request = require('./request')

const url = 'https://play.hyper63.com'
const token = process.env.HYPER63_TOKEN

const Movie = (title='', year='1980', genres=[]) => 
  ({ id: `${toLower(title)}-${year}`, type: 'movie', title, year, genres })

// Ghostbusters, 1984, [action, comedy]
const ghostbusters = Movie('Ghostbusters', '1984', ['action', 'comedy'])
// Groundhog Day, 1993, [comedy, fantasy, romance]
const groundhogday = Movie('Groundhog-Day', '1993', ['comedy', 'fantasy', 'romance'])
// Avengers, 2012, [action, adventure, sci-fi]
const avengers = Movie('Avengers', '2012', ['action', 'adventure', 'sci-fi'])

const $ = request(url, token)
async function main() {
  let res = 'Welcome to the hyper63 tour!'
  const app = 'YOURNAME-movies'

  console.log(JSON.stringify(res))

}

main()

