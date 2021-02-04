const { join, toLower } = require('ramda')
const request = require('./request')

const url = 'https://play.hyper63.com'
const token = process.env.HYPER63_TOKEN

const Movie = (title='', year='1980', genres=[]) => 
  ({ id: join('-', toLower(title), year), type: 'movie', title, year, generes })

// Ghostbusters, 1984, [action, comedy]
// Groundhog Day, 1993, [comedy, fantasy, romance]
// Avengers, 2012, [action, adventure, sci-fi]

async function main() {
  let res = 'Welcome to the hyper63 tour!'


  console.log(res)

}

main()

