import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  genders = ['MALE', 'FEMALE'];
  selectedFile: File;
  photoId = '';
  userDetail = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    gender: '',
    photo: {
      id: ''
    }
  };

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  ngOnInit() {
  }


  onPhotoSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const path = (window.URL).createObjectURL(this.selectedFile);
    document.getElementById('selectedPhoto').setAttribute('src', path);
    console.log(path);
    const file = new FormData();
    file.append('files', this.selectedFile, this.selectedFile.name);

    // console.log(file.get('files'));
    // console.log(this.selectedFile);
    this.http.post<[{ id: string, fileUrl: string, fileUrlType: string }]>('http://localhost:8080/api/upload-files', file)
      .subscribe(res => {
        // console.log(res);
        const [data] = res;
        this.photoId = data.id;
        // console.log(this.photoId);
      });
  }


  signup(f: NgForm) {
    // console.log(f.value);
    const user = f.value;
    this.userDetail.email = user.email;
    this.userDetail.firstName = user.firstName;
    this.userDetail.lastName = user.lastName;
    this.userDetail.password = user.password;
    this.userDetail.gender = user.gender;
    this.userDetail.photo.id = this.photoId;
    console.log(this.photoId);
    console.log(this.userDetail);
    this.authService.signIn(this.userDetail);
  }
}
