import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { EditdetailsComponent } from './editdetails/editdetails.component';
import { AddDetailComponent } from './add-detail/add-detail.component';
import { TableComponent } from './table/table.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: AddDetailComponent,
  },
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
  },
  {
    path: 'edit-details/:id',
    component: EditdetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
