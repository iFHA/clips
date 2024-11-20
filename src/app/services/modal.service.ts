import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: Array<IModal> = [];

  constructor() { }
  toggleModal(id: string): void {
    const modal = this.modals.find(modal => modal.id === id);
    if(modal) {
      modal.visible = !modal.visible;
    }
  }
  isModalOpen(id: string): boolean {
    return !!this.modals.find(modal => modal.id === id)?.visible;
  }
  register(id: string):void {
    this.modals.push({id, visible: false});
  }
  unregister(id: string):void {
    this.modals = this.modals.filter(element => element.id !== id);
  }
}
