import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Howl, Howler } from 'howler';
import { File } from '@ionic-native/file';

import { ApiServices } from '../../services';
import { MusicLists } from '../../providers';

export interface Track {
  isFavourite: boolean;
  sound: Howl
}

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {
  playlist: Array<any>;
  playing: boolean = false;
  loop: boolean = false;
  sound: Howl = null;
  index: number = 0;
  currentId: any;
  currentRecord:any  = {};

  constructor(
    private router: Router,
    private apiService: ApiServices,
    private musics: MusicLists,
    private file: File
  ) {
    this.getMusicList();
    
  }
  
  ngOnInit() {
    // this.setPlayerSound();
    // this.file.listDir(this.file.dataDirectory, 'home').then( res => console.log(res)).catch(err => console.log(err))
    console.log(this.file.dataDirectory);
    this.file.checkDir(this.file.dataDirectory, '')
    .then(_ => console.log('Directory exists'))
    .catch(err => console.log('Directory doesn\'t exist'));
  }

  getMusicList(){
    // console.log(this.musics.retreiveMusicListFromJson());
    const url = `assets/json/music-list.json`;
        let proRes;
        this.apiService.getApi(url).then(res => {
          if(res){
            this.playlist = res
            this.setCurrentTrack(this.playlist[0]);
            console.log(this.playlist);
          }
        }).catch(err => console.log(err))

        // console.log('response', proRes)
        return proRes;
  }

  // sets the current record of the track to be played.
  setCurrentTrack(music:any){
    if(this.currentRecord.sound){
      this.currentRecord.sound.stop();
      this.currentRecord = music;
      this.currentRecord.isFavourite = false;
      this.currentRecord.sound = new Howl({
        src: [music.musicUrl],
        html5: true,
        loop: this.loop,
        onplay: () => {
          this.playing = true;
          console.log(this.playing);
        },
        onended: () => {
          console.log('music just ended');
          this.next();
        }
      })
    }else{
      this.currentRecord = music;
      this.currentRecord.isFavourite = false;
      this.currentRecord.sound = new Howl({
        src: [music.musicUrl],
        html5: true,
        onplay: () => {
          this.playing = true;
        }
      })
    }
  }

  

  togglePlay(){
    this.playing = !this.playing;
    if(this.playing) this.play();
    if(this.playing === false) this.pause();
  }

  toggleLoop(){
    this.loop = !this.loop;
    // this.repeatSingleMusic();
  }

  play(){
    this.currentId = this.currentRecord.sound.play();
    this.currentRecord.sound.on('end', () => {
      if(this.loop){
        console.log('looping');
        this.repeatSingleMusic();
      }else{
        this.next();
      }
    })
    // setInterval(() => {
    //   console.log(this.currentRecord.sound.duration);
    // }, 1000);
  }

  pause(){
    this.currentRecord.sound.pause();
  }

  repeatSingleMusic(){
    this.index = this.playlist.findIndex(music => music.id === this.currentRecord.id);
    this.setCurrentTrack(this.playlist[this.index]);
    this.currentRecord.sound.play();
    console.log('repeat is working');
    // this.currentRecord.sound.loop(true, this.currentId);
  }

  next(){
    this.index = this.playlist.findIndex(music => music.id === this.currentRecord.id);
    this.index ++;
    if(this.index > (this.playlist.length - 1)) this.index = 0;
    this.setCurrentTrack(this.playlist[this.index]);
    this.play();
  }

  previous(){
    this.index = this.playlist.findIndex(music => music.id === this.currentRecord.id);
    this.index --;
    if(this.index < 0) this.index = (this.playlist.length - 1);
    this.setCurrentTrack(this.playlist[this.index]);
    this.play();
  }


  monitorMusicPlayer(){

  }

 

  navigateToDetailsPage(){
    this.router.navigate(['/details']);
  }

}
