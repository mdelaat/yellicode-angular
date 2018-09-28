"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const angular_1 = require("@yellicode/angular");
const appPaths = require("./app-paths");
const path = require("path");
exports.writeComponentClass = (writer, model, fileBaseName, componentDir, generateStyleSeets) => {
    const implement = ['OnInit']; // Whatever interfaces you might want to implement
    const extend = []; // If you have your own component base class, add it here
    const angularCoreImports = ['Component', 'OnInit']; // Add default Angular imports here
    // 1. Imports
    // Import Angular components
    writer.writeImports('@angular/core', angularCoreImports);
    // Import services that we depend on
    if (model.useServices) {
        model.useServices.forEach(serviceName => {
            const servicePath = path.join(appPaths.servicesDir, `${templating_1.NameUtility.camelToKebabCase(serviceName)}.service`);
            writer.writeImports(path.relative(componentDir, servicePath), [`${serviceName}Service`]);
        });
    }
    writer.writeLine();
    // 2. Write the component
    const componentConfig = {
        selector: templating_1.NameUtility.camelToKebabCase(model.name),
        templateUrl: `./${fileBaseName}.html`
    };
    if (generateStyleSeets) {
        componentConfig.styleUrls = [`./${fileBaseName}${appPaths.styleSheetExtension}`];
    }
    // First write the @Component(...) class decorator with the configuration
    angular_1.AngularWriter.writeComponentDecorator(writer, componentConfig);
    // Then write the class itself
    writer.writeClassBlock({ name: `${model.name}Component`, export: true, extends: extend, implements: implement }, () => {
        // Class constructor
        writer.writeIndent();
        writer.write('constructor(');
        // Inject services
        if (model.useServices) {
            writer.write(model.useServices.map(serviceName => `private ${templating_1.NameUtility.upperToLowerCamelCase(serviceName)}Service: ${serviceName}Service`).join(','));
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
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWNsYXNzLnRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcG9uZW50LWNsYXNzLnRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0Esc0RBQW9EO0FBQ3BELGdEQUFvRTtBQUNwRSx3Q0FBd0M7QUFDeEMsNkJBQTZCO0FBRWhCLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxNQUF3QixFQUFFLEtBQXFCLEVBQUUsWUFBb0IsRUFBRSxZQUFvQixFQUFFLGtCQUEyQixFQUFFLEVBQUU7SUFDOUosTUFBTSxTQUFTLEdBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGtEQUFrRDtJQUMxRixNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUMsQ0FBQyx5REFBeUQ7SUFDdEYsTUFBTSxrQkFBa0IsR0FBYSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLG1DQUFtQztJQUVqRyxhQUFhO0lBQ2IsNEJBQTRCO0lBQzVCLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFFekQsb0NBQW9DO0lBQ3BDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLHdCQUFXLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVHLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMzRixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFbkIseUJBQXlCO0lBQ3pCLE1BQU0sZUFBZSxHQUFvQjtRQUN2QyxRQUFRLEVBQUUsd0JBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ2xELFdBQVcsRUFBRSxLQUFLLFlBQVksT0FBTztLQUN0QyxDQUFDO0lBRUYsRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLGVBQWUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLFlBQVksR0FBRyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFBO0lBQ2xGLENBQUM7SUFFRCx5RUFBeUU7SUFDekUsdUJBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDL0QsOEJBQThCO0lBQzlCLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUU7UUFDcEgsb0JBQW9CO1FBQ3BCLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdCLGtCQUFrQjtRQUNsQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyx3QkFBVyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxZQUFZLFdBQVcsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUosQ0FBQztRQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkIsaUJBQWlCO1FBQ2pCLE1BQU0sQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBIn0=