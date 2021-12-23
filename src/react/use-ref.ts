import { useRef, useCallback } from 'react';

function useHookWithRefCallback<El extends HTMLElement>(
  added: (el: El) => void,
  removed: (el: El) => void
) {
  const ref = useRef<El>(null);

  const setRef = useCallback((node: El) => {
    if (ref.current) {
      // Make sure to cleanup any events/references added to the last instance
      removed(ref.current);
    }

    // Save a reference to the node
    ref.current = node;

    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
      added(node);
    }
  }, []);

  return setRef;
}
