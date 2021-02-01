#!/usr/bin/env node

const chalk = require('chalk')

const argv = require('yargs')
    .option('filter', {
        alias: 'f',
        describe: `Filter for specific file or files.\n ${chalk.green('The likes of grep filters.\n')}`
    })
    .option('path', {
        alias: 'p',
        describe: `Path to files.\n ${chalk.green('Defaults to current directory.')}\n`
    })
    .option('dest', {
        alias: 'd',
        describe: `Path destination of files during moving or copying.\n ${chalk.green('Must be provided in [copy, move] actions.\n')}`
    })
    .option('action', {
        alias: 'a',
        describe: `Action to be performed on files. [copy, move or delete]\n ${chalk.green('cdm -a copy')}\n`
    })
    .demandOption(['filter'], 'You must provide a filter option.')
    .demandOption(['action'], 'You must provide an action.')

    .help()
    .argv

const { exec } = require('child_process')
const copy = require('../lib/copy')
const del = require('../lib/delete')
const move = require('../lib/move')


const path = () => {
    if(!argv.path){
        return process.cwd()
    } else {
        return argv.path
    }
}

switch(argv.action){
    case 'copy':
        if(!argv.dest){ return console.log('You must provide a destination file.\n') }
        copy.copy(argv.filter, path(), argv.dest)
        break;

    case 'move':
        if(!argv.dest){ return console.log('You must provide a destination file.\n') }
        move.move(argv.filter, path(), argv.dest)
        break;

    case 'delete':
        del.del(argv.filter, argv.path)
        break;

    default:
        break;
}

