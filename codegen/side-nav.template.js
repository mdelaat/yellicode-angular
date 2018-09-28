"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This template generates TypeScript and HTML code for a navigation component.
 * The component contains a link to each component in the model "app.model.json" that
 * has "createRoute" and "showInSideNav" set to true.
 *
 * If a component has no routeUrl configured, it will assume a default route using
 * standard naming conventions. For each link, the "title" of the component will be used.
 *
 */
const path = require("path");
const templating_1 = require("@yellicode/templating");
const typescript_1 = require("@yellicode/typescript");
const angular_1 = require("@yellicode/angular");
const html_1 = require("@yellicode/html");
const appPaths = require("./app-paths");
const componentBaseName = 'SideNav'; // feel free to make this a TopNav, BottomNav or SomeWhereElseNav...
const kebabCaseComponentName = templating_1.NameUtility.camelToKebabCase(componentBaseName);
const componentSubDir = path.join(appPaths.componentsDir, kebabCaseComponentName);
const fileBaseName = `${kebabCaseComponentName}.component`;
templating_1.Generator.getModel().then((model) => {
    // 1. Generate the component class
    templating_1.Generator.generate({ outputFile: `${path.join(componentSubDir, fileBaseName)}.ts` }, (output) => {
        const writer = new typescript_1.TypeScriptWriter(output);
        // Import Angular components
        const angularCoreImports = ['Component']; // The default Angular imports that you need
        writer.writeImports('@angular/core', angularCoreImports);
        writer.writeLine();
        // Write the component class with a @Component decorator
        const componentConfig = {
            selector: kebabCaseComponentName,
            templateUrl: `./${fileBaseName}.html`,
        };
        // First write the @Component(...) class decorator with the configuration
        angular_1.AngularWriter.writeComponentDecorator(writer, componentConfig);
        // Then write the class itself
        writer.writeClassBlock({ name: `${componentBaseName}Component`, export: true }, () => {
            // Nothing here yet
        });
    });
    // 2. Generate the template
    templating_1.Generator.generate({ outputFile: `${path.join(componentSubDir, fileBaseName)}.html` }, (output) => {
        const writer = new html_1.HtmlWriter(output);
        // Write a <ul> element with a <li> for each component that should be in the side nav
        // There's no styling whatsoever, except for the width: 150px;
        writer.writeElement('ul', { classNames: 'nav-items', attributes: { style: 'width: 150px;' } }, () => {
            model.components
                .filter(c => c.createRoute && c.showInSideNav)
                .forEach(c => {
                writer.writeElement('li', {}, () => {
                    const path = (c.routeUrl == undefined) ? templating_1.NameUtility.camelToKebabCase(c.name) : c.routeUrl; // allow a routeUrl of ''!
                    writer.writeElement('a', { attributes: { routerLink: path } }, c.title || c.name);
                });
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1uYXYudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaWRlLW5hdi50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztHQVFHO0FBQ0gsNkJBQTZCO0FBQzdCLHNEQUErRDtBQUUvRCxzREFBeUQ7QUFDekQsZ0RBQW9FO0FBQ3BFLDBDQUE2QztBQUM3Qyx3Q0FBd0M7QUFFeEMsTUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsQ0FBQyxvRUFBb0U7QUFDekcsTUFBTSxzQkFBc0IsR0FBRyx3QkFBVyxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDL0UsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLHNCQUFzQixDQUFDLENBQUM7QUFDbEYsTUFBTSxZQUFZLEdBQUcsR0FBRyxzQkFBc0IsWUFBWSxDQUFDO0FBRTNELHNCQUFTLENBQUMsUUFBUSxFQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBZSxFQUFFLEVBQUU7SUFFdEQsa0NBQWtDO0lBQ2xDLHNCQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDOUYsTUFBTSxNQUFNLEdBQUcsSUFBSSw2QkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1Qyw0QkFBNEI7UUFDNUIsTUFBTSxrQkFBa0IsR0FBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsNENBQTRDO1FBQ2hHLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRW5CLHdEQUF3RDtRQUN4RCxNQUFNLGVBQWUsR0FBb0I7WUFDdkMsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxXQUFXLEVBQUUsS0FBSyxZQUFZLE9BQU87U0FFdEMsQ0FBQztRQUVGLHlFQUF5RTtRQUN6RSx1QkFBYSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMvRCw4QkFBOEI7UUFDOUIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLGlCQUFpQixXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRTtZQUNuRixtQkFBbUI7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILDJCQUEyQjtJQUMzQixzQkFBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ2hHLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxxRkFBcUY7UUFDckYsOERBQThEO1FBQzlELE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUU7WUFDbEcsS0FBSyxDQUFDLFVBQVU7aUJBQ2IsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDO2lCQUM3QyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1gsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRTtvQkFDakMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx3QkFBVyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLDBCQUEwQjtvQkFDdEgsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbkYsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9