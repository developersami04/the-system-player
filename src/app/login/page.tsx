
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gem, Facebook, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const signUpSchema = z.object({
  displayName: z.string().min(3, { message: 'Nickname must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export default function LoginPage() {
  const { user, loading, signInWithFacebook, signUpWithEmailAndPassword, signInWithEmailAndPassword } = useAuth();
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { displayName: '', email: '', password: '' },
  });

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);
  
  const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
    setAuthError(null);
    setIsSigningUp(true);
    const error = await signUpWithEmailAndPassword(values.email, values.password, values.displayName);
    if (error) {
      setAuthError(error);
    }
    setIsSigningUp(false);
  };

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    setAuthError(null);
    setIsSigningIn(true);
    const error = await signInWithEmailAndPassword(values.email, values.password);
    if (error) {
        setAuthError(error);
    }
    setIsSigningIn(false);
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center gap-2">
            <Gem className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline">System Ascent</h1>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sign-in">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
                <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Sign in to continue your ascent.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Form {...signInForm}>
                      <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                        <FormField
                          control={signInForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <Label htmlFor="email-signin">Email</Label>
                              <FormControl>
                                <Input id="email-signin" type="email" placeholder="m@example.com" {...field} autoComplete="email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={signInForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <Label htmlFor="password-signin">Password</Label>
                              <FormControl>
                                <Input id="password-signin" type="password" {...field} autoComplete="current-password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={isSigningIn}>
                            {isSigningIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </Button>
                      </form>
                    </Form>
                </CardContent>
            </TabsContent>
            <TabsContent value="sign-up">
                <CardHeader>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>Begin your journey with us today.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Form {...signUpForm}>
                      <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                        <FormField
                          control={signUpForm.control}
                          name="displayName"
                          render={({ field }) => (
                            <FormItem>
                              <Label htmlFor="displayName">Nickname</Label>
                              <FormControl>
                                <Input id="displayName" placeholder="Player One" {...field} autoComplete="nickname" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signUpForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <Label htmlFor="email-signup">Email</Label>
                              <FormControl>
                                <Input id="email-signup" type="email" placeholder="m@example.com" {...field} autoComplete="email"/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={signUpForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <Label htmlFor="password-signup">Password</Label>
                              <FormControl>
                                <Input id="password-signup" type="password" {...field} autoComplete="new-password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={isSigningUp}>
                            {isSigningUp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account
                        </Button>
                      </form>
                    </Form>
                </CardContent>
            </TabsContent>
          </Tabs>

          {authError && (
            <p className="text-center text-sm text-destructive mt-4">{authError}</p>
          )}

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={signInWithFacebook}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Facebook className="mr-2 h-4 w-4" /> Facebook</>}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
