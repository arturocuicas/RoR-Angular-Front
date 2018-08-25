
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';

// Bootstrap Module
import { ModalModule } from 'ngx-bootstrap/modal';

// Directivas
import { AlertComponent } from './directives/alert.component';

// Services
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';

// Pipes
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { SortByColumnPipe } from './pipes/sort-by-column.pipe';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NewComponent } from './components/new/new.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewComponent,
    AlertComponent,
    FilterByNamePipe,
    SortByColumnPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    ModalModule.forRoot()
  ],
  exports: [

  ],
  providers: [
    appRoutingProviders,
    UserService,
    AlertService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
