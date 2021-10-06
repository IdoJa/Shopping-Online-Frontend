import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/auth-models/user.model';
import store from 'src/app/redux/store/store';

@Component({
  selector: 'app-left-panel-a',
  templateUrl: './left-panel-a.component.html',
  styleUrls: ['./left-panel-a.component.css']
})
export class LeftPanelAComponent implements OnInit {

  constructor() { }

  public user: UserModel = store.getState().authState.user;
  public unsubscribeStore: Unsubscribe;

  public ngOnInit(): void {
    this.unsubscribeStore = store.subscribe(() => {
      this.user = store.getState().authState.user;
    });
  }

  public ngOnDestroy() {
    this.unsubscribeStore();
  }

}
