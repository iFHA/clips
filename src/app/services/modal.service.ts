import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private visible = false;

  constructor() { }
  toggleModal(): void {
    this.visible = !this.visible;
  }
  isModalOpen(): boolean {
    return this.visible;
  }
}
