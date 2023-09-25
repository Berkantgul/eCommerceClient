import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private _connection: HubConnection
  get connection() {
    return this._connection
  }


  start(hubUrl: string) {
    if (!this._connection || this._connection?.state == HubConnectionState.Disconnected) {

      const builder: HubConnectionBuilder = new HubConnectionBuilder()

      const hubConnection: HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect().build()

      hubConnection.start()
        .then((data) => console.log("connected"))
        .catch(error => setTimeout(() => this.start(hubUrl), 2000))

      this._connection = hubConnection

      this._connection.onreconnected(connectionId => console.log("reconnected"))
      this._connection.onreconnecting(connectionId => console.log("reconnecing"))
      this._connection.onclose(connectionId => console.log("closed"))
    }
  }

  invoke(procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this._connection.invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack)
  }

  on(procedureName: string, callBack: (...message: any) => void) {
    this._connection.on(procedureName, callBack)
  }
}
