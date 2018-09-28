# Yellicode-Angular

This project demonstrates code generation of Angular code using the Yellicode code generator. The `codegen` directory contains code generation templates that create Angular components, services and routes from a custom JSON model.

For a walkthrough of this code check out the article [Build your own Angular code generator](https://www.yellicode.com/blog/angular-code-generator).

License: MIT

## Installation
* Run `npm install -g @yellicode/cli` if the Yellicode CLI is not already on your machine.
* Run `npm install -g @angular/cli` if the Angular CLI is not already on your machine.
* Run `npm install`.

## Generating code

Run `yellicode` after making changes to the file `codegen\app-model.json` or after making changes to any of the templates in the `codegen` directory. This will update all relevate source files.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Further help

To get more help on Yellicode check out the [Yellicode Documentation](https://www.yellicode.com/docs).

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
