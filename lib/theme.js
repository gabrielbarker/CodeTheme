const settingsPath = '/Users/gbarker/Library/Application Support/Code/User/settings.json';
const defaultPath = '/Users/gbarker/GitHub/CodeTheme/lib/default.json'
const savedThemesPath = '/Users/gbarker/GitHub/CodeTheme/lib/savedThemes.json';
const fs = require('fs');
const Colour = require('color');
const x = require('./xhr');

exports.setSettingsFileToRandomTheme = function() {
    let settings = readSettings();
    x.getRandomColourPalette()
        .then((colourStrings) => {
            let colours = getColoursFromColourStrings(colourStrings);
            colours = orderColoursByLightness(colours);
            const jsonEditorTheme = createJSONEditorTheme(colours);
            const jsonWorkbenchTheme = createJSONWorkbenchTheme(colours);
            settings["editor.tokenColorCustomizations"] = jsonEditorTheme;
            settings["workbench.colorCustomizations"] = jsonWorkbenchTheme;
            writeSettingsFile(settings);
        });
}

exports.setSettingsToDefault = function() {
    const settingsJSON = readDefaultSettings();
    writeSettingsFile(settingsJSON);
}

exports.saveCurrentTheme = function(name) {
    let uniqueName = true;
    const settingsJSON = readSettings();
    const savedThemesJSON = readSavedThemes();
    savedThemesJSON.themes.forEach(t => {
        if(t.name == name)
            uniqueName = false;
    });
    if(uniqueName) {
        const namedThemeJSON = { "name": `${name}` }
        namedThemeJSON["settings"] = settingsJSON;
        savedThemesJSON.themes.push(namedThemeJSON);
        JSON.stringify(savedThemesJSON, null, 2);
        writeSavedThemes(savedThemesJSON);
    } else {
        console.log('\nThat name is already taken! \nPlease supply a unique name\n')
    }
}

exports.listSavedThemes = function() {
    const savedThemesJSON = readSavedThemes().themes;
    savedThemesJSON.sort((a,b) => { return (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 : (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : 0; })

    console.log();
    savedThemesJSON.forEach(t => console.log(t.name));
    console.log();
}

exports.setThemeToSavedTheme = function(name) {
    let themeExists = false;
    const savedThemesJSON = readSavedThemes();
    savedThemesJSON.themes.forEach(t => 
        {
            if(t.name === name) {
                writeSettingsFile(t.settings);
                themeExists = true;
            }
        });
    if(!themeExists)
        console.log("\nI couldn't find a theme by that name\n");
}

function getColoursFromColourStrings(colourStrings) {
    let colours = [];
        colourStrings.forEach(c => {
            colours.push(Colour.rgb(c));
        });
    return colours;
}

function orderColoursByLightness(colours) {
    let orderedColours = colours;
    orderedColours.sort((a, b) => a.hsl().color[2] - b.hsl().color[2]);
    return orderedColours;
}

function createJSONEditorTheme(colours) {
    return jsonString = {
        "comments": `${colours[0].lighten(0.6).saturate(0.5).hex()}`,
        "functions": `${colours[2].lighten(0.4).saturate(0.5).hex()}`,
        "keywords": `${colours[3].lighten(0.2).saturate(0.5).hex()}`,
        "numbers": `${colours[3].lighten(0.2).saturate(0.5).hex()}`,
        "strings": `${colours[1].lighten(0.6).saturate(0.5).hex()}`,
        "types": `${colours[1].lighten(0.2).saturate(0.5).hex()}`,
        "variables": `${colours[4].lighten(0.2).saturate(0.5).hex()}`
    };
}

function createJSONWorkbenchTheme(colours) {
    return jsonString = {
        "focusBorder": `${colours[0].darken(0.5).hex()}`,
        "foreground": `${colours[4].hex()}`,
        "widget.shadow": `${colours[0].darken(0.6).hex()}`,
        "selection.background": `${colours[0].darken(0.7).hex()}`,
        "descriptionForeground": `${colours[3].darken(0.6).hex()}`,
        "errorForeground": `${colours[3].hex()}`,
        "editor.background": `${colours[0].darken(0.7).hex()}`,
        "sideBar.background": `${colours[0].darken(0.6).hex()}`,
        "sideBar.foreground": `${colours[3].lighten(0.3).hex()}`,
        "menu.background": `${colours[0].darken(0.7).hex()}`,
        "menu.foreground": `${colours[2].hex()}`,
        "terminal.background": `${colours[0].darken(0.6).hex()}`,
        "badge.background": `${colours[0].darken(0.8).hex()}`,
        "input.background": `${colours[0].darken(0.7).hex()}`,
        "panel.background": `${colours[0].darken(0.6).hex()}`,
        "tab.activeBackground": `${colours[0].darken(0.8).hex()}`,
        "tab.inactiveBackground": `${colours[0].darken(0.6).hex()}`,
        "button.background": `${colours[0].darken(0.8).hex()}`,
        "activityBar.background": `${colours[0].darken(0.7).hex()}`
    }
}

function readSettings() {
    const raw = fs.readFileSync(settingsPath);
    return JSON.parse(raw);
}

function readSavedThemes() {
    const raw = fs.readFileSync(savedThemesPath);
    return JSON.parse(raw);
}

function readDefaultSettings() {
    const raw = fs.readFileSync(defaultPath);
    return JSON.parse(raw);
}

function writeSettingsFile(settingsJSON) {
    let settingsString = JSON.stringify(settingsJSON, null, 2);
    fs.writeFileSync(settingsPath, settingsString);
}

function writeSavedThemes(settingsJSON) {
    let settingsString = JSON.stringify(settingsJSON, null, 2);
    fs.writeFileSync(savedThemesPath, settingsString);
}