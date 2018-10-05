/**
 * This template generates Angular components. It enumerates all components in the model "app.model.json"
 * and generates a TypeScript class, a HTML file and an stylesheet file for each component.
 *
 * The code generation of the component class is handled by the writeComponentClass function, which is
 * imported from "component-class.template".
 */
import * as path from 'path';
import { Generator, NameUtility } from '@yellicode/templating';
import { TypeScriptWriter } from '@yellicode/typescript';
import { writeComponentClass } from './component-class.template';
import { AppModel } from './app-model';
import * as appPaths from './app-paths';

const generateStyleSheets = !!Generator.templateArgs.generateStyleSheets; // A custom flag in codegenconfig.json

Generator.getModel<AppModel>().then((model: AppModel) => {

  // Generate a file for each component in the model
  model.components.forEach((component) => {
    // Let's assume a CamelCase component name in the model. By convention, make it kebab-case for use in file paths.
    const kebabCaseComponentName = NameUtility.camelToKebabCase(component.name);
    const componentDir = path.join(appPaths.componentsDir, kebabCaseComponentName); // puts each component in its own sub directory
    const fileBaseName = `${kebabCaseComponentName}.component`;

    // 1. Generate the component class
    Generator.generate({ outputFile: `${path.join(componentDir, fileBaseName)}.ts` }, (output) => {
      const typeScript = new TypeScriptWriter(output);
      writeComponentClass(typeScript, component, fileBaseName, componentDir, generateStyleSheets);
    });

    // 2. Generate the HTML template
    Generator.generate({ outputFile: `${path.join(componentDir, fileBaseName)}.html` }, (output) => {
      output.writeLine(`<!-- HTML template for the '${component.name}' component. -->`);
      // If a title is configured, write it.
      if (component.title) {
        output.writeLine(`<h1>${component.title}</h1>`)
      }
    });

    // 3. Generate the stylesheet (optional)
    if (generateStyleSheets) {
      Generator.generate({ outputFile: `${path.join(componentDir, fileBaseName)}${appPaths.styleSheetExtension}` }, (output) => {
        output.writeLine(`/* Component stylesheet for the '${component.name}' component. */`);
      });
    }
  });
})
