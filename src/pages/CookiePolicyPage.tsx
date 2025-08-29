import { useI18n } from '@/hooks/useI18n';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Settings, BarChart3, UserCog, Share, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';

export function CookiePolicyPage() {
  const { tPage } = useI18n();

  const openCookieSettings = () => {
    window.dispatchEvent(new CustomEvent('openCookieSettings'));
  };

  return (
    <>
      <SEO 
        title={tPage('title', 'cookiePolicy')}
        description={tPage('description', 'cookiePolicy')}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {tPage('backToHome', 'cookiePolicy')}
        </Link>

        <h1 className="text-4xl font-bold mb-4">{tPage('title', 'cookiePolicy')}</h1>
        <p className="text-muted-foreground mb-8">
          {tPage('lastUpdated', 'cookiePolicy')}: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8">
          {/* Introduction */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{tPage('intro.title', 'cookiePolicy')}</h2>
            <p className="text-muted-foreground mb-4">
              {tPage('intro.description', 'cookiePolicy')}
            </p>
            <Button onClick={openCookieSettings} variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              {tPage('manageCookies', 'cookiePolicy')}
            </Button>
          </Card>

          {/* What are cookies */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{tPage('whatAreCookies.title', 'cookiePolicy')}</h2>
            <p className="text-muted-foreground">
              {tPage('whatAreCookies.description', 'cookiePolicy')}
            </p>
          </Card>

          {/* Types of cookies we use */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">{tPage('cookieTypes.title', 'cookiePolicy')}</h2>
            
            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="border-l-4 border-primary pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">{tPage('cookieTypes.necessary.title', 'cookiePolicy')}</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {tPage('alwaysActive', 'cookiePolicy')}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">
                  {tPage('cookieTypes.necessary.description', 'cookiePolicy')}
                </p>
                <div className="bg-muted/30 p-3 rounded">
                  <p className="text-sm font-medium mb-2">{tPage('examples', 'cookiePolicy')}:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {tPage('cookieTypes.necessary.example1', 'cookiePolicy')}</li>
                    <li>• {tPage('cookieTypes.necessary.example2', 'cookiePolicy')}</li>
                    <li>• {tPage('cookieTypes.necessary.example3', 'cookiePolicy')}</li>
                  </ul>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold">{tPage('cookieTypes.analytics.title', 'cookiePolicy')}</h3>
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded">
                    {tPage('optional', 'cookiePolicy')}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">
                  {tPage('cookieTypes.analytics.description', 'cookiePolicy')}
                </p>
                <div className="bg-muted/30 p-3 rounded">
                  <p className="text-sm font-medium mb-2">{tPage('examples', 'cookiePolicy')}:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {tPage('cookieTypes.analytics.example1', 'cookiePolicy')}</li>
                    <li>• {tPage('cookieTypes.analytics.example2', 'cookiePolicy')}</li>
                    <li>• {tPage('cookieTypes.analytics.example3', 'cookiePolicy')}</li>
                  </ul>
                </div>
              </div>

              {/* Functionality Cookies */}
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <UserCog className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold">{tPage('cookieTypes.functionality.title', 'cookiePolicy')}</h3>
                  <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded">
                    {tPage('optional', 'cookiePolicy')}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">
                  {tPage('cookieTypes.functionality.description', 'cookiePolicy')}
                </p>
                <div className="bg-muted/30 p-3 rounded">
                  <p className="text-sm font-medium mb-2">{tPage('examples', 'cookiePolicy')}:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {tPage('cookieTypes.functionality.example1', 'cookiePolicy')}</li>
                    <li>• {tPage('cookieTypes.functionality.example2', 'cookiePolicy')}</li>
                  </ul>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Share className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold">{tPage('cookieTypes.marketing.title', 'cookiePolicy')}</h3>
                  <span className="text-xs bg-purple-500/10 text-purple-500 px-2 py-1 rounded">
                    {tPage('optional', 'cookiePolicy')}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">
                  {tPage('cookieTypes.marketing.description', 'cookiePolicy')}
                </p>
                <div className="bg-muted/30 p-3 rounded">
                  <p className="text-sm font-medium mb-2">{tPage('examples', 'cookiePolicy')}:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {tPage('cookieTypes.marketing.example1', 'cookiePolicy')}</li>
                    <li>• {tPage('cookieTypes.marketing.example2', 'cookiePolicy')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Cookie Details Table */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{tPage('cookieDetails.title', 'cookiePolicy')}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">{tPage('cookieDetails.name', 'cookiePolicy')}</th>
                    <th className="text-left p-2">{tPage('cookieDetails.provider', 'cookiePolicy')}</th>
                    <th className="text-left p-2">{tPage('cookieDetails.purpose', 'cookiePolicy')}</th>
                    <th className="text-left p-2">{tPage('cookieDetails.expiry', 'cookiePolicy')}</th>
                    <th className="text-left p-2">{tPage('cookieDetails.type', 'cookiePolicy')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 text-sm">cookieConsent</td>
                    <td className="p-2 text-sm">{tPage('cookieDetails.us', 'cookiePolicy')}</td>
                    <td className="p-2 text-sm">{tPage('cookieDetails.consentStorage', 'cookiePolicy')}</td>
                    <td className="p-2 text-sm">12 {tPage('months', 'cookiePolicy')}</td>
                    <td className="p-2 text-sm">{tPage('cookieTypes.necessary.title', 'cookiePolicy')}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 text-sm">_ga</td>
                    <td className="p-2 text-sm">Google Analytics</td>
                    <td className="p-2 text-sm">{tPage('cookieDetails.gaDescription', 'cookiePolicy')}</td>
                    <td className="p-2 text-sm">2 {tPage('years', 'cookiePolicy')}</td>
                    <td className="p-2 text-sm">{tPage('cookieTypes.analytics.title', 'cookiePolicy')}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 text-sm">_gid</td>
                    <td className="p-2 text-sm">Google Analytics</td>
                    <td className="p-2 text-sm">{tPage('cookieDetails.gidDescription', 'cookiePolicy')}</td>
                    <td className="p-2 text-sm">24 {tPage('hours', 'cookiePolicy')}</td>
                    <td className="p-2 text-sm">{tPage('cookieTypes.analytics.title', 'cookiePolicy')}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 text-sm">language</td>
                    <td className="p-2 text-sm">{tPage('cookieDetails.us', 'cookiePolicy')}</td>
                    <td className="p-2 text-sm">{tPage('cookieDetails.languageDescription', 'cookiePolicy')}</td>
                    <td className="p-2 text-sm">1 {tPage('year', 'cookiePolicy')}</td>
                    <td className="p-2 text-sm">{tPage('cookieTypes.functionality.title', 'cookiePolicy')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* How to manage cookies */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{tPage('howToManage.title', 'cookiePolicy')}</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {tPage('howToManage.description', 'cookiePolicy')}
              </p>
              <div className="bg-muted/30 p-4 rounded">
                <h3 className="font-semibold mb-2">{tPage('howToManage.browserSettings', 'cookiePolicy')}</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chrome</a></li>
                  <li>• <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Firefox</a></li>
                  <li>• <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                  <li>• <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Edge</a></li>
                </ul>
              </div>
              <Button onClick={openCookieSettings} className="w-full sm:w-auto">
                <Settings className="h-4 w-4 mr-2" />
                {tPage('manageCookies', 'cookiePolicy')}
              </Button>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{tPage('contact.title', 'cookiePolicy')}</h2>
            <p className="text-muted-foreground mb-4">
              {tPage('contact.description', 'cookiePolicy')}
            </p>
            <p className="text-muted-foreground">
              {tPage('contact.email', 'cookiePolicy')}: <a href="mailto:privacy@globalgoodsmap.org" className="text-primary hover:underline">privacy@globalgoodsmap.org</a>
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}

export default CookiePolicyPage;