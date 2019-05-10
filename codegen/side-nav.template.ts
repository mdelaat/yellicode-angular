/**
 * This template generates TypeScript and HTML code for a navigation component.
 * The component contains a link to each component in the model "app.model.json" that
 * has "createRoute" and "showInSideNav" set to true.
 *
 * If a component has no routeUrl configured, it will assume a default route using
 * standard naming conventions. For each link, the "title" of the component will be used.
 *
 */
import * as path from 'path';
import { NameUtility } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { AppModel } from './app-model';
import { TypeScriptWriter } from '@yellicode/typescript';
import { AngularWriter, ComponentConfig } from '@yellicode/angular';
import { HtmlWriter } from '@yellicode/html';
import * as appPaths from './app-paths';

const componentBaseName = 'SideNav'; // feel free to make this a TopNav, BottomNav or SomeWhereElseNav...
const kebabCaseComponentName = NameUtility.camelToKebabCase(componentBaseName);
const componentSubDir = path.join(appPaths.componentsDir, kebabCaseComponentName);
const fileBaseName = `${kebabCaseComponentName}.component`;

Generator.getModel<AppModel>().then((model: AppModel) => {

  // 1. Generate the component class
  Generator.generate({ outputFile: `${path.join(componentSubDir, fileBaseName)}.ts` }, (output) => {
    const writer = new TypeScriptWriter(output);

    // Import Angular components
    const angularCoreImports: string[] = ['Component']; // The default Angular imports that you need
    writer.writeImports('@angular/core', angularCoreImports);
    writer.writeLine();

    // Write the component class with a @Component decorator
    const componentConfig: ComponentConfig = {
      selector: kebabCaseComponentName,
      templateUrl: `./${fileBaseName}.html`,
      //styleUrls: [] <!-- if you want style, create a stylesheet and add its URL here.
    };

    // First write the @Component(...) class decorator with the configuration
    AngularWriter.writeComponentDecorator(writer, componentConfig);
    // Then write the class itself
    writer.writeClassBlock({ name: `${componentBaseName}Component`, export: true }, () => {
      // Nothing here yet
    });
  });

  // 2. Generate the template
  Generator.generate({ outputFile: `${path.join(componentSubDir, fileBaseName)}.html` }, (output) => {
    const writer = new HtmlWriter(output);
    // Write a <ul> element with a <li> for each component that should be in the side nav
    // There's no styling whatsoever, except for the width: 150px;
    writer.writeElement('ul', { classNames: 'nav-items', attributes: { style: 'width: 150px;' } }, () => {
      model.components
        .filter(c => c.createRoute && c.showInSideNav)
        .forEach(c => {
          writer.writeElement('li', {}, () => {
            const path = (c.routeUrl == undefined) ? NameUtility.camelToKebabCase(c.name) : c.routeUrl; // allow a routeUrl of ''!
            writer.writeElement('a', { attributes: { routerLink: path } }, c.title || c.name)
          });
        });
    });
  });
});
