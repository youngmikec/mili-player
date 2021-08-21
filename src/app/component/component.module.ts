import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GroupTileComponent } from './group-tile/group-tile.component';
import { ThumbnailComponent  } from './thumbnail/thumbnail.component';
import { TileComponent } from './tile/tile.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // TabsPageRoutingModule
  ],
  declarations: [
      TileComponent,
      GroupTileComponent,
      ThumbnailComponent,
    ],
    exports: [
        TileComponent,
        GroupTileComponent,
        ThumbnailComponent,
    ]
})
export class ComponentModule {}
