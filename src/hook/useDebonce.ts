import { useEffect, useState } from "react";

function useDebounce({value, delay}: any){
  const [debouncedValue, setDebouncedValue]: any = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
