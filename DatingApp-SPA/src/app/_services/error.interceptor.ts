import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
      .pipe(catchError((error, caught) => {
        console.log('Error Occurred');
        console.log(error);

        if(error.status === 401)
        {
          return throwError(error.statusText);
        }

        if(error instanceof HttpErrorResponse)
        {
          const applicationError = error.headers.get('Application-Error');
          if(applicationError)  {
            return throwError(applicationError);
          }


          const serverError = error.error;
          let modelStateErrors = '';
          if(serverError.errors && typeof serverError.errors === 'object'){
            for(const key in serverError.errors){
              modelStateErrors += serverError.errors[key] + '\n';
            }
          }

          return throwError(modelStateErrors || serverError);
        }

        return throwError('Server Error');
      })) as any;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}

