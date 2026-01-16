import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SharedTableComponent,
  TableColumn,
} from '../shared-table/shared-table.component';

@Component({
  selector: 'app-domain',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedTableComponent],
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css'],
})
export class DomainComponent {
  // Form State
  action: string = 'loadDomains';
  selectedEnv: string = 'SYST';

  // Table State
  showTable: boolean = false;
  tableData: any[] = [];

  // Column Definitions matching the screenshot
  tableCols: TableColumn[] = [
    { field: 'name', header: 'Name', type: 'text' },
    { field: 'state', header: 'State', type: 'text' },
  ];

  onSubmit() {
    this.showTable = true;
    this.loadMockData();
  }

  loadMockData() {
    // Generates S1FD02 through S1FD15 as seen in the image
    const domains = [];
    for (let i = 2; i <= 15; i++) {
      const num = i < 10 ? `0${i}` : `${i}`;
      domains.push({
        name: `S1FD${num}`,
        state: 'Enabled',
      });
    }
    this.tableData = domains;
  }
}
