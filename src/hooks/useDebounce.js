import { useEffect, useState } from "react";

// search: do mỗi lần nhập 1 ký tự sẽ fetch nhiều data nên dùng useDebounce cho có khoảng time để fetch
// debounce hạn chế gọi API requesst liên tục (khi mỗi lần nhập 1 ký tự)
export default function useDebounce(initializeValue = "", delay = 1000) {
  const [debounceValue, setDebounceValue] = useState(initializeValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initializeValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initializeValue]);
  return debounceValue;
}
