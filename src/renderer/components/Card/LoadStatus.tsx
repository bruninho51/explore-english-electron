import { ReactElement } from 'react';
import { LoadStatusStyle } from './LoadStatusStyle';
import { SpinnerAnimation } from './SpinnerAnimation';
import { Status } from './Status';
import { ImSpinner } from 'react-icons/im';

export const LoadStatus = ({ statusValue }: { statusValue: string }): ReactElement => {
  const status: any = {
    saved: {
      statusText: 'Saved!',
      color: '#449a56',
      spinner: false
    },
    failed: {
      statusText: 'Failed!',
      color: '#E44352',
      spinner: false
    },
    saving: {
      statusText: 'Saving...',
      color: '#46a3b3',
      spinner: true
    }
  };
  return (
    <LoadStatusStyle color={status[statusValue].color}>
      <Status value={status[statusValue].statusText} />
      {status[statusValue].spinner
        ? <SpinnerAnimation>
          <ImSpinner size={22} />
        </SpinnerAnimation>
        : null }
    </LoadStatusStyle>
  );
};
