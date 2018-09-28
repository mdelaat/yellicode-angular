import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import * as componentRegistration from './app.component-registration';

// Component declarations
const declarations: any[] = [AppComponent]; // add manual components here
declarations.push(...componentRegistration.declarations); // add generated components

// Routes
const routes: {path:string, component: any}[] = []; // add any manual routes here
routes.push(...componentRegistration.routes); // add generated routes

@NgModule({
  declarations: declarations,
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
