import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-domain',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css'],
})
export class DomainComponent implements OnInit, OnDestroy {
  // --- FORM DEFINITION ---
  domainForm = new FormGroup({
    action: new FormControl('loadDomains'),
    environment: new FormControl('SYST', Validators.required),
  });

  // --- SEARCH & FILTERING ---
  searchControl = new FormControl('');
  private searchSubscription: Subscription | undefined;

  // Data State
  showTable: boolean = false;
  allDomains: any[] = []; // Full dataset
  filteredDomains: any[] = []; // Filtered by search
  paginatedDomains: any[] = []; // Current page slice

  // Pagination State
  currentPage: number = 1;
  pageSize: number = 10;

  // Row Expansion State
  expandedDomainName: string | null = null;

  // Toast State
  toastVisible: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  toastTimeout: any;

  ngOnInit() {
    // Subscribe to search input changes with a delay
    this.searchSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.filterData();
      });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.loadMockData();
    // Clear search when reloading data
    if (this.allDomains.length === 0) {
      this.showTable = false;
      this.showToast('No data available.', 'error', true);
    } else {
      this.showTable = true;
      this.searchControl.setValue('', { emitEvent: false });
      this.filterData();
    }
  }

  loadMockData() {
    const domains = [];
    for (let i = 2; i <= 25; i++) {
      // Generated more rows to test pagination
      const num = i < 10 ? `0${i}` : `${i}`;
      domains.push({
        name: `S1FD${num}`,
        state: 'Enabled',
      });
    }
    this.allDomains = domains;
  }

  // --- FILTERING LOGIC ---
  filterData() {
    const searchText = (this.searchControl.value || '').toLowerCase();

    if (!searchText) {
      this.filteredDomains = [...this.allDomains];
    } else {
      this.filteredDomains = this.allDomains.filter(
        (d) =>
          d.name.toLowerCase().includes(searchText) ||
          d.state.toLowerCase().includes(searchText)
      );
    }

    this.currentPage = 1;
    this.updatePagination();
  }

  // --- PAGINATION LOGIC ---
  get totalPages(): number {
    return Math.ceil(this.filteredDomains.length / this.pageSize) || 1;
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(
      this.startIndex + this.pageSize,
      this.filteredDomains.length
    );
  }

  updatePagination() {
    this.paginatedDomains = this.filteredDomains.slice(
      this.startIndex,
      this.endIndex
    );
    this.expandedDomainName = null;
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

  // --- ROW ACTIONS ---
  toggleRow(name: string) {
    this.expandedDomainName = this.expandedDomainName === name ? null : name;
  }

  toggleDomainState(domain: any, event: Event) {
    event.stopPropagation();
    const action = domain.state === 'Enabled' ? 'Disable' : 'Enable';

    // Simulate API Latency
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3;

      if (isSuccess) {
        domain.state = domain.state === 'Enabled' ? 'Disabled' : 'Enabled';
        this.showToast(
          `Domain ${domain.name} successfully ${action}d.`,
          'success',
          true
        );
      } else {
        this.showToast(
          `Failed to ${action} ${domain.name}. Please try again.`,
          'error',
          true
        );
      }
    }, 800);
  }

  // --- TOAST LOGIC ---
  showToast(
    message: string,
    type: 'success' | 'error',
    autoClose: boolean = false
  ) {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }

    const display = () => {
      this.toastMessage = message;
      this.toastType = type;
      this.toastVisible = true;

      if (autoClose) {
        this.toastTimeout = setTimeout(() => this.closeToast(), 3000);
      }
    };

    if (this.toastVisible) {
      this.toastVisible = false;
      setTimeout(() => display(), 350);
    } else {
      display();
    }
  }

  closeToast() {
    this.toastVisible = false;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }
  }
}
