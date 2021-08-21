import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ApiServices {
    
    constructor(){}

    // get Api
    getApi(url: string, options: any = null){
        let proRes;
        if(options){
            return fetch(url, options)
            .then(response => response.json())
            .then(data => proRes = data)
            .catch(err => console.log(err));
        }else{
           return fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                }
            })
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.log(err));    
        }

    }
    //post Api
    //update Api
    //delete Api

}