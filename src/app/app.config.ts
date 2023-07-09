import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {TokenInterceptor} from "./core/interceptors/token.interceptor";

export const appConfig: ApplicationConfig = {

    providers: [
        provideRouter(routes),
        importProvidersFrom(HttpClientModule, ReactiveFormsModule),
        {
            provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
        }
    ],
};
