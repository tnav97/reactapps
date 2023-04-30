import React from 'react';
import { ActionPage, Button } from '@alcumus/components';

export function PrevUrl() {
  return (
    <ActionPage
      header={'Go Back to Previous Page'}
      body={
        'Please complete signup and questionnaire. we will match your needs with the right level of service'
      }
      pageTitle={'Go Back to Previous Page'}
      imgSrc={'/images/bench-with-safety-cap.svg'}
      buttons={
        <>
          <Button onClick={() => window.history.back()}>Go back</Button>
        </>
      }
    />
  );
}
