import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SharedTableComponent,
  TableColumn,
} from '../shared-table/shared-table.component';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedTableComponent],
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent {
  selectedAction: string = 'requestHistory';
  selectedEnv: string = '';
  selectedApp: string = '';

  isSubmitted: boolean = false;
  showTable: boolean = false;

  tableData: any[] = [];

  // Added 5 new columns as requested
  tableCols: TableColumn[] = [
    { field: 'requestId', header: 'Request ID', type: 'text' },
    { field: 'timestamp', header: 'Timestamp', type: 'text' },
    { field: 'name', header: 'Name', type: 'text' },
    { field: 'status', header: 'Status', type: 'status' },
    { field: 'version', header: 'Version', type: 'text' },
    { field: 'action', header: 'Action', type: 'text' },
    { field: 'domain', header: 'Domain', type: 'text' },
    { field: 'userId', header: 'User ID', type: 'text' },
    // New Columns
    { field: 'duration', header: 'Duration', type: 'text' },
    { field: 'clientIp', header: 'Client IP', type: 'text' },
    { field: 'node', header: 'Node', type: 'text' },
    { field: 'errorCode', header: 'Error Code', type: 'text' },
    { field: 'logId', header: 'Log ID', type: 'text' },
  ];

  onSubmit() {
    this.isSubmitted = true;
    if (this.selectedEnv && this.selectedApp) {
      this.showTable = true;
      this.loadMockData();
    } else {
      this.showTable = false;
    }
  }

  loadMockData() {
    // Generated 15 rows to test pagination (10 per page)
    this.tableData = [
      {
        requestId: '41154',
        timestamp: '2025-08-28 11:36:04',
        name: 'ivr.war',
        status: 'complete',
        version: '1.17.2',
        action: 'install',
        domain: 'S1FD02',
        userId: 'CO73227',
        duration: '45s',
        clientIp: '10.20.1.5',
        node: 'Node-1',
        errorCode: '-',
        logId: 'LOG-101',
      },
      {
        requestId: '40065',
        timestamp: '2025-06-03 19:19:20',
        name: 'ivr.war',
        status: 'complete',
        version: '1.17.3',
        action: 'install',
        domain: 'S1FD02',
        userId: 'CO73227',
        duration: '32s',
        clientIp: '10.20.1.8',
        node: 'Node-2',
        errorCode: '-',
        logId: 'LOG-102',
      },
      {
        requestId: '39972',
        timestamp: '2025-05-29 11:33:42',
        name: 'ivr.war',
        status: 'failed',
        version: '1.17.2',
        action: 'install',
        domain: 'S1FD02',
        userId: 'CO73227',
        duration: '12s',
        clientIp: '10.20.1.5',
        node: 'Node-1',
        errorCode: 'ERR-503',
        logId: 'LOG-103',
      },
      {
        requestId: '39963',
        timestamp: '2025-05-29 09:57:57',
        name: 'ivr.war',
        status: 'complete',
        version: '1.17.1',
        action: 'install',
        domain: 'S1FD02',
        userId: 'CO73227',
        duration: '41s',
        clientIp: '10.20.1.2',
        node: 'Node-3',
        errorCode: '-',
        logId: 'LOG-104',
      },
      {
        requestId: '39129',
        timestamp: '2025-02-14 12:10:23',
        name: 'ivr.war',
        status: 'complete',
        version: '1.17.0',
        action: 'install',
        domain: 'S1FD02',
        userId: 'CO73227',
        duration: '50s',
        clientIp: '10.20.1.5',
        node: 'Node-1',
        errorCode: '-',
        logId: 'LOG-105',
      },
      {
        requestId: '38606',
        timestamp: '2024-12-16 12:36:32',
        name: 'ivr.war',
        status: 'complete',
        version: '1.16.8',
        action: 'install',
        domain: 'S1FD02',
        userId: 'CO71051',
        duration: '38s',
        clientIp: '10.20.1.9',
        node: 'Node-2',
        errorCode: '-',
        logId: 'LOG-106',
      },
      {
        requestId: '38605',
        timestamp: '2024-12-16 12:28:26',
        name: 'ivr.war',
        status: 'complete',
        version: '-',
        action: 'remove',
        domain: 'S1FD02',
        userId: 'CO71051',
        duration: '15s',
        clientIp: '10.20.1.9',
        node: 'Node-2',
        errorCode: '-',
        logId: 'LOG-107',
      },
      {
        requestId: '38598',
        timestamp: '2024-12-16 06:40:29',
        name: 'ivr.war',
        status: 'pending',
        version: '1.16.8',
        action: 'install',
        domain: 'S1FD02',
        userId: 'CO73227',
        duration: 'Pending',
        clientIp: '10.20.1.5',
        node: 'Node-1',
        errorCode: '-',
        logId: 'LOG-108',
      },
      {
        requestId: '37500',
        timestamp: '2024-11-01 08:20:10',
        name: 'ivr.war',
        status: 'complete',
        version: '1.16.7',
        action: 'install',
        domain: 'S1FD02',
        userId: 'CO73227',
        duration: '40s',
        clientIp: '10.20.1.5',
        node: 'Node-1',
        errorCode: '-',
        logId: 'LOG-109',
      },
      {
        requestId: '37499',
        timestamp: '2024-11-01 08:15:00',
        name: 'ivr.war',
        status: 'complete',
        version: '1.16.6',
        action: 'install',
        domain: 'S1FD02',
        userId: 'CO73227',
        duration: '42s',
        clientIp: '10.20.1.5',
        node: 'Node-1',
        errorCode: '-',
        logId: 'LOG-110',
      },
      // Page 2 Data
      {
        requestId: '36001',
        timestamp: '2024-10-15 14:00:22',
        name: 'ivr.war',
        status: 'complete',
        version: '1.16.5',
        action: 'install',
        domain: 'S1FD02',
        userId: 'CO88123',
        duration: '33s',
        clientIp: '10.20.1.1',
        node: 'Node-3',
        errorCode: '-',
        logId: 'LOG-111',
      },
      {
        requestId: '36000',
        timestamp: '2024-10-15 13:55:10',
        name: 'ivr.war',
        status: 'failed',
        version: '1.16.5',
        action: 'install',
        domain: 'S1FD02',
        userId: 'CO88123',
        duration: '10s',
        clientIp: '10.20.1.1',
        node: 'Node-3',
        errorCode: 'ERR-Timeout',
        logId: 'LOG-112',
      },
      {
        requestId: '35999',
        timestamp: '2024-10-10 09:30:00',
        name: 'ivr.war',
        status: 'complete',
        version: '1.16.4',
        action: 'install',
        domain: 'S1FD02',
        userId: 'CO73227',
        duration: '44s',
        clientIp: '10.20.1.5',
        node: 'Node-1',
        errorCode: '-',
        logId: 'LOG-113',
      },
    ];
  }
}
