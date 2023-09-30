import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'share-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent{

  @Input()
  public placeholder: string = '';

  @Input()
  public value: string = '';

  @Output()
  public onvalue = new EventEmitter<string>();



  emitValue(value: string): void {
    this.onvalue.emit(value);
  }

}
