import React from 'react';
import { ActionPage, Button } from '@alcumus/components';

export function NotFound() {
  return (
    <ActionPage
      header={'Page Not Found'}
      body={
        'Looks like the page you are looking for cannot be found. Please ensure the URL you are browsing to is correct.'
      }
      pageTitle={'Page Not Found'}
      imgSrc={'/images/bench-with-safety-cap.svg'}
      buttons={
        <>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </>
      }
    />
  );
}
