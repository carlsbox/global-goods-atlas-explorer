
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Heart, Terminal } from "lucide-react";
import { useContentLoader } from "@/hooks/useContentLoader";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const { content, isLoading } = useContentLoader("about");
  const [aboutContent, setAboutContent] = useState<any>(null);

  useEffect(() => {
    if (content) {
      setAboutContent(content);
    }
  }, [content]);

  if (isLoading || !aboutContent) {
    return (
      <div className="container py-12 text-center">
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {aboutContent.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {aboutContent.subtitle}
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
                  <h3 className="text-xl font-semibold mb-2">{aboutContent.mission.title}</h3>
                  <p className="text-muted-foreground">
                    {aboutContent.mission.content}
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
                  <h3 className="text-xl font-semibold mb-2">{aboutContent.technology.title}</h3>
                  <p className="text-muted-foreground">
                    {aboutContent.technology.content}
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
                  <h3 className="text-xl font-semibold mb-2">{aboutContent.openSource.title}</h3>
                  <p className="text-muted-foreground">
                    {aboutContent.openSource.content}
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
            <h2 className="text-3xl font-bold mb-6">{aboutContent.team.title}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {aboutContent.team.content}
            </p>
            <Button variant="default" size="lg">
              {aboutContent.team.joinButton}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
