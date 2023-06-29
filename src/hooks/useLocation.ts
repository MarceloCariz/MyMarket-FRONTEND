import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [permissionDenied, setPermissionDenied] = useState(false);

  const ActivateLocationClick = () => {
    if ('geolocation' in navigator && permissionDenied) {
      navigator.geolocation.getCurrentPosition(() => {
        setPermissionDenied(false);
      });
    }
  };

  useEffect(() => {
    console.log(permissionDenied);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setPermissionDenied(false);
        },
        () => {
          setPermissionDenied(true);
        },
      );
    }
  }, [permissionDenied]);

  return {
    permissionDenied,
    ActivateLocationClick,
  };
};
