import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AuthRequest {
  id: string;
  user: string;
  role: string;
  environment: string;
  action: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  description?: string;
}

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent {
  // Form Filters
  // selectedStatus removed since we only show Pending
  selectedEnv: string = '';

  // State
  isSubmitted: boolean = false;
  showTable: boolean = false;
  expandedRequestId: string | null = null;
  searchText: string = '';

  // Data Containers
  authRequests: AuthRequest[] = [];
  filteredRequests: AuthRequest[] = [];
  paginatedRequests: AuthRequest[] = [];

  // Pagination State
  currentPage: number = 1;
  pageSize: number = 10;

  // --- TOAST STATE ---
  toastVisible: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';

  onSubmit() {
    this.isSubmitted = true;
    this.showTable = true;
    this.currentPage = 1;
    this.searchText = '';

    // Simulate Fetching Data (Only Pending items)
    this.authRequests = [
      {
        id: 'REQ-9001',
        user: 'CO73227',
        role: 'DevOps Lead',
        environment: 'PROD',
        action: 'Deploy ivr.war',
        requestDate: '2025-09-01 10:00',
        status: 'Pending',
      },
      {
        id: 'REQ-9002',
        user: 'CO71051',
        role: 'Developer',
        environment: 'UAT',
        action: 'Restart Server',
        requestDate: '2025-09-01 11:30',
        status: 'Pending',
      },
      {
        id: 'REQ-9005',
        user: 'CO88123',
        role: 'Architect',
        environment: 'SYST',
        action: 'Clear Cache',
        requestDate: '2025-09-01 12:00',
        status: 'Pending',
      },
      {
        id: 'REQ-9006',
        user: 'CO73227',
        role: 'DevOps Lead',
        environment: 'PROD',
        action: 'Scale Down',
        requestDate: '2025-09-01 12:15',
        status: 'Pending',
      },
      {
        id: 'REQ-9007',
        user: 'CO71051',
        role: 'Developer',
        environment: 'UAT',
        action: 'Update Config',
        requestDate: '2025-09-01 13:00',
        status: 'Pending',
      },
      {
        id: 'REQ-9008',
        user: 'CO88123',
        role: 'Architect',
        environment: 'SYST',
        action: 'Restart DB',
        requestDate: '2025-09-01 13:30',
        status: 'Pending',
      },
      {
        id: 'REQ-9009',
        user: 'CO73227',
        role: 'DevOps Lead',
        environment: 'PROD',
        action: 'Deploy claims.ear',
        requestDate: '2025-09-01 14:00',
        status: 'Pending',
      },
      {
        id: 'REQ-9010',
        user: 'CO71051',
        role: 'Developer',
        environment: 'UAT',
        action: 'Reset Pwd',
        requestDate: '2025-09-01 14:15',
        status: 'Pending',
      },
      {
        id: 'REQ-9011',
        user: 'CO88123',
        role: 'Architect',
        environment: 'SYST',
        action: 'Archive Logs',
        requestDate: '2025-09-01 14:30',
        status: 'Pending',
      },
      {
        id: 'REQ-9012',
        user: 'CO73227',
        role: 'DevOps Lead',
        environment: 'PROD',
        action: 'Deploy ui.war',
        requestDate: '2025-09-01 15:00',
        status: 'Pending',
      },
      {
        id: 'REQ-9013',
        user: 'CO71051',
        role: 'Developer',
        environment: 'UAT',
        action: 'Test Connection',
        requestDate: '2025-09-01 15:30',
        status: 'Pending',
      },
    ];

    this.filterData();
  }

  // --- SEARCH LOGIC ---
  filterData() {
    let tempRequests = this.authRequests;

    // Filter by Environment (if selected)
    if (this.selectedEnv) {
      tempRequests = tempRequests.filter(
        (req) => req.environment === this.selectedEnv
      );
    }

    // Filter by Search Text
    if (this.searchText) {
      const lowerSearch = this.searchText.toLowerCase();
      tempRequests = tempRequests.filter(
        (req) =>
          req.id.toLowerCase().includes(lowerSearch) ||
          req.user.toLowerCase().includes(lowerSearch) ||
          req.action.toLowerCase().includes(lowerSearch) ||
          req.environment.toLowerCase().includes(lowerSearch)
      );
    }

    this.filteredRequests = tempRequests;
    this.currentPage = 1;
    this.updatePagination();
  }

  // --- PAGINATION LOGIC ---
  get totalPages(): number {
    return Math.ceil(this.filteredRequests.length / this.pageSize) || 1;
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(
      this.startIndex + this.pageSize,
      this.filteredRequests.length
    );
  }

  updatePagination() {
    this.paginatedRequests = this.filteredRequests.slice(
      this.startIndex,
      this.endIndex
    );
    this.expandedRequestId = null;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // --- ACTIONS ---
  toggleRow(id: string) {
    this.expandedRequestId = this.expandedRequestId === id ? null : id;
  }

  approve(req: AuthRequest, event: Event) {
    event.stopPropagation();
    this.showToast(`Request ${req.id} has been Approved`, 'success');
    this.removeRequest(req.id);
  }

  reject(req: AuthRequest, event: Event) {
    event.stopPropagation();
    this.showToast(`Request ${req.id} has been Rejected`, 'error');
    this.removeRequest(req.id);
  }

  removeRequest(id: string) {
    setTimeout(() => {
      this.authRequests = this.authRequests.filter((r) => r.id !== id);
      this.filterData();
    }, 300);
  }

  showToast(message: string, type: 'success' | 'error') {
    if (this.toastVisible) {
      // 1. If visible, hide it first (triggers CSS exit animation)
      this.toastVisible = false;

      // 2. Wait for the exit animation (300ms) to finish
      setTimeout(() => {
        this.toastMessage = message;
        this.toastType = type;
        this.toastVisible = true; // Slide back in
      }, 350); // 350ms ensures the CSS transition (0.3s) is fully complete
    } else {
      // 3. If not visible, show immediately
      this.toastMessage = message;
      this.toastType = type;
      this.toastVisible = true;
    }
  }

  closeToast() {
    this.toastVisible = false;
  }
}
