import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Code, Users, ExternalLink, BookOpen, FileText, Database, Settings, Mail, Globe } from "lucide-react";
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Code className="h-6 w-6 text-primary" />
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
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-primary" />
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
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{tPage('globalGoods.types.content.title', 'about')}</h3>
                    <p className="text-muted-foreground">
                      {tPage('globalGoods.types.content.description', 'about')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{tPage('globalGoods.types.climate.title', 'about')}</h3>
                    <p className="text-muted-foreground">
                      {tPage('globalGoods.types.climate.description', 'about')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{tPage('globalGoods.types.data.title', 'about')}</h3>
                    <p className="text-muted-foreground">
                      {tPage('globalGoods.types.data.description', 'about')}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{tPage('globalGoods.types.ai.title', 'about')}</h3>
                    <p className="text-muted-foreground">
                      {tPage('globalGoods.types.ai.description', 'about')}
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
            <Card className="mb-12">
              <CardContent className="pt-8">
                <h2 className="text-3xl font-bold mb-6">{tPage('benefits.title', 'about')}</h2>
                <p className="text-muted-foreground">
                  {tPage('benefits.content', 'about')}
                </p>
              </CardContent>
            </Card>

            <Card className="mb-12">
              <CardContent className="pt-8">
                <h2 className="text-3xl font-bold mb-6">{tPage('process.title', 'about')}</h2>
                <p className="text-muted-foreground mb-4">
                  {tPage('process.content', 'about')}
                </p>
                <p className="text-muted-foreground mb-4">
                  {tPage('process.review', 'about')}
                </p>
                <p className="text-muted-foreground mb-4">
                  {tPage('process.result', 'about')}
                </p>
                <p className="text-primary font-medium cursor-pointer hover:underline mb-2">
                  {tPage('process.prgLink', 'about')}
                </p>
                <p className="text-muted-foreground">
                  {tPage('process.linkedinText', 'about')}{' '}
                  <a href="https://www.linkedin.com/company/path/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    LinkedIn
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="mb-12">
              <CardContent className="pt-8">
                <h2 className="text-3xl font-bold mb-6">{tPage('maturityModel.title', 'about')}</h2>
                <p className="text-muted-foreground mb-4">
                  {tPage('maturityModel.content', 'about')}
                </p>
                <p className="text-muted-foreground mb-4">
                  {tPage('maturityModel.development', 'about')}
                </p>
                <p className="text-primary font-medium cursor-pointer hover:underline">
                  {tPage('maturityModel.downloadLink', 'about')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8">
                <h2 className="text-3xl font-bold mb-6">{tPage('productSuites.title', 'about')}</h2>
                <p className="text-muted-foreground mb-6">
                  {tPage('productSuites.content', 'about')}
                </p>
                
                <h3 className="text-xl font-semibold mb-4">{tPage('productSuites.requirements.title', 'about')}</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li className="text-muted-foreground">Use Digital Square-approved global goods or tools meeting Digital Public Good (DPG) standards</li>
                  <li className="text-muted-foreground">Be open source (OSI-approved license) or on the path to becoming open source</li>
                  <li className="text-muted-foreground">Fulfill clear functional and non-functional requirements</li>
                  <li className="text-muted-foreground">Support standards-based interoperability (e.g., HL7 FHIR, GS1, OpenHIE workflows)</li>
                  <li className="text-muted-foreground">Align with WHO SMART Guidelines, ideally progressing to executable reference software</li>
                  <li className="text-muted-foreground">Include up-to-date user and technical documentation (Creative Commons licensed)</li>
                  <li className="text-muted-foreground">Demonstrate quality assurance through documented testing results</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">{tPage('productSuites.immunization.title', 'about')}</h3>
                <p className="text-muted-foreground mb-4">
                  {tPage('productSuites.immunization.description', 'about')}
                </p>
                <a href="https://opensrp.io/global-immunization-product-suite/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                  {tPage('productSuites.immunization.linkText', 'about')}
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{tPage('contact.title', 'about')}</h2>
            <Button asChild size="lg">
              <a href="mailto:globalgoods@path.org">
                <Mail className="mr-2 h-5 w-5" />
                {tPage('contact.buttonText', 'about')}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
