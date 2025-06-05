
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Code, Users, CheckCircle2, ExternalLink, Mail } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

export default function AboutPage() {
  const { tPage } = useI18n();
  
  return (
    <>
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
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
          <div className="max-w-4xl mx-auto">
            <Card className="mb-12">
              <CardContent className="pt-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">{tPage('digitalSquare.title', 'about')}</h2>
                    <p className="text-muted-foreground mb-4">
                      {tPage('digitalSquare.content', 'about')}
                    </p>
                    <p className="text-muted-foreground mb-6">
                      {tPage('digitalSquare.role', 'about')}
                    </p>
                    <Button variant="outline" asChild>
                      <a href="https://digitalsquare.org" target="_blank" rel="noopener noreferrer">
                        {tPage('digitalSquare.learnMoreButton', 'about')}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{tPage('globalGoods.title', 'about')}</h2>
            <p className="text-lg text-center text-muted-foreground mb-12">
              {tPage('globalGoods.definition', 'about')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                      <Code className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{tPage('globalGoods.types.software.title', 'about')}</h3>
                    <p className="text-muted-foreground">
                      {tPage('globalGoods.types.software.description', 'about')}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{tPage('globalGoods.types.services.title', 'about')}</h3>
                    <p className="text-muted-foreground">
                      {tPage('globalGoods.types.services.description', 'about')}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{tPage('globalGoods.types.content.title', 'about')}</h3>
                    <p className="text-muted-foreground">
                      {tPage('globalGoods.types.content.description', 'about')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">{tPage('benefits.title', 'about')}</h2>
                <p className="text-muted-foreground mb-4">
                  {tPage('benefits.content', 'about')}
                </p>
                <p className="text-muted-foreground italic">
                  {tPage('benefits.examples', 'about')}
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">{tPage('process.title', 'about')}</h2>
                <p className="text-muted-foreground mb-4">
                  {tPage('process.content', 'about')}
                </p>
                <p className="text-muted-foreground mb-6">
                  {tPage('process.requirements', 'about')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="default">
                    {tPage('process.applyButton', 'about')}
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:digitalsquare@path.org">
                      <Mail className="mr-2 h-4 w-4" />
                      {tPage('process.contactButton', 'about')}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
