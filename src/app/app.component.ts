import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  // specifies the template string for the Multiselect component with dataSource
  template: `<ejs-multiselect  id='customers2' formControlName="skillname" name="skillname" #remote2 [dataSource]='data | async'  [fields]='remoteFields' [placeholder]='remoteWaterMark' ></ejs-multiselect >`,
})
export class AppComponent {
  constructor(private http: HttpClient) {
    this.data = this.http
      .get<{ [key: string]: object }[]>(
        'https://services.odata.org/V4/Northwind/Northwind.svc/Customers'
      )
      .pipe(
        map((results: { [key: string]: any }) => {
          return results['value'];
        })
      );
  }

  public data: Observable<any>;

  // maps the remote data column to fields property
  public remoteFields: Object = { value: 'CustomerID' };

  // set the placeholder to Multiselect input element
  public remoteWaterMark: string = 'Select a customer';
}
