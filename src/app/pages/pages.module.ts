import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FlexLayoutModule } from "@angular/flex-layout"
import { FormsModule } from "@angular/forms"
import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from "@angular/material/input"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatSortModule } from "@angular/material/sort"
import { MatTableModule } from "@angular/material/table"
import { MatTooltipModule } from "@angular/material/tooltip"
import { PagesRoutingModule } from "./pages-routing.module"
import { PagesComponent } from "./pages.component"

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    PagesRoutingModule,
  ],
})
export class PagesModule {}
