const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);

async function createTaskDirectories() {
    const numTasks = 6; // Number of tasks to create (0 to 5)
    const baseDir = './'; // Base directory where task_x directories will be created

    try {
        // Loop through each task number
        for (let i = 0; i < numTasks; i++) {
            const taskDirectoryName = `task_${i}`;
            const taskDirectoryPath = path.join(baseDir, taskDirectoryName);
            const jsDirectoryPath = path.join(taskDirectoryPath, 'js');

            // Create 'task_x' directory
            await mkdir(taskDirectoryPath);

            // Create 'js' directory inside 'task_x'
            await mkdir(jsDirectoryPath);

            // List of files to copy into 'task_x'
            const filesToCopy = ['package.json', 'tsconfig.json', 'webpack.config.js'];

            // Copy each file into 'task_x' directory
            for (const file of filesToCopy) {
                await copyFile(file, path.join(taskDirectoryPath, file));
                console.log(`Copied ${file} to ${taskDirectoryName}`);
            }

            // Create 'main.ts' empty file inside 'task_x/js'
            const mainTsFilePath = path.join(jsDirectoryPath, 'main.ts');
            fs.writeFileSync(mainTsFilePath, ''); // Creates an empty file

            console.log(`Task directory '${taskDirectoryName}' created successfully.`);
        }

        console.log(`All task directories created successfully.`);
    } catch (err) {
        console.error(`Error creating task directories: ${err}`);
    }
}

createTaskDirectories();

