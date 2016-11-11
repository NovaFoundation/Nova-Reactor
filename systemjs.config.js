/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      // other libraries
      'ng2-charts/ng2-charts':     'node_modules/ng2-charts/ng2-charts',
      'rxjs':                      'npm:rxjs',
      'angular2-oauth2':           'node_modules/angular2-oauth2',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      "node_modules/ng2-charts": {
        defaultExtension: 'js'
      },
      "angular2-oauth2": {
          //"baseURL": "/",
          //"format": "register",
          "defaultExtension": "js",
          "map": {
              "base64-js": "./node_modules/base64-js/lib/b64.js",
              "buffer": "./node_modules/buffer/index.js",
              "convert-hex": "./node_modules/convert-hex/convert-hex.js",
              "convert-string": "./node_modules/convert-string/convert-string.js",
              "ieee754": "./node_modules/ieee754/index.js",
              "isarray": "./node_modules/isarray/index.js",
              "js-base64": "./node_modules/js-base64/base64.js",
              "sha256": "./node_modules/sha256/lib/sha256.js"
          },
      }
    }
  });
})(this);
