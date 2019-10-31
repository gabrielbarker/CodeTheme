# Code-Theme

A CLI app that sets your VS Code theme to a randomly generated colour palette, powered by Colormind.

## Installation

In order to install code-theme you will be asked to supply it with the complete filepath of your VS Code's *settings.json* file. This can be found by going to *settings* in VS Code and following a link to 'Edit in settings.json'. Then copy this file's full path.

In order to be able to run code-theme from anywhere you should run the command
```npm i code-theme -g```

## Usage

To view all possible commands enter:
```code-theme -h```
This will tell you that you can run the following commands:

```code-theme ch``` - This will *change* the current theme to a new randomly generated one.

```code-theme d```  - This will return the current theme to it's *default* settings.

```code-theme s ["name"]``` - This will *save* the current theme as *name*.

```code-theme o ["name"]``` - This will *open* the theme called *name* if it exists.

```code-theme ls``` - This will show a *list* of all the saved themes.

If you need to set the path of the settings file again then you can run:

```code-theme __init__``` 

## Colormind

Colormind is an amazing, intelligent colour palette generator. It changes the source material for the colour schemes that will be generated every day so code-theme will be able to continually supply diverse, unique themes.