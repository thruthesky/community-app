import { Component } from '@angular/core';
import { POST_CREATE, POST, PostData} from './../../angular-backend/angular-backend';
@Component({
  selector: 'forum-page',
  templateUrl: './forum.html',
  styleUrls:['forum.scss']
})
export class ForumPage{
  constructor( private post: PostData ){
  }



}
