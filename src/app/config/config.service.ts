import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "./config.model";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  public config: Config;
  private configUrl: string = "assets/config.json";

  constructor(private readonly http: HttpClient) {}

  public getConfig(): Observable<Config> {
    return this.http
      .get<Config>(this.configUrl)
      .pipe(tap((x) => (this.config = x)));
  }
}
