import chalk from 'chalk';
import fs from 'fs';

function removeFile(file) {
    fs.unlinkSync("uploads/" + file, (error) => {
        if (error) console.log(chalk.red.bold('unable to delete file'));
        else console.log(chalk.green.bold('file deleted'))
    });
}

export default removeFile;