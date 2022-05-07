const { exec } = require("child_process");
const fs = require("fs");

const pid = fs.readFileSync("save_pid.txt").toString().replace(/[^\d]/g, "");

exec(`kill -9 ${pid}`, (err, stdout, stderr) => {
    if (err) {
        //some err occurred
        console.error(err);
    } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    }
});
