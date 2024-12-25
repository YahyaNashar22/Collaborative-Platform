import chalk from 'chalk';
import fs from 'fs';

function removeImage(image) {
    fs.unlinkSync("images/" + image, (error) => {
        if (error) console.log(chalk.red.bold('unable to delete image'));
        else console.log(chalk.green.bold('image deleted'))
    });
}

export default removeImage;