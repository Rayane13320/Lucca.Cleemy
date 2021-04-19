import { HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { Config } from "./config/config.model";
import { ConfigService } from "./config/config.service";
import { CoreModule } from "./core/core.module";
import { ExpenseModule } from "./modules/expense/expense.module";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { BrowserModule } from "@angular/platform-browser";

function loadConfigFactory(
  configService: ConfigService,
): () => Promise<Config> {
  return () => configService.getConfig().toPromise();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    ExpenseModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigFactory,
      deps: [ConfigService],
      multi: true,
    },
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
