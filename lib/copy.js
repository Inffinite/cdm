const { exec } = require('child_process')

const copy = (filter, path, dest) => {
    exec(`ls | grep ${filter} `, { cwd: path }, (error, stdout, stderr) => {

        if (error) {
            return error;
        }

        const lines = stdout.split(/\n/);

        console.log(lines.length)

        
        for (i = 0; i < lines.length; i++) {

            if (i < lines.length - 1) {
                let files = []
                files.push(lines[i])

                exec(`cp -r ${lines[i]} ${dest}`, { cwd: path }, (error, stdout, stderr) => {
                    if(error){
                        return error
                    }
                })

                for(n = 0; n < files.length; n++){
                    console.log(`[+] ${files[n]}\t\t --------->\t\t${dest}`)
                }
            }
        }

        // console.log('[+] Copied files successfully.\n')
    })
}

module.exports = {
    copy
}