import React, { useEffect } from 'react';

const SCRIPT_ID = 'applause-button-script';

const ApplauseButton = (props) => {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) {
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = route('applause-button');
    script.async = true;
    document.body.appendChild(script);

  }, []);

  return <applause-button {...props}></applause-button>;
};

export default ApplauseButton; 
