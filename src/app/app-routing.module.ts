import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeedsComponent } from "./feeds/feeds.component";

const routes: Routes = [
  { path: "", redirectTo: "/feeds", pathMatch: "full" }, 
  { path: "feeds", component: FeedsComponent },
  { path: "**", redirectTo: "/feeds" }, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }), 
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}