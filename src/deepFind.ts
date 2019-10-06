import { Children, ReactNode, ReactElement } from 'react';
import hasComplexChildren from './hasComplexChildren';

interface FindFunction {
  (child: ReactNode, index?: number, children?: ReactNode[]): ReactNode;
}

const deepFind = (children: ReactNode, deepFindFn: FindFunction): ReactNode | undefined => {
  let found;
  Children.toArray(children).find((child) => {
    if (hasComplexChildren(child)) {
      // Find inside the child that has children
      found = deepFind((child as ReactElement).props.children, deepFindFn);
      return typeof found !== 'undefined';
    }
    if (deepFindFn(child)) {
      found = child;
      return true;
    }
    return false;
  });
  return found;
};

export default deepFind;