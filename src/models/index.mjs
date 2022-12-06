import mongoose from 'mongoose'
import chalk from 'chalk'

async function connectToDB () {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(chalk.yellow('CONNECTED TO MONGODB'))
  } catch (error) {
    return error
  }
}

export default connectToDB
