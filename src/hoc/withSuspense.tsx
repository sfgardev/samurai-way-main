import { ComponentType, Suspense } from "react";

export const withSuspense = <P,>(Component: ComponentType & any) => {
  return (props: P) => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    );
  };
};
