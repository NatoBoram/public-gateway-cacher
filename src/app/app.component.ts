import { ChangeDetectionStrategy, Component, Inject } from "@angular/core"
import { ThemeService } from "./services/theme.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(@Inject(ThemeService) readonly themeService: ThemeService) {}
}
