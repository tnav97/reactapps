import { useEffect } from 'react';

/**
 * A custom hook to execute a function at a given timeout
 * @param fn Function to execute at a timeout
 * @param timeout timeout in milliseconds
 * @param dependencies Optional array of dependencies for the underlying effect that will execute timed out function
 */
export default function useTimeout(fn, timeout, dependencies) {
  useEffect(() => {
    const id = setTimeout(fn, timeout);
    return () => {
      clearTimeout(id);
    };
  }, dependencies);
}
