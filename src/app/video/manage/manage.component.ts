import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  videoOrder = '1';
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe(paramMap => this.videoOrder = paramMap.get('sort') ?? '1');
  }
  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {sort: value}
    });
  }
}
