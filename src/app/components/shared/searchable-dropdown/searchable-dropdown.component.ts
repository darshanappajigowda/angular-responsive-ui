import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export interface DropdownOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-searchable-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableDropdownComponent),
      multi: true,
    },
  ],
})
export class SearchableDropdownComponent implements ControlValueAccessor {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder = 'Select...';
  @Input() searchPlaceholder = 'Search...';
  @Input() hasError = false;
  @Input() disabled = false;
  /** Maximum number of items visible before scrolling kicks in */
  @Input() maxVisibleItems = 12;

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  isOpen = false;
  searchTerm = '';
  selectedValue = '';
  highlightedIndex = -1;

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef) {}

  get filteredOptions(): DropdownOption[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.options;
    return this.options.filter((opt) => opt.label.toLowerCase().includes(term));
  }

  get selectedLabel(): string {
    return (
      this.options.find((opt) => opt.value === this.selectedValue)?.label ?? ''
    );
  }

  writeValue(value: string): void {
    this.selectedValue = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** Called when the user clicks the closed trigger area or the chevron */
  toggleDropdown(): void {
    if (this.disabled) return;
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    this.isOpen = true;
    this.searchTerm = '';
    this.highlightedIndex = -1;
    // Focus the search input now that the trigger has morphed into one
    setTimeout(() => {
      this.searchInput?.nativeElement.focus();
      this.searchInput?.nativeElement.select();
    }, 0);
  }

  closeDropdown(): void {
    this.isOpen = false;
    this.searchTerm = '';
    this.onTouched();
  }

  selectOption(option: DropdownOption): void {
    this.selectedValue = option.value;
    this.onChange(option.value);
    this.closeDropdown();
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.highlightedIndex = this.filteredOptions.length > 0 ? 0 : -1;
  }

  setHighlight(index: number): void {
    this.highlightedIndex = index;
  }

  onKeyDown(event: KeyboardEvent): void {
    const filtered = this.filteredOptions;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (filtered.length === 0) return;
        this.highlightedIndex =
          this.highlightedIndex < filtered.length - 1
            ? this.highlightedIndex + 1
            : 0;
        this.scrollHighlightedIntoView();
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (filtered.length === 0) return;
        this.highlightedIndex =
          this.highlightedIndex > 0
            ? this.highlightedIndex - 1
            : filtered.length - 1;
        this.scrollHighlightedIntoView();
        break;

      case 'Enter':
        event.preventDefault();
        if (
          this.highlightedIndex >= 0 &&
          this.highlightedIndex < filtered.length
        ) {
          this.selectOption(filtered[this.highlightedIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        break;

      case 'Tab':
        // Let Tab close the dropdown naturally and move focus
        this.closeDropdown();
        break;
    }
  }

  /** Stop chevron clicks from re-focusing the input mid-toggle */
  onChevronClick(event: MouseEvent): void {
    event.stopPropagation();
    this.toggleDropdown();
  }

  private scrollHighlightedIntoView(): void {
    setTimeout(() => {
      const el = this.elementRef.nativeElement.querySelector(
        '.dropdown-option.highlighted',
      ) as HTMLElement | null;
      el?.scrollIntoView({ block: 'nearest' });
    }, 0);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (
      this.isOpen &&
      !this.elementRef.nativeElement.contains(event.target as Node)
    ) {
      this.closeDropdown();
    }
  }
}
