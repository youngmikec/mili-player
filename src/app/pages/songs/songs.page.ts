import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  header: new HttpHeaders({"Content-Type": "application/json"}),
}

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage implements OnInit {

  musicRecords: Array<any> = [];
  defaultImage: string = "assets/img/music-record.jpeg";

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.getMusicList();
  }

  getMusicList(){
    // const url:string = 'assets/json/music-list.json';
    const url:string = 'content://com.android.externalstorage.documents/document/D4FF-7EF7';
    // const promiseResponse = this.http.get(url).toPromise();
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': "application/json"
      }
    })
    .then(res => res.json())
    .then(data => this.musicRecords = data)
    .catch(err => console.log(err));
    // console.log(promiseResponse);
  }

  navigateToMusicPage(){
    this.router.navigate(['/music']);
  }

}
