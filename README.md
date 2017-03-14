# 커뮤니티 앱

본 커뮤니티 앱은 왕초보 [앱 개발자 카페](http://www.angular.com) 에서 그룹 스터디용으로 만든 것입니다.

초보자들을 대상으로 모든 앱에 필요한 회원 관리, 게시판 기능을 가지는 앱을 제작하는 스터디 앱입니다.

백엔드는 웹서버( PHP Built-in 서버 또는 Nginx )와 PHP 그리고 SQLite ( 또는 MySQL ) 로 되어져 있습니다.



# TODO

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
    >
    </page-navigation>