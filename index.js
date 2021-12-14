import { connect } from 'hyper-connect'
import fs from 'fs'
const movies = JSON.parse(fs.readFileSync('./movies.json'))

const hyper = connect(process.env.HYPER)

console.log('⚡️ Tour of Hyper ⚡️\n\n')

//<sandbox>


//</sandbox>