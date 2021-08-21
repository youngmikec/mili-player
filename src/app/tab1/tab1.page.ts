import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  status: boolean;
  fileUrl: string;
  resolvedPath: string = ''
  lists: Array<any> = [];

  constructor(
    private router: Router,
    private file: File,
    private fileChooser: FileChooser,
    // private filePath: FilePath
    ) {}

  navigateToSongs(){
    const sdUrl = this.file.externalRootDirectory;
    this.file.checkDir(sdUrl, 'Xender/audio').then(res => {
      this.status = res
    }).catch(err => console.log(err));
    if(this.status === true){
      this.file.listDir(sdUrl, '/Xender/audio').then( res =>{
        this.lists = res
        this.fileUrl = JSON.stringify(res.toLocaleString());
        res.forEach(item => {
          this.fileUrl = item.toString();

        })
        // this.lists = res.map(item => ({isFile: item.isFile, name: item.name}))
        console.log(this.fileUrl);
      }).catch(err => this.fileUrl = err);

    }
    // this.fileChooser.open()
    // .then(uri => {
    //   this.fileUrl = uri
    //   const splitedArray = this.fileUrl.split('%');
    //   this.resolvedPath = splitedArray[0];
    //   this.file.listDir(this.resolvedPath, 'D4FF-7EF7').then(res =>{
    //     this.lists = res;
    //     console.log('list', res);
    //   }).catch(err => console.log(err))  
    // }).catch(err => {
    //   this.fileUrl = err;
    // });

    // this.file.getDirectory()

  //   this.filePath.resolveNativePath(this.fileUrl)
  // .then(filePath => {
  //   this.resolvedPath = filePath;
  // })
  // .catch(err => console.log(err));

    // this.router.navigate(['/songs']);
  }
}
