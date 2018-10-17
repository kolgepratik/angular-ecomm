// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  styles: {
    navbar: {
      bgClass: '' // bg-dark 
    }
  },

  firebase: {
    apiKey: "AIzaSyAXNuWwBkw_Lyk8jZmkHn_vdBn2ej1pAQI",
    authDomain: "kp-ng-ecomm.firebaseapp.com",
    databaseURL: "https://kp-ng-ecomm.firebaseio.com",
    projectId: "kp-ng-ecomm",
    storageBucket: "kp-ng-ecomm.appspot.com",
    messagingSenderId: "491752461166"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
