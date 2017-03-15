// Imports.
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Root component of entire page.
@Component({
    selector: 'app-component',
    styles: [],
    template: '<p>Application running</p>'
})
export class AppComponent {
}

// Boilerplate to get application running.
@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
