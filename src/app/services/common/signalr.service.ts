import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor(
    @Inject("hubBaseUrl") private hubBaseUrl: string
  ) { }


  start(hubUrl: string) {
    hubUrl = this.hubBaseUrl + hubUrl
    // debugger
    const builder: HubConnectionBuilder = new HubConnectionBuilder()

    const hubConnection: HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect().build()

    hubConnection.start()
      .then((data) => console.log("connected"))
      .catch(error => setTimeout(() => this.start(hubUrl), 2000))


    hubConnection.onreconnected(connectionId => console.log("reconnected"))
    hubConnection.onreconnecting(connectionId => console.log("reconnecing"))
    hubConnection.onclose(connectionId => console.log("closed"))
    return hubConnection
  }

  invoke(hubUrl: string, procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this.start(hubUrl).invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack)
  }

  on(hubUrl: string, procedureName: string, callBack: (...message: any) => void) {
    
    this.start(hubUrl).on(procedureName, callBack)
  }
}
