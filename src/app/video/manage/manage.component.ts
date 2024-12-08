import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipService } from '../../services/clip.service';
import IClip from '../../models/clip.model';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  videoOrder = '1';
  clips:IClip[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly clipService: ClipService
  ) {
    this.route.queryParamMap.subscribe(async paramMap => {
      this.videoOrder = paramMap.get('sort') ?? '1';
      this.clips = await this.clipService.getUserClips(this.videoOrder);
    });
  }
  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {sort: value}
    });
  }
}
