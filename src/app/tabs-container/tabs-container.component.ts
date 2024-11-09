import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs-container.component.html',
  styleUrl: './tabs-container.component.css'
})
export class TabsContainerComponent implements AfterContentInit {
  @ContentChildren(TabComponent)
  tabs:QueryList<TabComponent> = new QueryList();

  ngAfterContentInit(): void {
    const activeTabs = this.tabs.filter(tab => tab.active);

    // se não houver tab ativa
    if(!activeTabs || activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  selectTab(tab: TabComponent): false {
    this.tabs.forEach(tab => tab.active = false);
    tab.active = true;
    return false;
  }
  getTabClasses(tab: TabComponent) {
    return {
      'hover:text-indigo-400': !tab.active,
      'hover:text-white text-white bg-indigo-400': tab.active
    };
  }
}
