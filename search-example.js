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
  /*
  res = await $.put(`/search/${app}`, { 
    fields: ['title', 'year'],
    storeFields: ['id', 'type']
  })
  */
  /*
  res = await $.post(`/search/${app}/_bulk`, [Movie('GroundhogDay', '1993', []), 
    Movie('Avengers', '2012', [])
  ])
  */
  /*
  res = await $.post(`/search/${app}`, {
    key: 'ghostbusters-1984', 
    doc: Movie('Ghostbusters', '1984', [])
  })
  */
  res = await $.post(`/search/${app}/_query`, {
    query: 'Avengers'
  })

  console.log(JSON.stringify(res))

}

main()

