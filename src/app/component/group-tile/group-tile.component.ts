import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


export interface MusicTile {
  title: string;
  musics: []
}

@Component({
  selector: 'app-group-tile',
  templateUrl: './group-tile.component.html',
  styleUrls: ['./group-tile.component.scss'],
})
export class GroupTileComponent implements OnInit {

  @Input() record: MusicTile;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  navigateToDetails(){
    this.router.navigate(['/details']);
  }

  navigateToMusicPage(){
    this.router.navigate(['/music']);
  }

}
