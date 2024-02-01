import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { sortBy } from 'lodash';
import { SelectDropDownService } from 'ngx-select-dropdown';

@Component({
  selector: 'dbs-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss'],
})
export class SelectDropdownComponent implements OnInit, OnChanges {
  @ViewChild('selectDropdown') selectDropdown;

  @Input() multiSelect: any = [];
  @Input() options: any = [];
  @Input() config: any = {};
  @Input() defaultValue: any = {};
  @Input() isArrow: boolean = true;
  @Input() isSearchHidden: boolean = false;
  @Input() isWidthFull: boolean = false;
  @Input() id = '';
  @Input() isArrowArray: boolean = false;
  @Input() isArrayPlaceHolder: boolean = false;

  @Output() onSelected = new EventEmitter();
  @Output() onSearch = new EventEmitter();
  @Output() isOpen = new EventEmitter();
  @Output() isClose = new EventEmitter();

  selected = '';
  isPlaceholder: boolean = true;
  constructor(private _dropdownService: SelectDropDownService) {
    // do nothing
  }

  ngOnChanges(): void {
    if (this.options && this.options?.length > 0) {
      if (this.defaultValue?.id > 0) {
        this.selected = this.defaultValue;
        this.isPlaceholder = false;
        const hoverIcon = document.querySelector('div.icon') as HTMLElement;
        if (hoverIcon) {
          hoverIcon.classList.add('bg-filter');
          hoverIcon.innerHTML = `<img src="assets/icons/filter-white.svg" alt="" />`;
        }
      }
      this.changeColorText();
    }
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.isArrow) {
        this.getIconDropDown();
      }
      if (this.isArrowArray) {
        this.getIconDropDownForArray();
      }
      if (this.isWidthFull) {
        this.isFullWidth();
      }
    }, 200);
    this.changeColorText();
  }

  getIconSearch() {
    const iconSearch = document.querySelector('div.search-container label') as HTMLElement;
    iconSearch.innerHTML = `<img src="assets/icons/search-icon.svg" alt="" />`;
  }

  getIconDropDown() {
    const iconDropDown = document.querySelector('button.ngx-dropdown-button span.nsdicon-angle-down') as HTMLElement;
    iconDropDown.innerHTML = `<img src="assets/icons/down-black.svg" alt="" />`;
  }

  getIconDropDownForArray() {
    const iconDropDown = document.querySelector(`#${this.id} button.ngx-dropdown-button span.nsdicon-angle-down`) as HTMLElement;
    iconDropDown.innerHTML = `<img src="assets/icons/down-black.svg" alt="" />`;
  }

  isFullWidth() {
    const isWidthFull = document.querySelector(`#${this.id} div.ngx-dropdown-container`);
    isWidthFull?.classList.add('custom-select-dropdown-full-width');
  }

  searchChange(e) {
    this.onSearch.emit(e);
  }

  onChange(e) {
    if (this.isArrow) {
      const spanUp = document.querySelector('span.nsdicon-angle-down');
      spanUp.innerHTML = `<img src="assets/icons/down-black.svg" alt="" />`;
    }
    if (this.isArrowArray) {
      const spanUp = document.querySelector(`#${this.id} span.nsdicon-angle-down`);
      spanUp.innerHTML = `<img src="assets/icons/down-black.svg" alt="" />`;
    }
    this.isPlaceholder = false;
    this.changeColorText();
    if (!this.isPlaceholder && !this.isArrow) {
      const hoverIcon = document.querySelector('div.icon') as HTMLElement;
      hoverIcon?.classList.add('bg-filter');
      hoverIcon.innerHTML = `<img src="assets/icons/filter-white.svg" alt="" />`;
    }
    this.onSelected.emit(e);
    this.selectDropdown.availableItems = sortBy(this.selectDropdown.availableItems, ['id'], ['asc']);
  }

  openDropDown() {
    setTimeout(() => {
      this.getIconSearch();
      if (this.isSearchHidden) {
        const searchSection = document.querySelector('div.search-container');
        searchSection?.classList.add('search-hidden');
      }
    }, 0.5);
    if (this.isArrow) {
      const spanDown = document.querySelector('span.nsdicon-angle-down');
      spanDown.innerHTML = `<img src="assets/icons/up-black.svg" alt="" />`;
      this.isOpen.emit(this.isArrow);
    }
    if (this.isArrowArray) {
      setTimeout(() => {
        const spanDown = document.querySelector(`#${this.id} span.nsdicon-angle-down`);
        spanDown.innerHTML = `<img src="assets/icons/up-black.svg" alt="" />`;
        this.isOpen.emit(this.isArrowArray);
      }, 100);
    }
    if (this.isPlaceholder) {
      const filterHover = document.querySelector('div.icon') as HTMLElement;
      if (filterHover) {
        filterHover?.classList.add('extend');
      }
    }
  }

  closeDropDown() {
    if (this.isArrow) {
      const spanUp = document.querySelector('span.nsdicon-angle-down');
      spanUp.innerHTML = `<img src="assets/icons/down-black.svg" alt="" />`;
      this.isClose.emit(this.isArrow);
    }
    if (this.isArrowArray) {
      const spanUp = document.querySelector(`#${this.id} span.nsdicon-angle-down`);
      spanUp.innerHTML = `<img src="assets/icons/down-black.svg" alt="" />`;
      this.isClose.emit(this.isArrowArray);
    }
    if (this.isPlaceholder && !this._dropdownService.isOpen) {
      const filterHover = document.querySelector('div.extend  ') as HTMLElement;
      if (filterHover) {
        filterHover?.classList.remove('extend');
      }
    }
  }

  changeColorText() {
    setTimeout(() => {
      if (!this.isArrowArray) {
        const button = document.querySelector('span.display-text') as HTMLButtonElement;
        if (button) {
          if (this.isPlaceholder) {
            button.classList.add('color-d2');
          } else {
            button.classList.remove('color-d2');
          }
        }
      }
    }, 100);
    setTimeout(() => {
      if (this.isArrowArray) {
        const buttonArray = document.querySelectorAll(`#${this.id} span.display-text`);
        if (buttonArray) {
          buttonArray.forEach(item => {
            if (this.isPlaceholder) {
              item.classList.add('color-d2');
            } else {
              item.classList.remove('color-d2');
            }
          });
        }
      }
    }, 300);
  }
}
