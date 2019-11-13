/**
 * This template generates Angular component- and route registrations for all components
 * in the model "app.model.json". It creates "declarations" and "routes" arrays that are
 * imported in the standard Angular "app.module.ts" file.
 */
import * as path from 'path';
import { NameUtility } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { TextWriter } from '@yellicode/core';
import { TypeScriptWriter } from '@yellicode/typescript';
import { AngularWriter } from '@yellicode/angular';
import { AppModel } from './app-model';
import * as appPaths from './app-paths';

Generator.generateFromModel<AppModel>({ outputFile: path.join(appPaths.appDir, 'app.component-registration.ts')}, (textWriter: TextWriter, model: AppModel) => {
    const writer = new TypeScriptWriter(textWriter);

    const componentNames = model.components.map(c => c.name);
    componentNames.push('SideNav'); // add our custom side navigation

    // Write imports
    componentNames.forEach(name => {
        const kebabCaseComponentName = NameUtility.camelToKebabCase(name);
        writer.writeImports(`./components/${kebabCaseComponentName}/${kebabCaseComponentName}.component`, [`${name}Component`]);
    });

    // Declarations
    writer.writeLine('export const declarations = [')
    writer.increaseIndent();
    writer.writeLines(componentNames.map(n => `${n}Component`), ',');
    writer.decreaseIndent();
    writer.writeLine(']');
    writer.writeLine();

    // Routes
    writer.writeLine('export const routes = [')
    writer.increaseIndent();
    model.components
      .filter(c => c.createRoute)
      .forEach(c => {
        const path = (c.routeUrl == undefined) ? NameUtility.camelToKebabCase(c.name) : c.routeUrl; // allow a routeUrl of ''!
        AngularWriter.writeRoute(writer, {path: path, componentName: `${c.name}Component`});
    });
    writer.decreaseIndent();
    writer.writeLine(']');
});
