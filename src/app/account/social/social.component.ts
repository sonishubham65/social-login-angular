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
    this.signIn(`eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4Y2M2MzEyZWVkYjI1MzIwMDQyMjI4MWE4MTQ4N2UyYTkzMjJhOTIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2h1YmhhbSBTb25pIiwicGljdHVyZSI6Imh0dHBzOi8vbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tTElrSGl0dEpxckEvQUFBQUFBQUFBQUkvQUFBQUFBQUFDaEEvQlpTV1Z1UVU2cWcvcGhvdG8uanBnIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3JrY2wtNjEwMzgiLCJhdWQiOiJya2NsLTYxMDM4IiwiYXV0aF90aW1lIjoxNTY0NjY4OTYyLCJ1c2VyX2lkIjoiaWhjeDJWWW13aFM2NlFYa3J5NzJTU25sTGJNMiIsInN1YiI6ImloY3gyVlltd2hTNjZRWGtyeTcyU1NubExiTTIiLCJpYXQiOjE1NjQ2Njg5NjIsImV4cCI6MTU2NDY3MjU2MiwiZW1haWwiOiJzb25pc2h1YmhhbTY1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEzOTA0MDcxNDk2ODYyMzkxMDA3Il0sImZhY2Vib29rLmNvbSI6WyIxMTA5MzE5NDgyNTE2ODg5Il0sImVtYWlsIjpbInNvbmlzaHViaGFtNjVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.dAzdTafUVcdb9wVUUogX-QJX0nasLYo1vJZyJpBoed4Qy6m-VOCNAD9kFOuKB4dS2lHxLxKViOXMtzKOox1QBQxIqZVnrGn0MHexIcU79f_kam3JoP3VDciEAQqR3oIZ9hT6xWt_Z8Vs1gNnmJPp13H2mb4aXclJ8wIYIuT4yjNCuTslZQTkzywwPvJB5JwmYKtJRK0jZg1RPxvhshapOx4PgOoohv6Aq9ps7LQMJvFhRq9gtN5ElON7mKuEJU5vvKoDhdzAl5sBbtxWoOObofQpk6Ei5Tm7ZLuKS--B0qYHLPQraZbgpnKrCZ_auInPHpMoi9zxHUyuLz5yP1pbww`);
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
