/**
 * 
 * 
 * @code How to use
 * 
 * 
 * /// option 1 : it does not call t() over agian. good for long page listing like endless forum page loading


    /// ts
    t = {};
    constructor( public ln: Language ) {
        ln.languageCode = 'ko';
        this.t['login'] = this.ln.t( 'login', { ... } );
        this.t['logout'] = this.ln.t( 'logout' );
    }

    /// template
    {{ t.loign }}



 * 
 * 
 * /// option 1
   /// ts
    constructor() {
        public ln: Language ) {
        ln.languageCode = 'ko';
    }
    t( code, args? ) {
        return this.ln.t( code, args );
    }


    /// template
   {{ t( 'profile', { name: this.user.info.name } ) }}
 *
 * @endcode
 * 
 * 
 */
import { Injectable } from '@angular/core';
import { text } from './../language-translate';



@Injectable()
export class Language {
    languageCode: string = 'en';

    constructor() {
        this.languageCode = 'en';
        console.log('code: ', this.languageCode);
    }

    /**
     * 
     * ln.t( 'login', {'id': 'abc'} )
     * 
     * @param code 
     * @param args 
     */
    t(code: string, args?: any): string {
        console.log(`languageCode: ${this.languageCode}, code: ${code}`);
      if ( code === void 0 ) return 'code undefined';
      if ( text[ code ] === void 0 ) return code;
      if ( text[ code ][ this.languageCode ] === void 0 ) return code;
      let str = text[ code ][ this.languageCode ];
      console.log(args);
      if ( args !== void 0 && Object.keys( args ).length ) {

        for( let i in args ) {
            console.log(`str: ${str}, i: ${i}, args[${i}]: ${args[i]}`)
            str = str.replace('#' + i, args[i]);
        }
      }
      console.log("return str: ", str);
      return str;
    }

}
