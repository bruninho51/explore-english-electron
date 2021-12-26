import { ReactElement } from 'react';
import { EmptyListIcon } from './EmptyListIcon';
import { PhrasalListContainerNoContent } from './PhrasalListContainerNoContent';

export const NoContent = (): ReactElement => {
  return (
    <PhrasalListContainerNoContent>
      <EmptyListIcon />
    </PhrasalListContainerNoContent>
  );
};
