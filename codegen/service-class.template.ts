/**
 * This template generates a service class for any service in the model "app.model.json".
 *
 * Modify this template to suite your own service needs.
 */
import { TypeScriptWriter } from '@yellicode/typescript';
import { ServiceModel } from './app-model';

export const writeServiceClass = (writer: TypeScriptWriter, model: ServiceModel) => {
  const serviceName = `${model.name}Service`;  // The component name from our model + 'Service'
  const angularCoreImports: string[] = ['Injectable']; // Add default Angular imports here
  const implement: string[] = []; // Whatever interfaces you might want to implement
  const extend: string[] = []; // If you have your own service base class, add it here

  writer.writeImports('@angular/core', angularCoreImports);
  writer.writeLine();

  // Injectable class decorator
  writer.writeDecoratorCodeBlock('Injectable', () => {
    writer.writeLine(`providedIn: 'root'`);
  });
  writer.writeClassBlock({ name: serviceName, export: true, extends: extend, implements: implement }, () => {
    // Class constructor
    writer.writeLine(`constructor() {`);
    if (extend && extend.length) {
      writer.writeLineIndented('super()');
    }
    writer.writeLine('}');
    writer.writeLine();
  })
}
