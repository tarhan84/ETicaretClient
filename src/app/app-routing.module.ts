import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home/home.component';

const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "customers", loadChildren: () => import("./admin/components/customers/customer.module").then(module => module.CustomerModule) },
      { path: "orders", loadChildren: () => import("./admin/components/orders/order.module").then(module => module.OrderModule) },
      { path: "products", loadChildren: () => import("./admin/components/products/product.module").then(module => module.ProductModule) }
    ]
  },
  { path: "", component: HomeComponent },
  { path: "basket", loadChildren: () => import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule) },
  { path: "products", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
