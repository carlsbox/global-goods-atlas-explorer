
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Heart, Terminal } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const { tPage } = useI18n();
  
  return (
    <>
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {tPage('title', 'about')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {tPage('subtitle', 'about')}
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tPage('mission.title', 'about')}</h3>
                  <p className="text-muted-foreground">
                    {tPage('mission.content', 'about')}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Terminal className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tPage('technology.title', 'about')}</h3>
                  <p className="text-muted-foreground">
                    {tPage('technology.content', 'about')}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tPage('openSource.title', 'about')}</h3>
                  <p className="text-muted-foreground">
                    {tPage('openSource.content', 'about')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{tPage('team.title', 'about')}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {tPage('team.content', 'about')}
            </p>
            <Button variant="default" size="lg">
              {tPage('team.joinButton', 'about')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
