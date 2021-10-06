import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import { ErrorsService } from './errors.service';
import { GlobalManagerService } from './global-manager.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private myNotyf = new Notyf({ duration: 4000, ripple: true, position: { x: "left", y: "top" } });

  public constructor(private errorsService: ErrorsService, private globalManagerService: GlobalManagerService) { }

  public success(message: string): void {
    this.myNotyf.success(message);
  }

  public error(err: any): void {
    this.myNotyf.error(this.errorsService.getError(err));
    this.globalManagerService.handleError(err);
  }

}
