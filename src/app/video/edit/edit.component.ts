import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { ModalService } from '../../services/modal.service';
import IClip from '../../models/clip.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../input/input.component';
import { ClipService } from '../../services/clip.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ModalComponent,
    ReactiveFormsModule,
    InputComponent,
    CommonModule,
    AlertComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  modalId = 'editClip';
  inSubmission = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Updating clip.';

  @Output()
  update = new EventEmitter<IClip>();

  constructor(
    private readonly clipService: ClipService,
    private readonly modalService: ModalService
  ) {}

  @Input()
  activeClip:IClip | null = null;

  clipId = new FormControl('', {
    validators: [
      Validators.required
    ],
    nonNullable: true
  });

  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  });

  editForm = new FormGroup({
    clipId: this.clipId,
    title: this.title
  });

  ngOnInit(): void {
    this.modalService.register(this.modalId);
  }

  ngOnDestroy(): void {
    this.modalService.unregister(this.modalId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.activeClip) {
      return;
    }

    this.inSubmission = false;
    this.showAlert = false;
    this.clipId.setValue(this.activeClip.docId ?? '');
    this.title.setValue(this.activeClip.title);
  }

  async submit() {
    if(!this.activeClip){
      return;
    }
    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Updating clip.';

    const clipId = this.clipId.value;
    const title = this.title.value;
    try {
      await this.clipService.updateClip(clipId, title);
    } catch (err) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong. Try again later';
      return;
    }

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Clip Updated Successfully';

    this.activeClip.title = this.title.value;
    this.update.emit(this.activeClip as IClip);
  }
}
