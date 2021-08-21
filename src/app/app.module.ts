import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';



import { ApiServices } from './services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicLists } from './providers';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiServices,
    MusicLists,
    File, FileChooser, FilePath,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
