import React from 'react';
import { ActionPage, Button } from '@alcumus/components';

export function Forbidden() {
  return (
    <ActionPage
      header={'Forbidden'}
      pageTitle={'Forbidden'}
      imgSrc={'/images/bench-with-safety-cap.svg'}
      buttons={
        <>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </>
      }
    />
  );
}
