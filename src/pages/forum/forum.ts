import { Component } from '@angular/core';
import { POST, PostData, File, POST_LIST_RESPONSE, POSTS } from './../../app/angular-backend/angular-backend';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePostDataComponent } from './../../components/modals/write_postdata/create';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'forum-page',
  templateUrl: './forum.html',
  styleUrls:['forum.css']
})
export class ForumPage{
  posts: POSTS = [];
  constructor(
    private post: PostData,
    private file: File,
    private ngbmodal: NgbModal
  ){
    this.getPosts();
    // this.onClickshowPostModal();
  }


  onClickShowEditPost( post ) {
    console.log("onClickShowEditPost: ", post);
      let modalReference = this.ngbmodal.open( CreatePostDataComponent )
      modalReference.componentInstance.form = post;
  }
  onClickDeletePost( postidx ) {
      let confirmDelete = confirm('Are you sure you want to delete this post?');
      if( ! confirmDelete) return console.log('canceled');
      this.post.delete( postidx ).subscribe( res =>{
        console.log( 'deleted: ', postidx );
      }, err => console.error( 'error: ' , err));
  }

  src( idx ) {
    console.log('udx: ', idx);
    return this.file.url( idx );
  }

  getPosts(){
    this.post.list( { order: 'idx desc' } ).subscribe( (res: POST_LIST_RESPONSE ) =>{
      this.posts = res.data.posts;


    this.onClickShowEditPost( this.posts[0] );
      this.posts.map( post => {

        post.files.map( file => {
          file['url'] = this.file.url( file['idx'] );
        });

      });

      
      console.log('posts: ', this.posts );
    }, err => console.error( err ) );
  }

  onClickshowPostModal() {
    const modalRef = this.ngbmodal.open( CreatePostDataComponent );
  }

}
