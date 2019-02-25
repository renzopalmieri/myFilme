import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { FingerprintAIO , FingerprintOptions} from '@ionic-native/fingerprint-aio/ngx';
import { Router } from '@angular/router';


import {FingerprintAIOOriginal, } from '@ionic-native/fingerprint-aio';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  fingerprintOptions : FingerprintOptions;

  constructor( private platform:Platform, private fingerprint: FingerprintAIO , public router: Router ) {
    
    this.fingerprintOptions = {
            clientId: 'fingerprint-id',
            clientSecret:'password',
            disableBackup : true
    };
   }





  async showFingerprintDialog() {
    try {
        await this.platform.ready();
        const available = await this.fingerprint.isAvailable();
        console.log(available);
        if (available === 'finger') {

          const result = await this.fingerprint.isAvailable;
                  this.fingerprint.show({
                    clientId:'Fingerprint-demo',
                    clientSecret:'password',
                    disableBackup : true
                  })

              .then(result => {
                console.log('exitoso');
                this.router.navigateByUrl('movies');
              });
        }

    } catch (e) {
      console.log(e);
         // this.router.navigateByUrl('movies');
  
    }
  }


}
