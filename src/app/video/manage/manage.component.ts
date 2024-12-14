import { FileUploadService } from './../../services/file-upload.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipService } from '../../services/clip.service';
import IClip from '../../models/clip.model';
import { EditComponent } from '../edit/edit.component';
import { ModalService } from '../../services/modal.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, EditComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  videoOrder = '1';
  clips:IClip[] = [];
  activeClip: IClip | null = null;
  sort$: BehaviorSubject<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly clipService: ClipService,
    private readonly modal: ModalService
  ) {
    this.sort$ = new BehaviorSubject(this.videoOrder);
    this.clipService.getUserClips(this.sort$).subscribe(clips => this.clips = clips);

    this.route.queryParamMap.subscribe(async paramMap => {
      const order = paramMap.get('sort') ?? '1';
      this.sort$.next(order);
      // this.clips = await this.clipService.getUserClips(this.videoOrder);
    });
  }

  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {sort: value}
    });
  }

  openModal(event: Event, clip: IClip) {
    event.preventDefault();
    this.activeClip = clip;
    this.modal.toggleModal('editClip');
  }

  handleClipUpdate(clipUpdated: IClip) {
    const clip = this.clips.find(clip=>clip.docId === clipUpdated.docId);
    if(clip) {
      clip.title = clipUpdated.title;
    }
  }

  async deleteClip(event: Event, clip: IClip) {
    event.preventDefault();
    await this.clipService.deleteClip(clip);
    this.clips = this.clips.filter(clipNotToDelete => clip.docId !== clipNotToDelete.docId);
  }
}
