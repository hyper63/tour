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
//  res = await $.put(`/data/${app}`)
  //res = await $.post(`/data/${app}`, Movie('Avengers', '2012', [ 'sci-fi', 'action']))
  //res = await $.post(`/data/${app}`, Movie('GroundhogDay', '1993', [ 'fantasy', 'comedy']))
  /*
  let movie = await $.get(`/data/${app}/ghostbusters-1984`)
  movie.poster = 'ghostbusters.jpg'
  res = await $.put(`/data/${app}/foo`, movie)
  */
  
  res = await $.post(`/data/${app}/_query`, {
    selector: {
      type: 'movie',
      year: {
        $gt: '2000'
      }
    },
  })
  console.log(res)


}

main()

