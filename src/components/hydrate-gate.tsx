import { useEffect, type ReactNode } from "react";
import { useFinanceStore } from "@/lib/store";

export function HydrateGate({ children }: { children: ReactNode }) {
  const hydrated = useFinanceStore((s) => s.hydrated);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) useFinanceStore.getState().setHydrated();
    };
    try {
      const result = useFinanceStore.persist.rehydrate();
      void Promise.resolve(result).then(finish, finish);
    } catch {
      finish();
    }
    return () => {
      cancelled = true;
    };
  }, []);

  if (!hydrated) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="font-ethiopic text-lg text-muted">ሂሳብ</p>
      </div>
    );
  }

  return <>{children}</>;
}
