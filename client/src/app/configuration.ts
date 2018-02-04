import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  public ApiIP = 'http://localhost';
  public ApiPort = '3000';
  public Server = this.ApiIP + ':' + this.ApiPort;
  public ApiUrl = '/api/';
  public ServerWithApiUrl = this.Server + this.ApiUrl;
}
