// Imports for loading & configuring the in-memory web api
import { provide }    from '@angular/core';
import { XHRBackend } from '@angular/http';


// The usual bootstrapping imports
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS }     from '@angular/router'

import { AppComponent }   from './app.component';
import { LocationStrategy} from '@angular/common';

/*
bootstrap(AppComponent, [ HTTP_PROVIDERS ]);
 */
bootstrap(AppComponent, [
    HTTP_PROVIDERS//      provide(LocationStrategy,
         //{useClass: HashLocationStrategy}) 
 //   provide(XHRBackend, { useClass: InMemoryBackendService }), // in-mem server
 //   provide(SEED_DATA,  { useClass: InMemoryDataService })     // in-mem server data
]);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/