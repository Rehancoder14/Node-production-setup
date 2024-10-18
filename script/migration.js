const { exec } = require('child_process');  // Keep exec from 'child_process'
const { stdout } = require('process');
const command = process.argv[2];
const migrationName = process.argv[3];
const validCommands = ['create', 'up', 'down', 'list', 'prune'];

if (!validCommands.includes(command)) {
  console.error(`Invalid command: Command must be one of ${validCommands}`);
  process.exit(0);
}

const commandsWithoutMigrationNameRequired = ['list', 'prune'];
if (!commandsWithoutMigrationNameRequired.includes(command)) {
  if (!migrationName) {
    console.error(`Invalid command: Migration name is required`);
    process.exit(0);
  }
}

function runNpmScript() {
  return new Promise((resolve, reject) => {
    let execCommand = ``;

    if (commandsWithoutMigrationNameRequired.includes(command)) {
      execCommand = `migrate ${command}`;
    } else {
      execCommand = `migrate ${command} ${migrationName}`;  // Correct variable used here
    }

    const childProcess = exec(execCommand, (error, stdout) => {
      if (error) {
        reject(`Error running script: ${error}`);
      } else {
        resolve(stdout);
      }
    });

    childProcess.stderr.on('data', (data) => {
      console.log(data);
    });
  });
}

runNpmScript()
  .then((output) => {
    console.info(output);
  })
  .catch((error) => {
    console.error(`Error: `, error);
  });
