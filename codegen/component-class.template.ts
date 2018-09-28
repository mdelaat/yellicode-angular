/**
 * This template generates a component class for any component in the model "app.model.json".
 *
 * Modify this template to suite your own component needs.
 */
import { TypeScriptWriter } from '@yellicode/typescript';
import { ComponentModel } from './app-model';
import { NameUtility } from '@yellicode/templating';
import { AngularWriter, ComponentConfig } from '@yellicode/angular';
import * as appPaths from './app-paths';
import * as path from 'path';

export const writeComponentClass = (writer: TypeScriptWriter, model: ComponentModel, fileBaseName: string, componentDir: string, generateStyleSeets: boolean) => {
  const implement: string[] = ['OnInit']; // Whatever interfaces you might want to implement
  const extend: string[] = []; // If you have your own component base class, add it here
  const angularCoreImports: string[] = ['Component', 'OnInit']; // Add default Angular imports here

  // 1. Imports
  // Import Angular components
  writer.writeImports('@angular/core', angularCoreImports);

  // Import services that we depend on
  if (model.useServices) {
    model.useServices.forEach(serviceName => {
      const servicePath = path.join(appPaths.servicesDir, `${NameUtility.camelToKebabCase(serviceName)}.service`);
      writer.writeImports(path.relative(componentDir, servicePath), [`${serviceName}Service`]);
    })
  }
  writer.writeLine();

  // 2. Write the component
  const componentConfig: ComponentConfig = {
    selector: NameUtility.camelToKebabCase(model.name),
    templateUrl: `./${fileBaseName}.html`
  };

  if (generateStyleSeets) {
    componentConfig.styleUrls = [`./${fileBaseName}${appPaths.styleSheetExtension}`]
  }

  // First write the @Component(...) class decorator with the configuration
  AngularWriter.writeComponentDecorator(writer, componentConfig);
  // Then write the class itself
  writer.writeClassBlock({ name: `${model.name}Component`, export: true, extends: extend, implements: implement }, () => {
    // Class constructor
    writer.writeIndent();
    writer.write('constructor(');
    // Inject services
    if (model.useServices) {
      writer.write(model.useServices.map(serviceName => `private ${NameUtility.upperToLowerCamelCase(serviceName)}Service: ${serviceName}Service`).join(','));
    }
    writer.writeEndOfLine(') {');
    if (extend && extend.length) {
      writer.writeLineIndented('super()');
    }
    writer.writeLine('}');
    writer.writeLine();
    // Class contents
    writer.writeLine('public ngOnInit() {');
    writer.writeLine('}');
  })
}
