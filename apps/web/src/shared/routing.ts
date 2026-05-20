import { useEffect, useState } from 'react';

export type Route = { name: 'landing' } | { name: 'showcase'; exampleSlug: string | null };

const DEFAULT_ROUTE: Route = { name: 'landing' };

export function parseHash(hash: string): Route {
  const trimmed = hash.replace(/^#/, '').replace(/^\//, '');
  if (trimmed === '' || trimmed === 'landing') {
    return { name: 'landing' };
  }
  const [head, ...rest] = trimmed.split('/');
  if (head === 'showcase') {
    return { name: 'showcase', exampleSlug: rest[0] ?? null };
  }
  return DEFAULT_ROUTE;
}

export function buildHash(route: Route): string {
  if (route.name === 'landing') return '#/';
  if (route.name === 'showcase') {
    return route.exampleSlug ? `#/showcase/${route.exampleSlug}` : '#/showcase';
  }
  return '#/';
}

export function useRoute(): [Route, (next: Route) => void] {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === 'undefined' ? DEFAULT_ROUTE : parseHash(window.location.hash),
  );

  useEffect(() => {
    function onHashChange() {
      setRoute(parseHash(window.location.hash));
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function navigate(next: Route) {
    const target = buildHash(next);
    if (target !== window.location.hash) {
      window.location.hash = target;
    } else {
      setRoute(next);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  return [route, navigate];
}
