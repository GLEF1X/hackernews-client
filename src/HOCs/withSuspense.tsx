import { ComponentType, ReactNode, Suspense } from "react";
import Spinner from "../components/Spinner/Spinner";

export function withSuspense<TProps extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<TProps>,
  fallback?: ReactNode
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  if (!fallback) fallback = <Spinner />;

  const ComponentWithSuspense = function WithSuspense(props: TProps) {
    return (
      <Suspense fallback={fallback}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };

  ComponentWithSuspense.displayName = `withSuspense(${displayName})`;

  return ComponentWithSuspense;
}
