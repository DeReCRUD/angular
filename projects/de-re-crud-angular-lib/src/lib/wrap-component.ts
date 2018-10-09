import {
  Component,
  Injector,
  ComponentFactoryResolver,
  ComponentRef,
  NgZone,
  ApplicationRef,
  EmbeddedViewRef
} from '@angular/core';
import { wrapComponent } from '@de-re-crud/core';
import { ComponentConstructor } from '@de-re-crud/core/models/constructors';
import { IRenderer } from '@de-re-crud/core/models/renderers';

interface IComponentCache {
  [rendererId: string]: any;
}

export interface NgComponentConstructor<P> {
  new (...params: any[]): P & Component;
}

const cache: IComponentCache = {};

class DynamicComponentLoader<TComponent> {
  private appRef: ApplicationRef;
  private componentFactoryResolver: ComponentFactoryResolver;
  private zone: NgZone;
  private componentRef: ComponentRef<TComponent>;
  private element: Element;

  constructor(
    private injector: Injector,
    private componentConstructor: NgComponentConstructor<TComponent>,
    private rendererId: string
  ) {
    cache[rendererId] = this;

    this.appRef = injector.get(ApplicationRef);
    this.zone = injector.get(NgZone);
    this.componentFactoryResolver = injector.get(ComponentFactoryResolver);
  }

  renderComponent = (element: Element, inputs: any) => {
    if (typeof this.componentRef !== 'undefined' && this.element === element) {
      this.refreshComponent(inputs);
      return;
    }

    this.zone.run(() => {
      try {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
          this.componentConstructor
        );

        this.componentRef = componentFactory.create(this.injector);
        this.element = element;
        this.appRef.attachView(this.componentRef.hostView);

        const componentElement = (this.componentRef.hostView as EmbeddedViewRef<
          any
        >).rootNodes[0] as HTMLElement;

        this.element.appendChild(componentElement);
        this.refreshComponent(inputs);
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

  refreshComponent = inputs => {
    Object.assign(this.componentRef.instance, inputs);
    this.componentRef.changeDetectorRef.detectChanges();
  };

  destroyComponent = () => {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }

    delete cache[this.rendererId];
  };
}

export function wrapNgComponent<TComponent extends IRenderer>(
  injector: Injector,
  ngComponent: NgComponentConstructor<TComponent>
): ComponentConstructor<TComponent> {
  return wrapComponent<TComponent>(
    (props: Readonly<TComponent>, nativeElement: Element) => {
      let dynamicComponentLoader: DynamicComponentLoader<TComponent> = cache[
        props.rendererId
      ] as DynamicComponentLoader<TComponent>;

      if (!dynamicComponentLoader) {
        dynamicComponentLoader = new DynamicComponentLoader(
          injector,
          ngComponent,
          props.rendererId
        );
      }

      dynamicComponentLoader.renderComponent(nativeElement, props);
      return dynamicComponentLoader.destroyComponent;
    }
  );
}
