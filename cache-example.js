const { join, toLower } = require('ramda')
const request = require('./request')

const url = 'https://play.hyper63.com'
const token = process.env.HYPER63_TOKEN

const Movie = (title='', year='1980', genres=[]) => 
  ({ id: `${toLower(title)}-${year}`, type: 'movie', title, year, genres })

// Ghostbusters, 1984, [action, comedy]
// Groundhog Day, 1993, [comedy, fantasy, romance]
// Avengers, 2012, [action, adventure, sci-fi]

const $ = request(url, token)
async function main() {
  let res = 'Welcome to the hyper63 tour!'
  const app = 'twilson63-movies'
  //res = await $.put(`/cache/${app}`)
  /*
  res = await $.post(`/cache/${app}`, {
    key: 'action-1984',
    value: Movie('Ghostbusters', '1984', ['action', 'comedy'])
  })
  */
  //res = await $.get(`/cache/${app}/action-1984`)
  //'res = await $.post(`/cache/${app}/_query?pattern=action*`)
  //res = await $.delete(`/cache/${app}/action-1984`)
  console.log(res)

}

main()

