import { Component, Input } from '@angular/core';

@Component({
  selector: 'share-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

  @Input()
  public text: string = 'Loading...';

}
