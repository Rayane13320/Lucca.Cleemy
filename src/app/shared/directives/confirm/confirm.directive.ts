import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { ConfirmationService } from "primeng/api";

@Directive({
  selector: "[confirm]",
})
export class ConfirmDirective {
  @Input()
  public message: string;

  @Output()
  public accept: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly confirmationService: ConfirmationService) {}

  @HostListener("click")
  public onClick(): void {
    this.confirmationService.confirm({
      message: this.message,
      accept: () => this.accept.emit(),
    });
  }
}
