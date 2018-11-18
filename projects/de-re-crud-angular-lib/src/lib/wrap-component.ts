import {
  Component,
  Injector,
  ComponentFactoryResolver,
  ComponentRef,
  ApplicationRef,
  EmbeddedViewRef
} from '@angular/core';
import { wrapComponent } from '@de-re-crud/core';
import { ComponentConstructor } from '@de-re-crud/core/models/constructors';
import { IRenderer } from '@de-re-crud/core/models/renderers';

interface IComponentCache {
  [rendererId: string]: any;
}

export interface INgComponentConstructor<P> {
  new (...params: any[]): P & Component;
}

const cache: IComponentCache = {};

class DynamicComponentLoader<TComponent> {
  private appRef: ApplicationRef;
  private componentFactoryResolver: ComponentFactoryResolver;
  private componentRef: ComponentRef<TComponent>;

  constructor(
    private injector: Injector,
    private componentConstructor: INgComponentConstructor<TComponent>,
    private onDestroy: () => void
  ) {
    this.appRef = injector.get(ApplicationRef);
    this.componentFactoryResolver = injector.get(ComponentFactoryResolver);
  }

  initializeComponenet = (element: Element, inputs: any) => {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.componentConstructor
    );

    this.componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(this.componentRef.hostView);

    const componentView = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    element.appendChild(componentView);
  };

  updateInputs = (inputs: any) => {
    if (!this.componentRef) {
      return;
    }

    Object.keys(inputs).forEach(key => {
      this.componentRef.instance[key] = inputs[key];
    });

    this.componentRef.changeDetectorRef.detectChanges();
  };

  renderComponent = (element: Element, inputs: any) => {
    if (!this.componentRef) {
      this.initializeComponenet(element, inputs);
    }

    this.updateInputs(inputs);
  };

  destroyComponent = () => {
    this.onDestroy();

    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  };
}

export function wrapNgComponent<TComponent extends IRenderer>(
  injector: Injector,
  ngComponent: INgComponentConstructor<TComponent>
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
          () => {
            delete cache[props.rendererId];
          }
        );

        cache[props.rendererId] = dynamicComponentLoader;
      }

      dynamicComponentLoader.renderComponent(nativeElement, props);
      return dynamicComponentLoader.destroyComponent;
    }
  );
}
