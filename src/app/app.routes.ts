import { Routes } from '@angular/router';
import { LayoutWebsiteComponent } from './layouts/layout-website/layout-website.component';
import { HomeComponent } from './page/home/home.component';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { DashboardComponent } from './page/admin/dashboard/dashboard.component';
import { ProductListComponent } from './page/admin/products/product-list/product-list.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { ProductAddComponent } from './page/admin/products/product-add/product-add.component';
import { ProductEditComponent } from './page/admin/products/product-edit/product-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutWebsiteComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductListComponent,
      },
      {
        path: 'products/add',
        component: ProductAddComponent,
      },
      {
        path: 'products/:id/edit',
        component: ProductEditComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
