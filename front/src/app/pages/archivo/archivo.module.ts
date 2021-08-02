import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivoRoutingModule } from './archivo-routing.module';
import { ArchivoComponent } from './archivo.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule}  from '@angular/common/http';




@NgModule({
  declarations: [
    ArchivoComponent
  ],
  imports: [
    CommonModule,
    ArchivoRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ]
})
export class ArchivoModule { }
