import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "Lucca-Cleemy";
  public readonly confirmDialogHeader: string = $localize`:@@confirmDialogHeader:Confirmation`;
  public readonly confirmDialogAccept: string = $localize`:@@confirmDialogAccept:Yes`;
  public readonly confirmDialogReject: string = $localize`:@@confirmDialogReject:No`;
}
