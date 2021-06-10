import React from 'react';

const useRunAfterUpdate = () => {
    const afterPaintRef = React.useRef(null);
    React.useLayoutEffect(() => {
        console.log("in the hook")
      if (afterPaintRef.current) {
          console.log("deeper in the hook")
        afterPaintRef.current();
        afterPaintRef.current = null;
      }
    });
    const runAfterUpdate = fn => (afterPaintRef.current = fn);
    return runAfterUpdate;
  }
export default useRunAfterUpdate;