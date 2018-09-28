import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
export const declarations = [
	HomeComponent,
	AccountComponent,
	AboutComponent,
	ContactComponent,
	RegisterComponent,
	SideNavComponent
]

export const routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'account',
		component: AccountComponent
	},
	{
		path: 'about',
		component: AboutComponent
	},
	{
		path: 'contact',
		component: ContactComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
]
