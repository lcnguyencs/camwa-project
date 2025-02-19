import { TestBed } from '@angular/core/testing';
import { WebRequestService } from './web-request.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WebRequestService', () => {
  let service: WebRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
