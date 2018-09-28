/**
 * This template generates Angular services. It enumerates all services in the model "app.model.json"
 * and generates a TypeScript class for each service.
 */
import * as path from 'path';
import { Generator, NameUtility } from '@yellicode/templating';
import { TypeScriptWriter } from '@yellicode/typescript';
import { AppModel } from './app-model';
import * as appPaths from './app-paths';
import {writeServiceClass} from './service-class.template';

Generator.getModel<AppModel>().then((model: AppModel) => {

  // Generate a file for each service in the model
  model.services.forEach((service) => {
    // Let's assume a CamelCase service name in the model. By convention, make it kebab-case for use in file paths.
    const kebabCaseServiceName = NameUtility.camelToKebabCase(service.name);
    const fileBaseName = `${kebabCaseServiceName}.service`;

    // Generate the service class
    Generator.generate({ outputFile: `${path.join(appPaths.servicesDir, fileBaseName)}.ts` }, (output) => {
      const typeScript = new TypeScriptWriter(output);
      writeServiceClass(typeScript, service);
    });
  });
})
