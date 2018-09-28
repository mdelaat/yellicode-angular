"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This template generates Angular services. It enumerates all services in the model "app.model.json"
 * and generates a TypeScript class for each service.
 */
const path = require("path");
const templating_1 = require("@yellicode/templating");
const typescript_1 = require("@yellicode/typescript");
const appPaths = require("./app-paths");
const service_class_template_1 = require("./service-class.template");
templating_1.Generator.getModel().then((model) => {
    // Generate a file for each service in the model
    model.services.forEach((service) => {
        // Let's assume a CamelCase service name in the model. By convention, make it kebab-case for use in file paths.
        const kebabCaseServiceName = templating_1.NameUtility.camelToKebabCase(service.name);
        const fileBaseName = `${kebabCaseServiceName}.service`;
        // Generate the service class
        templating_1.Generator.generate({ outputFile: `${path.join(appPaths.servicesDir, fileBaseName)}.ts` }, (output) => {
            const typeScript = new typescript_1.TypeScriptWriter(output);
            service_class_template_1.writeServiceClass(typeScript, service);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMudGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXJ2aWNlcy50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7R0FHRztBQUNILDZCQUE2QjtBQUM3QixzREFBK0Q7QUFDL0Qsc0RBQXlEO0FBRXpELHdDQUF3QztBQUN4QyxxRUFBMkQ7QUFFM0Qsc0JBQVMsQ0FBQyxRQUFRLEVBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFlLEVBQUUsRUFBRTtJQUV0RCxnREFBZ0Q7SUFDaEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNqQywrR0FBK0c7UUFDL0csTUFBTSxvQkFBb0IsR0FBRyx3QkFBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RSxNQUFNLFlBQVksR0FBRyxHQUFHLG9CQUFvQixVQUFVLENBQUM7UUFFdkQsNkJBQTZCO1FBQzdCLHNCQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ25HLE1BQU0sVUFBVSxHQUFHLElBQUksNkJBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEQsMENBQWlCLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQSJ9