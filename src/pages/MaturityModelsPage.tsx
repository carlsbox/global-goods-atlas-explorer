import { useI18n } from "@/hooks/useI18n";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code, BookOpen, Users, FileText, Check } from "lucide-react";

const MaturityModelsPage = () => {
  const { tPage } = useI18n();

  // Google Sheets URLs
  const SOFTWARE_MODEL_URL = "https://docs.google.com/spreadsheets/d/1SgE8Ffm5jjnfczyzn0FduBLPstJXSJRY/edit?gid=632897780#gid=632897780";
  const CONTENT_MODEL_URL = "https://docs.google.com/spreadsheets/d/1sreuMWam0uSZK1OYadA1DP3bxI5QTvD9/edit?gid=204633699#gid=204633699";
  const REVIEW_PROCESS_URL = "https://www.globalgoodsguidebook.org/about";

  const trackDownload = (type: 'software' | 'content', url: string) => {
    if ((window as any).gtag) {
      const consentData = localStorage.getItem('cookieConsentData');
      if (consentData) {
        try {
          const data = JSON.parse(consentData);
          if (data.preferences.analytics) {
            (window as any).gtag('event', 'maturity_model_download', {
              event_category: 'Downloads',
              event_label: `${type} Maturity Model`,
              link_url: url
            });
          }
        } catch (e) {
          console.error('Error tracking download:', e);
        }
      }
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEO 
        title={tPage('seo.title', 'maturityModels')}
        description={tPage('seo.description', 'maturityModels')}
        url="/gg-maturity-model"
        keywords={[
          'Global Goods Maturity Model',
          'software maturity assessment',
          'content maturity model',
          'digital health evaluation',
          'open source assessment',
          'global utility',
          'community support',
          'Digital Square',
          'digital public goods'
        ]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-16">
            
            {/* Hero Section */}
            <section className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                {tPage('hero.title', 'maturityModels')}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-5xl">
                {tPage('hero.description', 'maturityModels')}
              </p>
            </section>

            {/* What are the maturity models */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold">
                {tPage('whatAre.title', 'maturityModels')}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-5xl">
                {tPage('whatAre.content', 'maturityModels')}
              </p>
            </section>

            {/* Two Models Section */}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold">
                {tPage('twoModels.title', 'maturityModels')}
              </h2>
              
              <div className="grid gap-8 md:grid-cols-2">
                {/* Software Model Card */}
                <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Code className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <CardTitle className="text-2xl">
                          {tPage('twoModels.software.title', 'maturityModels')}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {tPage('twoModels.software.subtitle', 'maturityModels')}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                      {tPage('twoModels.software.intro', 'maturityModels')}
                    </p>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">
                          {tPage('twoModels.software.dimensions.globalUtility.label', 'maturityModels')}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {tPage('twoModels.software.dimensions.globalUtility.description', 'maturityModels')}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">
                          {tPage('twoModels.software.dimensions.communitySupport.label', 'maturityModels')}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {tPage('twoModels.software.dimensions.communitySupport.description', 'maturityModels')}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">
                          {tPage('twoModels.software.dimensions.softwareMaturity.label', 'maturityModels')}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {tPage('twoModels.software.dimensions.softwareMaturity.description', 'maturityModels')}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button 
                        onClick={() => trackDownload('software', SOFTWARE_MODEL_URL)}
                        className="w-full sm:w-auto"
                      >
                        {tPage('twoModels.software.downloadButton', 'maturityModels')}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Content Model Card */}
                <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <BookOpen className="h-6 w-6 text-secondary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <CardTitle className="text-2xl">
                          {tPage('twoModels.content.title', 'maturityModels')}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {tPage('twoModels.content.subtitle', 'maturityModels')}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                      {tPage('twoModels.content.intro', 'maturityModels')}
                    </p>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">
                          {tPage('twoModels.content.focuses.quality.label', 'maturityModels')}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {tPage('twoModels.content.focuses.quality.description', 'maturityModels')}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">
                          {tPage('twoModels.content.focuses.accessibility.label', 'maturityModels')}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {tPage('twoModels.content.focuses.accessibility.description', 'maturityModels')}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">
                          {tPage('twoModels.content.focuses.community.label', 'maturityModels')}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {tPage('twoModels.content.focuses.community.description', 'maturityModels')}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button 
                        onClick={() => trackDownload('content', CONTENT_MODEL_URL)}
                        className="w-full sm:w-auto"
                      >
                        {tPage('twoModels.content.downloadButton', 'maturityModels')}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* How to use section */}
            <section className="space-y-6">
              <h2 className="text-3xl font-bold">
                {tPage('howToUse.title', 'maturityModels')}
              </h2>
              <ol className="space-y-4 list-none">
                {[0, 1, 2, 3].map((index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </span>
                    <div className="flex-1 pt-1">
                      <span className="font-semibold text-foreground">
                        {tPage(`howToUse.steps.${index}.label`, 'maturityModels')}
                      </span>{' '}
                      <span className="text-muted-foreground">
                        {tPage(`howToUse.steps.${index}.description`, 'maturityModels')}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Guidance for applicants */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <FileText className="h-8 w-8 text-primary" />
                  {tPage('guidance.title', 'maturityModels')}
                </CardTitle>
                <CardDescription className="text-base">
                  {tPage('guidance.intro', 'maturityModels')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="mt-1 flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <p className="text-foreground leading-relaxed flex-1">
                        {tPage(`guidance.points.${index}`, 'maturityModels')}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resources section */}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold">
                {tPage('resources.title', 'maturityModels')}
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {/* Software Resource Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">
                        {tPage('resources.cards.software.title', 'maturityModels')}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {tPage('resources.cards.software.description', 'maturityModels')}
                    </p>
                    <Button 
                      onClick={() => trackDownload('software', SOFTWARE_MODEL_URL)}
                      variant="outline" 
                      className="w-full"
                    >
                      {tPage('resources.cards.software.buttonText', 'maturityModels')}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Content Resource Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-secondary" />
                      <CardTitle className="text-lg">
                        {tPage('resources.cards.content.title', 'maturityModels')}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {tPage('resources.cards.content.description', 'maturityModels')}
                    </p>
                    <Button 
                      onClick={() => trackDownload('content', CONTENT_MODEL_URL)}
                      variant="outline" 
                      className="w-full"
                    >
                      {tPage('resources.cards.content.buttonText', 'maturityModels')}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Review Process Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-accent" />
                      <CardTitle className="text-lg">
                        {tPage('resources.cards.review.title', 'maturityModels')}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {tPage('resources.cards.review.description', 'maturityModels')}
                    </p>
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full"
                    >
                      <a 
                        href={REVIEW_PROCESS_URL}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {tPage('resources.cards.review.buttonText', 'maturityModels')}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Closing section */}
            <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-8 border border-primary/10">
              <p className="text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
                {tPage('closing.content', 'maturityModels')}
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default MaturityModelsPage;
