import { useCallback, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import PageError from '@/pages/sys/error/PageError';
import { useUserToken } from '@/store/userStore';

import { useRouter } from '../hooks';

type Props = {
  children: React.ReactNode;
};
export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { token, tokenExpires } = useUserToken();
  const check = useCallback(() => {
    if (!token) {
      // check tokend expired
      if (tokenExpires && tokenExpires < Date.now()) {
        router.replace('/login');
      }
      router.replace('/login');
    }
  }, [router, token, tokenExpires]);

  useEffect(() => {
    check();
  }, [check]);

  return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
}
