"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This template generates Angular component- and route registrations for all components
 * in the model "app.model.json". It creates "declarations" and "routes" arrays that are
 * imported in the standard Angular "app.module.ts" file.
 */
const path = require("path");
const templating_1 = require("@yellicode/templating");
const typescript_1 = require("@yellicode/typescript");
const angular_1 = require("@yellicode/angular");
const appPaths = require("./app-paths");
templating_1.Generator.generateFromModel({ outputFile: path.join(appPaths.appDir, 'app.component-registration.ts') }, (textWriter, model) => {
    const writer = new typescript_1.TypeScriptWriter(textWriter);
    const componentNames = model.components.map(c => c.name);
    componentNames.push('SideNav'); // add our custom side navigation
    // Write imports
    componentNames.forEach(name => {
        const kebabCaseComponentName = templating_1.NameUtility.camelToKebabCase(name);
        writer.writeImports(`./components/${kebabCaseComponentName}/${kebabCaseComponentName}.component`, [`${name}Component`]);
    });
    // Declarations
    writer.writeLine('export const declarations = [');
    writer.increaseIndent();
    writer.writeLines(componentNames.map(n => `${n}Component`), ',');
    writer.decreaseIndent();
    writer.writeLine(']');
    writer.writeLine();
    // Routes
    writer.writeLine('export const routes = [');
    writer.increaseIndent();
    model.components
        .filter(c => c.createRoute)
        .forEach(c => {
        const path = (c.routeUrl == undefined) ? templating_1.NameUtility.camelToKebabCase(c.name) : c.routeUrl; // allow a routeUrl of ''!
        angular_1.AngularWriter.writeRoute(writer, { path: path, componentName: `${c.name}Component` });
    });
    writer.decreaseIndent();
    writer.writeLine(']');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXJlZ2lzdHJhdGlvbi50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBvbmVudC1yZWdpc3RyYXRpb24udGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztHQUlHO0FBQ0gsNkJBQTZCO0FBQzdCLHNEQUEyRTtBQUMzRSxzREFBeUQ7QUFDekQsZ0RBQW1EO0FBRW5ELHdDQUF3QztBQUV4QyxzQkFBUyxDQUFDLGlCQUFpQixDQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSwrQkFBK0IsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxVQUFzQixFQUFFLEtBQWUsRUFBRSxFQUFFO0lBQzFKLE1BQU0sTUFBTSxHQUFHLElBQUksNkJBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFaEQsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekQsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztJQUVqRSxnQkFBZ0I7SUFDaEIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxQixNQUFNLHNCQUFzQixHQUFHLHdCQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0Isc0JBQXNCLElBQUksc0JBQXNCLFlBQVksRUFBRSxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzVILENBQUMsQ0FBQyxDQUFDO0lBRUgsZUFBZTtJQUNmLE1BQU0sQ0FBQyxTQUFTLENBQUMsK0JBQStCLENBQUMsQ0FBQTtJQUNqRCxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVuQixTQUFTO0lBQ1QsTUFBTSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO0lBQzNDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixLQUFLLENBQUMsVUFBVTtTQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7U0FDMUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ1gsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx3QkFBVyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLDBCQUEwQjtRQUN0SCx1QkFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLFdBQVcsRUFBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQyJ9