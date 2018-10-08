import {
  Component,
  Injector,
  ComponentFactoryResolver,
  ComponentRef,
  NgZone,
  ApplicationRef
} from '@angular/core';
import { wrapComponent } from '@de-re-crud/core';
import { ComponentConstructor } from '@de-re-crud/core/models/constructors';
import { IRenderer } from '@de-re-crud/core/models/renderers';

export interface NgComponentConstructor<P> {
  new (...params: any[]): P & Component;
}

class DynamicComponentLoader<TComponent> {
  private appRef: ApplicationRef;
  private componentFactoryResolver: ComponentFactoryResolver;
  private zone: NgZone;
  private componentRef: ComponentRef<TComponent>;
  private element: Element;

  constructor(
    private injector: Injector,
    private componentConstructor: NgComponentConstructor<TComponent>
  ) {
    this.appRef = injector.get(ApplicationRef);
    this.zone = injector.get(NgZone);
    this.componentFactoryResolver = injector.get(ComponentFactoryResolver);
  }

  loadComponentIfNecessary = (element: Element) => {
    if (typeof this.componentRef !== 'undefined' && this.element === element) {
      return;
    }

    this.zone.run(() => {
      try {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
          this.componentConstructor
        );

        this.componentRef = componentFactory.create(this.injector, [], element);
        this.element = element;
        this.appRef.attachView(this.componentRef.hostView);
      } catch (e) {
        console.error(
          'Unable to load component',
          this.componentConstructor,
          'at',
          element
        );
        throw e;
      }
    });
  };

  refreshComponent = changes => {
    Object.assign(this.componentRef.instance, changes);
    this.componentRef.changeDetectorRef.detectChanges();
  };

  destroyComponent = () => {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  };
}

export function wrapNgComponent<TComponent extends IRenderer>(
  injector: Injector,
  ngComponent: NgComponentConstructor<TComponent>
): ComponentConstructor<TComponent> {
  const dynamicComponentLoader = new DynamicComponentLoader(
    injector,
    ngComponent
  );

  return wrapComponent<TComponent>(
    (props: Readonly<TComponent>, nativeElement: Element) => {
      dynamicComponentLoader.loadComponentIfNecessary(nativeElement);
      dynamicComponentLoader.refreshComponent(props);
      return dynamicComponentLoader.destroyComponent;
    }
  );
}
