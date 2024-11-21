import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-clip',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css'
})
export class ClipComponent {
  id = '';
  constructor(public route: ActivatedRoute) {
    this.route.paramMap.subscribe(map => this.id = map.get('id') ?? '');
  }
}
