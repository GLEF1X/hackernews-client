import React, { Suspense } from "react";
import NewsList from "../../components/NewsList/NewsList";
import Spinner from "../../components/Spinner/Spinner";
import { ErrorBoundary } from "react-error-boundary";

export default function HomePage() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Suspense fallback={<Spinner />}>
        <NewsList />
      </Suspense>
    </ErrorBoundary>
  );
}
