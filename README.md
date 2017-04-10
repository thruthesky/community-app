# 커뮤니티 앱

본 커뮤니티 앱은 왕초보 [앱 개발자 카페](http://www.angularstudy.com) 에서 그룹 스터디용으로 만든 것입니다.

초보자들을 대상으로 모든 앱에 필요한 회원 관리, 게시판 기능을 가지는 앱을 제작하는 스터디 앱입니다.

백엔드는 웹서버( PHP Built-in 서버 또는 Nginx )와 PHP 그리고 SQLite ( 또는 MySQL ) 로 되어져 있습니다.




# TODO


## Add resources

* boostrap v4
* ng-boostrap
* font-awesome

## Design, layout

* Copy https://v4-alpha.getbootstrap.com/examples/navbar-top/
* put menus: Register, Login, Profile update, resign, Forum.


## User Funtionality.



## pagination

done.

````
input:
    no of totoal records:

options:
    page no.
    no of items in one page.
    no of pages in one navigation bar.

    to show first, last

    @Input() ...;


    <page-navigation
        [no_of_total_items]="345"
        [no_of_items_in_one_page] = "11"
        [no_of_pages_in_navigator] = "13"
        [no_of_current_page] = "15"
        [show_prev_next] = "true"
        [show_first_last] = "true"
        (pageClick)="onPageClick()"
        
    >
    </page-navigation>

````


# Publish


$ update ./angular-backend/config.ts
$ ng build prod
$ scp -r dist/* backend@sonub.com:./www
$ ssh backend@sonub.com
$ cd www; git pull




# Installation


````
$ git clone https://github.com/thruthesky/community-app
$ git submodule update --init
$ npm install --verbose
$ npm install --save classlist.js
````

* Open src/polyfills.ts and uncomments IE9~IE10.
    * You may need to import some modules. Those modules are already stated in polyfills.ts

````
$ ng serve
````






# Coding

## Error handling

You have to Observable.throw() for 'subscribe'.

You can Observable.throw( ) with RES_ERROR_xxxxx from defines.ts.

ie)
````
return Observable.throw( RES_ERROR_NO_FILE_SELECTED );
````

you can handle it like below;

````
    onChangeFile( _ ) {
        this.file.uploadPostFile( _.files[0] ).subscribe( (res:_UPLOAD_RESPONSE) => {
        }, err => {
            console.log('err:', err);
            if ( this.file.isError(err) == ERROR_NO_FILE_SELECTED ) return;
            this.file.alert(err);
        });
    }
````



# User Regitration

* After user registration, the user MUST be redirected to home or profile upload page. If you do not redirect the page, source code may get complicated. For instance, registration page has ID, PW but update page MUST NOT.
    * You can not redirect to the current page in Angular.