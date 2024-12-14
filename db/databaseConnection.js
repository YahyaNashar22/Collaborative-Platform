import mongoose from 'mongoose';
import chalk from 'chalk';

const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log(chalk.blue.bold("Successfully Connected To Database!"));
    }).catch((err) => {
        console.error(err)
        console.log(chalk.red.bold("Failed To Connect To Database!"));
    })
}

export default databaseConnection;