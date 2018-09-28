"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This template generates Angular components. It enumerates all components in the model "app.model.json"
 * and generates a TypeScript class, a HTML file and an stylesheet file for each component.
 *
 * The code generation of the component class is handled by the writeComponentClass function, which is
 * imported from "component-class.template".
 */
const path = require("path");
const templating_1 = require("@yellicode/templating");
const typescript_1 = require("@yellicode/typescript");
const component_class_template_1 = require("./component-class.template");
const appPaths = require("./app-paths");
const generateStyleSheets = !!templating_1.Generator.templateArgs.generateStyleSheets; // A custom flag in codegenconfig.json
templating_1.Generator.getModel().then((model) => {
    // Generate a file for each component in the model
    model.components.forEach((component) => {
        // Let's assume a CamelCase component name in the model. By convention, make it kebab-case for use in file paths.
        const kebabCaseComponentName = templating_1.NameUtility.camelToKebabCase(component.name);
        const componentDir = path.join(appPaths.componentsDir, kebabCaseComponentName); // puts each component in its own sub directory
        const fileBaseName = `${kebabCaseComponentName}.component`;
        // 1. Generate the component class
        templating_1.Generator.generate({ outputFile: `${path.join(componentDir, fileBaseName)}.ts` }, (output) => {
            const typeScript = new typescript_1.TypeScriptWriter(output);
            component_class_template_1.writeComponentClass(typeScript, component, fileBaseName, componentDir, generateStyleSheets);
        });
        // 3. Generate the HTML template
        templating_1.Generator.generate({ outputFile: `${path.join(componentDir, fileBaseName)}.html` }, (output) => {
            output.writeLine(`<!-- HTML template for the '${component.name}' component. -->`);
            // If a title is configured, write it.
            if (component.title) {
                output.writeLine(`<h1>${component.title}</h1>`);
            }
        });
        // 3. Generate the stylesheet (optional)
        if (generateStyleSheets) {
            templating_1.Generator.generate({ outputFile: `${path.join(componentDir, fileBaseName)}${appPaths.styleSheetExtension}` }, (output) => {
                output.writeLine(`/* Component stylesheet for the '${component.name}' component. */`);
            });
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50cy50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBvbmVudHMudGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCw2QkFBNkI7QUFDN0Isc0RBQStEO0FBQy9ELHNEQUF5RDtBQUN6RCx5RUFBaUU7QUFFakUsd0NBQXdDO0FBRXhDLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLHNCQUFTLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUMsc0NBQXNDO0FBRWhILHNCQUFTLENBQUMsUUFBUSxFQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBZSxFQUFFLEVBQUU7SUFFdEQsa0RBQWtEO0lBQ2xELEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDckMsaUhBQWlIO1FBQ2pILE1BQU0sc0JBQXNCLEdBQUcsd0JBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLHNCQUFzQixDQUFDLENBQUMsQ0FBQywrQ0FBK0M7UUFDL0gsTUFBTSxZQUFZLEdBQUcsR0FBRyxzQkFBc0IsWUFBWSxDQUFDO1FBRTNELGtDQUFrQztRQUNsQyxzQkFBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzNGLE1BQU0sVUFBVSxHQUFHLElBQUksNkJBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEQsOENBQW1CLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDOUYsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQ0FBZ0M7UUFDaEMsc0JBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUM3RixNQUFNLENBQUMsU0FBUyxDQUFDLCtCQUErQixTQUFTLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2xGLHNDQUFzQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLFNBQVMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFBO1lBQ2pELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILHdDQUF3QztRQUN4QyxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDeEIsc0JBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsR0FBRyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ3ZILE1BQU0sQ0FBQyxTQUFTLENBQUMsb0NBQW9DLFNBQVMsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLENBQUM7WUFDeEYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQSJ9