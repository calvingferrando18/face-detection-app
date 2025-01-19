import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImageHistoryComponent } from './components/image-history/image-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    CommonModule,
    NgbNavModule,
    HttpClientModule,
    HeaderComponent,
    ImageUploadComponent,
    ImageHistoryComponent
  ],
  providers: [AppService],
})
export class AppComponent {
  active = 1;
}
