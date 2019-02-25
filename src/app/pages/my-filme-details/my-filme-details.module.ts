import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyFilmeDetailsPage } from './my-filme-details.page';

const routes: Routes = [
  {
    path: '',
    component: MyFilmeDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyFilmeDetailsPage]
})
export class MyFilmeDetailsPageModule {}
