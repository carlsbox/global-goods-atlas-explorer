import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, ExternalLink, Info } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { CCLicenseBadge } from "@/components/CCLicenseBadge";

export default function ContentLicensePage() {
  const { t } = useI18n();
  
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <SEO 
        title={t('contentLicense.title', "Content License - CC BY-SA 4.0")}
        description={t('contentLicense.description', "Learn about the Creative Commons Attribution-ShareAlike 4.0 International License that governs the content on this website.")}
      />
      
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('common.backToHome', "Back to Home")}
      </Link>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">{t('contentLicense.title', "Content License")}</h1>
          <div className="flex items-center gap-4 mb-6">
            <CCLicenseBadge showIcon={true} showText={true} linkToPage={false} />
            <span className="text-lg text-muted-foreground">
              Creative Commons Attribution-ShareAlike 4.0 International
            </span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              {t('contentLicense.whatThisMeans', "What This Means")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t('contentLicense.intro', "All content on this website, including text, documentation, global good profiles, and exported data, is licensed under the Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0).")}
            </p>
            
            <div className="space-y-3">
              <h3 className="font-semibold">{t('contentLicense.youAreFree', "You are free to:")}</h3>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>{t('contentLicense.share', "Share")}</strong> — {t('contentLicense.shareDesc', "copy and redistribute the material in any medium or format")}
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>{t('contentLicense.adapt', "Adapt")}</strong> — {t('contentLicense.adaptDesc', "remix, transform, and build upon the material for any purpose, even commercially")}
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">{t('contentLicense.underTerms', "Under the following terms:")}</h3>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>{t('contentLicense.attribution', "Attribution")}</strong> — {t('contentLicense.attributionDesc', "You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.")}
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <div>
                    <strong>{t('contentLicense.shareAlike', "ShareAlike")}</strong> — {t('contentLicense.shareAlikeDesc', "If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.")}
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('contentLicense.howToAttribute', "How to Attribute")}</CardTitle>
            <CardDescription>
              {t('contentLicense.attributionGuide', "When reusing content from this website, please include the following attribution:")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <p>"[Content/Title]" by Global Goods Guidebook is licensed under CC BY-SA 4.0.</p>
              <p>Available at: [URL]</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">{t('contentLicense.exampleAttribution', "Example Attribution:")}</h4>
              <p className="text-muted-foreground italic">
                "DHIS2 Global Good Profile" by Global Goods Guidebook is licensed under CC BY-SA 4.0. Available at: https://globalgoodsguidebook.org/global-goods/dhis2
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('contentLicense.whatsCovered', "What's Covered")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-700">{t('contentLicense.included', "Included under CC BY-SA 4.0:")}</h4>
              <ul className="space-y-1 ml-6 text-muted-foreground">
                <li>• {t('contentLicense.websiteContent', "Website content and documentation")}</li>
                <li>• {t('contentLicense.globalGoodProfiles', "Global good profiles and descriptions")}</li>
                <li>• {t('contentLicense.useCaseStudies', "Use case studies and examples")}</li>
                <li>• {t('contentLicense.exportedData', "Exported data and JSON files")}</li>
                <li>• {t('contentLicense.referenceData', "Reference data and classifications")}</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-red-700">{t('contentLicense.notIncluded', "NOT included (separate licenses):")}</h4>
              <ul className="space-y-1 ml-6 text-muted-foreground">
                <li>• {t('contentLicense.sourceCode', "Website source code (has its own open source license)")}</li>
                <li>• {t('contentLicense.individualSoftware', "Individual global goods software (each has its own license)")}</li>
                <li>• {t('contentLicense.trademarks', "Trademarks and logos of individual projects")}</li>
                <li>• {t('contentLicense.thirdParty', "Third-party content explicitly marked with different licenses")}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('contentLicense.fullLicense', "Full License Text")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t('contentLicense.viewFull', "You can view the full legal text of the Creative Commons Attribution-ShareAlike 4.0 International License at:")}
            </p>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t('contentLicense.legalCode', "Legal Code")}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t('contentLicense.humanReadable', "Human-Readable Summary")}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>{t('contentLicense.questions', "Questions?")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t('contentLicense.contactUs', "If you have questions about using content from this website or need clarification about the license, please contact us at")} <a href="mailto:globalgoods@path.org" className="text-primary hover:underline">globalgoods@path.org</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}