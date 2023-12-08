import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular material
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { SearchComponent } from './search/search.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        BrowseComponent,
        SearchComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatTableModule,
        MatListModule,
        HttpClientModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatSelectModule,
        FlexLayoutModule,
    ]
})
export class AppModule { }


