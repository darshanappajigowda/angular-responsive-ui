import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators, // Added for consistency even if not explicitly required by previous logic
} from '@angular/forms';
import {
  SharedTableComponent,
  TableColumn,
} from '../shared-table/shared-table.component';

@Component({
  selector: 'app-domain',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedTableComponent],
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css'],
})
export class DomainComponent {
  // --- FORM DEFINITION ---
  domainForm = new FormGroup({
    action: new FormControl('loadDomains'),
    environment: new FormControl('SYST', Validators.required),
  });

  // Table State
  showTable: boolean = false;
  tableData: any[] = [];

  // Column Definitions
  tableCols: TableColumn[] = [
    { field: 'name', header: 'Name', type: 'text' },
    { field: 'state', header: 'State', type: 'text' },
  ];

  onSubmit() {
    this.showTable = true;
    this.loadMockData();
  }

  loadMockData() {
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
