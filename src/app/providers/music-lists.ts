import { Injectable } from '@angular/core';
import { ApiServices } from '../services';

@Injectable({
    providedIn: 'root'
})

export class MusicLists {
    constructor(
        private apiService: ApiServices
    ){

    }

    // Retrieve music from json file in Assets folder
    async retreiveMusicListFromJson(){
        const url = `assets/json/music-list.json`;
        let proRes;
        this.apiService.getApi(url).then(res => {
            if(res){
                proRes = res
            }
        }).catch(err => console.log(err))

        return proRes;
    }
}