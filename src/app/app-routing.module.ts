import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventsComponent } from './components/add-events/add-events.component';
import { EventsComponent } from './components/events/events.component';

const routes: Routes = [
  { path: '', component: EventsComponent },
  { path: 'event', component: EventsComponent },
  { path: 'event/add', component: AddEventsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
