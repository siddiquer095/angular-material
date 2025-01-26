import {Routes} from '@angular/router';
import {
  CanActivateComponentSidenav
} from './pages/component-sidenav/component-sidenav-can-load-guard';
import {AuthGuard} from "./core/auth/guards/auth.guard";
import {NoAuthGuard} from "./core/auth/guards/noAuth.guard";
import {SignInComponent} from "./core/auth/sign-in/sign-in.component";
import {LayoutComponent} from "./core/layout/layout.component";
import {Homepage} from "./pages/homepage";

export const MATERIAL_DOCS_ROUTES: Routes = [
  {path: 'sign-in', component: SignInComponent},

  /*{
    path: '',
    canActivate: [AuthGuard],
    pathMatch: 'full',
    loadComponent: () => import('./pages/homepage').then(m => m.Homepage)
  },*/
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    pathMatch: 'full',
    /*children: [
      {path: 'dashboard', loadChildren: () => import('./pages/homepage').then(m => m.Homepage)},

    ]*/
  },
  {path: 'categories', redirectTo: '/components/categories'},
  {path: 'cdk', pathMatch: 'full', redirectTo: '/cdk/categories'},
  {path: 'market', pathMatch: 'full', redirectTo: '/market/overview'},
  {path: 'trade', pathMatch: 'full', redirectTo: '/trade/overview'},
  {path: 'services', pathMatch: 'full', redirectTo: '/services/deposit'},
  {path: 'components', pathMatch: 'full', redirectTo: '/components/categories'},
  {
    path: '404',
    loadComponent: () => import('./pages/not-found').then(m => m.NotFound)
  },
  {
    path: ':section',
    canActivate: [CanActivateComponentSidenav],
    loadChildren: () =>
      import('./pages/component-sidenav/component-sidenav').then(m => m.ComponentSidenavModule)
  },
  {path: '**', redirectTo: '/404'},
];
