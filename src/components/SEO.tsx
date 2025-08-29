import { Helmet } from 'react-helmet-async';
import { 
  getDefaultSEOTitle, 
  getDefaultSEODescription, 
  getDefaultSEOImage, 
  getBaseUrl, 
  getDefaultKeywords,
  getLicenseConfig
} from '@/lib/config';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  jsonLd?: object;
}

export function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  keywords,
  jsonLd
}: SEOProps) {
  const DEFAULT_TITLE = getDefaultSEOTitle();
  const DEFAULT_DESCRIPTION = getDefaultSEODescription();
  const DEFAULT_IMAGE = getDefaultSEOImage();
  const BASE_URL = getBaseUrl();
  const DEFAULT_KEYWORDS = getDefaultKeywords();
  const licenseConfig = getLicenseConfig();

  const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const finalDescription = description || DEFAULT_DESCRIPTION;
  const finalImage = image || DEFAULT_IMAGE;
  const finalUrl = url || BASE_URL;
  const finalKeywords = keywords || DEFAULT_KEYWORDS;
  const canonicalUrl = finalUrl.startsWith('http') ? finalUrl : `${BASE_URL}${finalUrl}`;
  
  // Ensure image URL is absolute
  const absoluteImage = finalImage.startsWith('http') ? finalImage : `${BASE_URL}${finalImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      {author && <meta name="author" content={author} />}
      
      {/* License meta tags */}
      <link rel="license" href={licenseConfig.url} />
      <meta name="dcterms.license" content={licenseConfig.url} />
      <meta name="dcterms.rights" content={licenseConfig.name} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={DEFAULT_TITLE} />
      
      {/* Article specific */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}