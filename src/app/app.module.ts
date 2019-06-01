import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AsyncPipe } from './async.pipe';
import { IntroComponent } from './intro/intro.component';
import { CleanComponent } from './clean/clean.component';
import { DirtyComponent } from './dirty/dirty.component';
import { ToggleComponent } from './toggle/toggle.component';
import { CombineComponent } from './combine/combine.component';

@NgModule({
  declarations: [
    AppComponent,
    AsyncPipe,
    IntroComponent,
    CleanComponent,
    DirtyComponent,
    ToggleComponent,
    CombineComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
