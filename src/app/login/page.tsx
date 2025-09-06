
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem, Facebook } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const GoogleIcon = () => <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.3 64.5c-24.5-23.4-58.3-38.2-96.6-38.2-87.5 0-159.2 71.7-159.2 159.2s71.7 159.2 159.2 159.2c94.3 0 135.3-65.6 140.8-103.9H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>;

export default function LoginPage() {
  const { user, loading, signInWithGoogle, signInWithFacebook } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center gap-2">
            <Gem className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline">System Ascent</h1>
          </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to continue your ascent.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            {loading ? 'Signing in...' : <><GoogleIcon /> Sign in with Google</>}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={signInWithFacebook}
            disabled={loading}
          >
            {loading ? 'Signing in...' : <><Facebook className="mr-2 h-4 w-4" /> Sign in with Facebook</>}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
