import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Use wake lock screen
 * {@link https://web.dev/wake-lock}
 * @returns {{
 *   isSupported: boolean;
 *   enableWakeLock: () => Promise<void>;
 *   disableWakeLock: () => Promise<void>;
 *   isEnabled: boolean;
 * }} Returns
 */
export default function useWakeLock() {
  /** Is wake lock enable */
  const [isEnabled, setIsEnabled] = useState(false);

  /** @type {MutableRefObject<WakeLockSentinel>} Wake lock ref */
  const wakeLock = useRef(null);

  /** Is wake lock API supported */
  const isSupported = useMemo(
    () => typeof window !== "undefined" && "wakeLock" in navigator,
    []
  );

  /** On release callback */
  const onRelease = useCallback(() => {
    wakeLock.current = null;
  }, []);

  /** Enable wake lock */
  const enableWakeLock = useCallback(async () => {
    if (!isSupported || wakeLock.current) return;

    try {
      wakeLock.current = await navigator.wakeLock.request("screen");
      setIsEnabled(true);
      wakeLock.current.addEventListener("release", onRelease);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [isSupported, onRelease]);

  /** Disable wake lock */
  const disableWakeLock = useCallback(async () => {
    if (!isSupported || !wakeLock.current) return;

    try {
      await wakeLock.current.release();
      setIsEnabled(false);
      wakeLock.current?.removeEventListener("release", onRelease);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [isSupported, onRelease]);

  // Remove listener on wakeLock when unmount
  useEffect(
    () => () => {
      wakeLock.current?.removeEventListener("release", onRelease);
    },
    [onRelease]
  );

  // Handle listener when page is going back visible
  useEffect(() => {
    const onVisibilitychange = async () => {
      if (isEnabled && document.visibilityState === "visible")
        await enableWakeLock();
    };

    document.addEventListener("visibilitychange", onVisibilitychange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilitychange);
    };
  }, [isEnabled, enableWakeLock]);

  return {
    isSupported,
    enableWakeLock,
    disableWakeLock,
    isEnabled,
  };
}
