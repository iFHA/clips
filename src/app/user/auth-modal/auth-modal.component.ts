import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalComponent } from "../../modal/modal.component";
import { ModalService } from '../../services/modal.service';
import { TabsContainerComponent } from "../../tabs-container/tabs-container.component";
import { TabComponent } from '../../tab/tab.component';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [ModalComponent, TabsContainerComponent, TabComponent],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css'
})
export class AuthModalComponent implements OnInit, OnDestroy {
  modalId = 'auth';
  constructor(public modal: ModalService) {
  }
  ngOnInit(): void {
    this.modal.register(this.modalId);
  }
  ngOnDestroy(): void {
    this.modal.unregister(this.modalId);
  }
}
