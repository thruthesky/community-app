import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
    PostData,
    
    _LIST, _POST_LIST_RESPONSE,
    _POSTS
} from './../../angular-backend/angular-backend';

@Injectable()
export class AppService {

    post_config_id: string = '';
    posts: _POSTS = [];

    constructor(
        private router: Router,
        private domSanitizer: DomSanitizer ) {

    }

    public redirect( url ) {
        
      console.log('AppService::recirect() : ', url);
      
      let active = this.router.isActive( url, true);
      if( active ) {
          console.log("active:");
        this.router.navigate( [ '/redirect' ] );
      }
      else {
        this.router.navigateByUrl( url );
      }

    
    }

    private sanitzeHtml( html ) : string {
        return this.domSanitizer.bypassSecurityTrustHtml( html ) as string;
    }


    /**
     * 
     * Use this method when you want to apply HTML on post content or comment content.
     * 
     * It does not transform the original content of post or comment, so when you need to edit it, you can use original content.
     * 
     * @param obj 
     * 
     * 
     * @code
     
      <p [innerHTML]=" post.sanitized_content "></p>
      <p [innerHTML]=" comment.sanitized_content "></p>

     * @endcode
     * 
     * 
     * 
     */
    public sanitizeContent( obj ) : string {
        if ( obj === void 0 || obj['content'] === void 0 || ! obj['content'] ) return '';

        let c = obj['content'].replace(/\n/g, "<br>");
        return this.sanitzeHtml( c );
    }
}