import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import store from 'src/app/redux/store/store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if user exists (logged in):
    if (store.getState().authState.user) {

      // Clone the request object:
      request = request.clone({

        // Add the token (if exists) to any request:
        setHeaders: {
          Authorization: "Bearer " + store.getState().authState.user.token
        }
      });
    }

    

    // Call next for continuing the request
    return next.handle(request);
  }
}
