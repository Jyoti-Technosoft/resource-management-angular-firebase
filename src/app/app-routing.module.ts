import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { AddDetailComponent } from './add-detail/add-detail.component';
import { TableComponent } from './table/table.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: 'add-details',
    component: AddDetailComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: 'view',
    component: ViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
