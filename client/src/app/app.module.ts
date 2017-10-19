import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ApolloModule } from 'apollo-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { provideClient } from './common/apollo.client';
import { StoreModule } from './common/store.module';
import { MaterialModule } from './common/material.module';
import { AppComponent } from './components/app/app.component';
import { MainComponent } from './components/main/main.component';
import { DebugComponent } from './components/debug/debug.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { appRoutes } from './app.routes';


@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		DebugComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MaterialModule,
		FlexLayoutModule,
		RouterModule.forRoot(appRoutes),
		ApolloModule.forRoot(provideClient),
		StoreModule,
		SimpleNotificationsModule.forRoot(),
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
