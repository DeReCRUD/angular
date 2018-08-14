import {
  Component,
  Injector,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';
import { wrapComponent } from '@de-re-crud/core';
import { ComponentConstructor } from '@de-re-crud/core/models/constructors';
import { IRenderer } from '@de-re-crud/core/models/renderers';

interface IComponentCache {
  [rendererId: string]: any;
}

const cache: IComponentCache = {};

export interface NgComponentConstructor<P> {
  new (...params: any[]): P & Component;
}

export function wrapNgComponent<TComponent extends IRenderer>(
  factory: ComponentFactoryResolver,
  injector: Injector,
  ngComponent: NgComponentConstructor<TComponent>
): ComponentConstructor<TComponent> {
  const componentFactoryResolver = factory.resolveComponentFactory(ngComponent);

  return wrapComponent<TComponent>((props: Readonly<TComponent>, nativeElement: Element) => {
      let component: ComponentRef<TComponent> = cache[props.rendererId] as ComponentRef<TComponent>;

      if (!component) {
        component = componentFactoryResolver.create(
          injector,
          [],
          nativeElement
        );

        cache[props.rendererId] = component;
      }

      Object.assign(component.instance, props);
      component.changeDetectorRef.detectChanges();

      return () => {
        delete cache[component.instance.rendererId];
        component.destroy();
      };
    }
  );
}
