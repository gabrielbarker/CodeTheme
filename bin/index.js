#!/usr/bin/env node

const program = require('commander');
const theme = require('../lib/theme');

program
    .command('change')
    .alias('ch')
    .description('Change the current theme')
    .action(function () {
        theme.setSettingsFileToRandomTheme();
    });

program
    .command('default')
    .alias('d')
    .description('Set the current theme back to default')
    .action(function () {
        theme.setSettingsToDefault();
    });

program
    .command('save <name>')
    .alias('s')
    .description('Save the current theme')
    .action(function (name) {
        theme.saveCurrentTheme(name);
    });



program
    .command('list')
    .alias('ls')
    .description('List the saved themes')
    .action(function () {
        theme.listSavedThemes();
    });

program
    .command('open <name>')
    .alias('o')
    .description('Open a saved theme')
    .action(function (name) {
        theme.setThemeToSavedTheme(name);
    });

program
    .command('slack')
    .alias('sl')
    .description('Generate a slack theme')
    .action(function () {
        theme.createSlackTheme();
    });

program.parse(process.argv);