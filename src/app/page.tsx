
'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Gem, CheckCircle, Flame, Trophy, Users, Gift, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const features = [
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Task Management",
      description: "Create, track, and complete tasks to earn XP and level up your life.",
    },
    {
      icon: <Flame className="h-8 w-8 text-primary" />,
      title: "Missions & Quests",
      description: "Embark on guided missions to achieve your long-term goals.",
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "Achievements & Rewards",
      description: "Unlock badges and rewards for your accomplishments and milestones.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Leaderboards",
      description: "Compete with others and climb the ranks to become a top user.",
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "AI Recommendations",
      description: "Get personalized tasks and missions suggested by our AI.",
    },
    {
      icon: <Gift className="h-8 w-8 text-primary" />,
      title: "Gamified Experience",
      description: "Turn self-improvement into a fun and engaging game.",
    },
  ];

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);
  
  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Gem className="h-12 w-12 animate-pulse text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-auto flex items-center gap-2">
            <Gem className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline">System Ascent</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/login">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32 lg:py-40">
            <div className="container text-center">
                <h1 className="text-4xl font-bold tracking-tight font-headline md:text-5xl lg:text-6xl">
                    Level Up Your Life
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                    System Ascent turns your self-improvement journey into an epic RPG. Complete tasks, conquer missions, and earn rewards to become the best version of yourself.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/login">Begin Your Ascent</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="#features">Learn More</Link>
                    </Button>
                </div>
            </div>
        </section>
        
        <section id="features" className="py-20 md:py-28 bg-muted/30">
            <div className="container">
                <div className="text-center">
                    <h2 className="text-3xl font-bold font-headline">How The System Works</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Everything you need to gamify your personal growth.</p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 rounded-lg bg-card border">
                            <div className="flex items-center gap-4">
                                {feature.icon}
                                <h3 className="text-xl font-bold">{feature.title}</h3>
                            </div>
                            <p className="mt-4 text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container text-center max-w-4xl">
            <h2 className="text-3xl font-bold font-headline">Ready to Start Your Journey?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of others on their quest for self-improvement. Your adventure begins now.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="h-12 text-lg" asChild>
                <Link href="/login">Create Your Account</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container flex items-center justify-between">
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} System Ascent. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Gem className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">System Ascent</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
