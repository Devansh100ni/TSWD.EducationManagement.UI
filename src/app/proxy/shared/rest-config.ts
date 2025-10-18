import { HttpHeaders } from '@angular/common/http';

export interface RestConfig {
  apiBaseUrl?: string;
  headers?: HttpHeaders;
}
