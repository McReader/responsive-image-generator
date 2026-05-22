import { useCallback, useEffect, useRef } from "react";

export function useObjectUrls() {
  const urlsRef = useRef<Set<string>>(new Set());

  const register = useCallback((url: string) => {
    urlsRef.current.add(url);
    return url;
  }, []);

  const revoke = useCallback((url: string) => {
    URL.revokeObjectURL(url);
    urlsRef.current.delete(url);
  }, []);

  const revokeAll = useCallback(() => {
    for (const url of urlsRef.current) {
      URL.revokeObjectURL(url);
    }
    urlsRef.current.clear();
  }, []);

  useEffect(() => revokeAll, [revokeAll]);

  return { register, revoke, revokeAll };
}
