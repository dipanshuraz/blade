import React from 'react';
import type { TextInput as TextInputReactNative, View } from 'react-native';

type BladeElementRef = Pick<HTMLElement, 'focus' | 'scrollIntoView'> | Pick<View, 'focus'>;

/**
 * A hook which only exposes the properties of html input element via imparative hook
 *
 * It avoids exposing other native properties of HTMLElement
 * like `style` `classList` to avoid unintended usage of refs.
 */
const useBladeInnerRef = (
  targetRef: React.ForwardedRef<BladeElementRef>,
): React.RefObject<HTMLInputElement | TextInputReactNative> => {
  const innerRef = React.useRef<HTMLInputElement | TextInputReactNative>(null);

  React.useImperativeHandle(
    targetRef,
    (): BladeElementRef => {
      const element = innerRef.current;
      if (element instanceof HTMLElement) {
        return {
          focus: (opts) => element.focus(opts),
          scrollIntoView: (opts) => element.scrollIntoView(opts),
        };
      } else {
        return {
          focus: () => element?.focus(),
        };
      }
    },
    [innerRef],
  );

  return innerRef;
};

export { useBladeInnerRef, BladeElementRef };
