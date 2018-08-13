import { FormHostDirective } from './form-host.directive';

describe('FormHostDirective', () => {
  it('should create an instance', () => {
    const viewContainerRef: any = {};
    const directive = new FormHostDirective(viewContainerRef);
    expect(directive).toBeTruthy();
  });
});
