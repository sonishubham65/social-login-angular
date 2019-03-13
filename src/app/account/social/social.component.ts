import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  @Output() token = new EventEmitter<boolean>();
  constructor(private fireAuth:AngularFireAuth) { 
    
    
  }

  accessToken:string;
  userType = 'vendor';
  ngOnInit() {
    
  }
  fetchProvider(error){
    this.fireAuth.auth.fetchProvidersForEmail(error.email).then(providers => {
      this.socialLogin(providers[0],error);
    });
  }
  socialLogin(type,error=null){
    this.signIn(`eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhZDdkNTY3ZWQ3M2M2NTEzZWQ0ZTE0ZTc4OGRjZWU4NjZlMzY3ZDMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2h1YmhhbSBTb25pIiwicGljdHVyZSI6Imh0dHBzOi8vbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tTElrSGl0dEpxckEvQUFBQUFBQUFBQUkvQUFBQUFBQUFDaEEvQlpTV1Z1UVU2cWcvcGhvdG8uanBnIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3JrY2wtNjEwMzgiLCJhdWQiOiJya2NsLTYxMDM4IiwiYXV0aF90aW1lIjoxNTUyNDA1OTI1LCJ1c2VyX2lkIjoiaWhjeDJWWW13aFM2NlFYa3J5NzJTU25sTGJNMiIsInN1YiI6ImloY3gyVlltd2hTNjZRWGtyeTcyU1NubExiTTIiLCJpYXQiOjE1NTI0MDU5MjUsImV4cCI6MTU1MjQwOTUyNSwiZW1haWwiOiJzb25pc2h1YmhhbTY1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEzOTA0MDcxNDk2ODYyMzkxMDA3Il0sImZhY2Vib29rLmNvbSI6WyIxMTA5MzE5NDgyNTE2ODg5Il0sImVtYWlsIjpbInNvbmlzaHViaGFtNjVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.eaxnIOQiyt5ijN5A-BHCwUKYMPXW98dMqkiEFW23_aTXDsGng3TDpXUWv5ByCdUlI-1LV_LG4CxKAumqLmZtx49i65J_kaOWXIckX4tLtdVRIxLkiHo7Iz8dtmkQnfpZQTbYGv9oYw6cZdv8YR4VIQyWd7DZI7ldhTklkgIBMl2Z-xFK6t06sO8OmrSIk46BaJpbdrsLaKlqE4UdAr6f7FvBWYpu08NvBXTFCsrG6e_RCpt64WLjo6XFNS1BmJ0GJOT-KR3kH8r1g63UzEC9wU8wG0oj2Zifj0rHM3TM8KLSa7tuqq17aG8KNMtpnUHIo1iQWMShHnrHHiTUQyXQOg`);
    return false;
    switch(type){
      case 'google.com' : {
          var provider = new auth.GoogleAuthProvider();
          provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      } break;
      case 'facebook.com' : {
          var provider = new auth.FacebookAuthProvider();
          provider.addScope('user_birthday');
      } break;
    }
    var parameters = {
        'display': 'popup'
    }
    if(error){
        parameters['login_hint'] = error.email;
    }
    provider.setCustomParameters(parameters);
    this.fireAuth.auth.signInWithPopup(provider).then(result=>{
        result = JSON.parse(JSON.stringify(result))
        this.accessToken = result.user['stsTokenManager'].accessToken
        if(error){
          this.fireAuth.auth.currentUser.linkAndRetrieveDataWithCredential(error.credential)
        }
        this.signIn(this.accessToken);
    }).catch(error=>{
        switch(error.code){
            case 'auth/account-exists-with-different-credential':{
                this.fetchProvider(error)
            }
        }
    });
  }
  signIn(accessToken){
    this.token.emit(accessToken);
  }
}
