"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeServiceClass = (writer, model) => {
    const serviceName = `${model.name}Service`; // The component name from our model + 'Service'
    const angularCoreImports = ['Injectable']; // Add default Angular imports here
    const implement = []; // Whatever interfaces you might want to implement
    const extend = []; // If you have your own service base class, add it here
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
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS1jbGFzcy50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZpY2UtY2xhc3MudGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRYSxRQUFBLGlCQUFpQixHQUFHLENBQUMsTUFBd0IsRUFBRSxLQUFtQixFQUFFLEVBQUU7SUFDakYsTUFBTSxXQUFXLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBRSxnREFBZ0Q7SUFDN0YsTUFBTSxrQkFBa0IsR0FBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsbUNBQW1DO0lBQ3hGLE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQyxDQUFDLGtEQUFrRDtJQUNsRixNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUMsQ0FBQyx1REFBdUQ7SUFFcEYsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFbkIsNkJBQTZCO0lBQzdCLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO1FBQ2hELE1BQU0sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFO1FBQ3ZHLG9CQUFvQjtRQUNwQixNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUEifQ==