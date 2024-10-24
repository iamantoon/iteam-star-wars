import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const mockSnackbar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        SnackbarService,
        { provide: MatSnackBar, useValue: mockSnackbar }
      ]
    });

    service = TestBed.inject(SnackbarService);
    snackBarMock = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatSnackBar.open with correct parameters for error()', () => {
    const message = 'An error occurred';
    const action = 'Close';
    const config = {
      duration: 5000,
      panelClass: ['snack-error']
    };

    service.error(message);

    expect(snackBarMock.open).toHaveBeenCalledWith(message, action, config);
  });
});
