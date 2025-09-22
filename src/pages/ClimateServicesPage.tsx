import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Download, Heart, ExternalLink, Leaf, Globe, Building, BookOpen, Wifi, Database, Code, BarChart3 } from "lucide-react";
import { useGlobalGoodsFlat } from "@/lib/api/globalGoodsFlat";
import { useI18n } from "@/hooks/useI18n";
import { Skeleton } from "@/components/ui/skeleton";
import { EnhancedGlobalGoodCard } from "@/components/global-goods/EnhancedGlobalGoodCard";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";

// Skeleton component for featured goods loading state
function FeaturedGoodsSkeleton() {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({
      length: 3
    }).map((_, i) => <Card key={i} className="transition-all">
          <CardContent className="pt-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <Skeleton className="h-10 w-10 rounded mr-3" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="space-y-2 mb-4 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex flex-wrap gap-1 mt-auto">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>)}
    </div>;
}

// Endorsement organizations data
const endorsementOrgs = [{
  name: "Wellcome",
  logo: "/lovable-uploads/a87d8b19-b7dd-4104-b8ba-f094b01e062c.png"
}, {
  name: "Rockefeller Foundation",
  logo: "/lovable-uploads/30f54b6b-780a-42ec-85a4-f559bfb2a93f.png"
}, {
  name: "WHO-WMO Joint Programme",
  logo: "/lovable-uploads/5a962e50-00d3-46f6-b4e4-7239a1774744.png"
}, {
  name: "Gates Foundation",
  logo: "/lovable-uploads/GatesFoundation.svg"
}, {
  name: "Digital Impact Alliance",
  logo: "/lovable-uploads/52493266-4ebf-49b2-9061-c9fd484def89.png"
}, {
  name: "Digital Public Goods Alliance",
  logo: "/lovable-uploads/4778ecc2-19db-433a-ac00-cc93736455f0.png"
}, {
  name: "Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ)",
  logo: "/lovable-uploads/giz_logo.svg"
}, {
  name: "NORAD",
  logo: "/lovable-uploads/6ca75fe4-9d9c-4dd3-911b-3e8004df4034.png"
}, {
  name: "UNICEF",
  logo: "/lovable-uploads/fe709775-65d2-4883-bbaf-c313652d8616.png"
}];

// Emerging tools data
const emergingTools = [
  {
    name: 'ClimWeb',
    organization: 'WMO',
    url: 'https://climweb.readthedocs.io/en/stable/',
    description: 'Empowers national meteorological and hydrological services and environmental institutions to deliver critical climate information effectively through a comprehensive, open-source platform. Featuring intuitive content management, real-time satellite visualization, Common Alerting Protocol (CAP) alert composer, and integrated marketing tools, ClimWeb ensures weather and climate services reach decision-makers and communities when they need them most.',
    deployment: 'Trusted by more than 27 institutions across Africa'
  },
  {
    name: 'CAP Standards-based Implementation Tools',
    organization: 'WMO Emergency Education and Training Programme',
    url: 'https://etrp.wmo.int/pluginfile.php/17999/mod_resource/content/1/wmo_1109_en.pdf',
    description: 'Includes Google Public Alerts freeware, mapping platforms that are CAP-enabled such as the Environmental Systems Research Institute\'s platform, geographic information systems (GIS)–based platforms with related CAP functionality, and emergency management freeware.',
    deployment: 'Global implementation'
  },
  {
    name: 'IDS-DRR Open-source Platform',
    organization: 'CivicDataLab and Open Contracting Partnership',
    url: 'https://drr.open-contracting.in/en',
    description: 'Aggregates diverse datasets related to disaster risk reduction, including flood hazard and rainfall data, to inform a climate-resilient disaster response.',
    deployment: 'Currently piloted in parts of India'
  },
  {
    name: 'OpenHIM with Climate Mediator',
    organization: 'Jembi Health Systems',
    url: 'https://openhim.org/',
    description: 'Extends an established interoperability platform to support climate data integration.',
    deployment: 'Initial deployment planned in Mozambique'
  },
  {
    name: 'Speedy Mesh',
    organization: 'SpeedyKom',
    url: 'https://speedykom.de/solutions/speedymesh',
    description: 'Supports climate, human, and animal health data integration with national deployments across Africa and regional applicability through platforms such as the African Union\'s Digital One Health Platform and Intergovernmental Authority on Development initiatives.',
    deployment: 'Deployed in Cameroon and across Africa'
  }
];

// GHR Tools Suite data
const ghrTools = [
  {
    name: 'data4health',
    url: 'https://www.bsc.es/research-and-development/software-and-apps/software-list/harmonize-toolkit',
    description: 'Processes health data (e.g., numbers of symptomatic individuals or confirmed disease cases) typically sourced from surveillance systems and aggregates them in space, time, or by demographic groups.',
    icon: 'Database'
  },
  {
    name: 'clim4health',
    url: 'https://www.bsc.es/research-and-development/software-and-apps/software-list/harmonize-toolkit',
    description: 'Processes climate data (e.g., temperature, precipitation, or drought indicators) from weather stations, reanalysis, and forecast datasets, with postprocessing steps such as bias correction, downscaling, and spatiotemporal aggregation.',
    icon: 'Globe'
  },
  {
    name: 'GHRexplore',
    url: 'https://earth.bsc.es/gitlab/ghr/ghrexplo',
    description: 'Provides a wide variety of visualizations for exploratory analysis of temporal and spatiotemporal health data, including time series, heatmaps, seasonality plots, thematic maps, and more.',
    icon: 'BarChart3'
  },
  {
    name: 'GHRmodel',
    url: 'https://www.bsc.es/research-and-development/software-and-apps/software-list/ghrmodel',
    description: 'Supports modeling health outcomes using Bayesian hierarchical spatiotemporal models with complex covariate effects (e.g., linear, nonlinear, interactions, distributed lag nonlinear models) in the R-INLA framework.',
    icon: 'Code'
  },
  {
    name: 'GHRpredict',
    url: 'https://www.bsc.es/research-and-development/software-and-apps/software-list/idextremes-r-package',
    description: 'Computes out-of-sample probabilistic predictions of disease case counts and outbreak risk using INLA spatiotemporal models and evaluates predictive performance via a range of cross-validation schemes.',
    icon: 'Database'
  }
];

// Resources data
const resources = [
  {
    id: 'green-digital-health',
    title: 'Green Digital Health Tool',
    organization: 'SHADE Research Hub at King\'s College London',
    url: 'https://shaderesearchhub.netlify.app/',
    description: 'Developed by the SHADE Research Hub at King\'s College London, this simple tool helps you consider the environmental impacts of a digital health system. It adopts a \'systems thinking\' approach that goes beyond carbon calculators to also address data sufficiency and mitigation of rebound effects.',
    icon: 'Leaf'
  },
  {
    id: 'climahealth',
    title: 'ClimaHealth',
    organization: 'WHO-WMO Joint Office',
    url: 'https://climahealth.info/',
    description: 'The first global knowledge platform dedicated to climate and health, providing evidence-based resources, tools, and case studies for action on climate change and health impacts. Features country profiles, hazard information, and a comprehensive resource library.',
    icon: 'Globe'
  },
  {
    id: 'who-wmo-joint-programme',
    title: 'WHO-WMO Joint Programme Office',
    organization: 'WHO & WMO',
    url: 'https://climahealth.info/who-wmo-joint-programme/',
    description: 'A collaborative initiative between WHO and WMO to accelerate integrated climate services for health, supporting countries in building climate-resilient health systems through coordinated action and technical expertise.',
    icon: 'Building'
  },
  {
    id: 'who-climate-health',
    title: 'WHO Climate Change and Health',
    organization: 'World Health Organization',
    url: 'https://www.who.int/teams/environment-climate-change-and-health/climate-change-and-health',
    description: 'Official WHO resources on climate change and health impacts, providing global guidance, policy frameworks, and evidence-based strategies to protect public health from climate risks.',
    icon: 'Heart'
  },
  {
    id: 'climahealth-resource-library',
    title: 'ClimaHealth Resource Library',
    organization: 'ClimaHealth',
    url: 'https://climahealth.info/learn/resource-library',
    description: 'Comprehensive collection of climate and health resources including research, tools, case studies, and implementation guides from global partners working at the intersection of climate and health.',
    icon: 'BookOpen'
  },
  {
    id: 'wmo-wis2',
    title: 'WMO Information System 2.0 (WIS 2.0)',
    organization: 'World Meteorological Organization',
    url: 'https://community.wmo.int/en/activity-areas/wis/wis2-implementation',
    description: 'Next-generation global data exchange infrastructure enabling seamless sharing of weather, water, and climate information to support early warning systems and climate services for health.',
    icon: 'Wifi'
  }
];

export default function ClimateServicesPage() {
  const {
    data: globalGoods = [],
    isLoading: isLoadingGoods
  } = useGlobalGoodsFlat();
  const {
    tPage
  } = useI18n();

  // Filter for climate health global goods
  const climateHealthGoods = globalGoods.filter(good => good.ClimateHealth === true || ['dhis2', 'geoprism', 'ewars'].includes(good.ID));
  const handleDownloadGuidebook = () => {
    const link = document.createElement('a');
    link.href = '/assets/Climate_Annex.pdf';
    link.download = 'Climate_Services_for_Health_Annex.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <SEO 
        title="Climate Services for Health"
        description="Explore digital public infrastructure for climate-resilient health systems. Learn how open-source tools integrate climate and health data to protect vulnerable populations."
        url="/climate-health"
        keywords={['climate health', 'climate resilience', 'digital health systems', 'WHO-WMO Joint Programme', 'climate services']}
      />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            {tPage('hero.title', 'climateServices')}
          </h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-8">
            {tPage('hero.subtitle', 'climateServices')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Climate change is a growing and urgent health challenge, particularly for populations already facing health and economic disparities. <a href="https://www.gatesfoundation.org/our-work/programs/global-growth-and-opportunity/digital-public-infrastructure" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Digital Public Infrastructure (DPI)</a> is a set of interoperable digital systems and foundational building blocks that can enable effective delivery of services, promote inclusion, and support governance that benefits the public when aligned with social, cultural, political, and local socio-economic norms that inform complex health system governance. DPI is essential for integrating climate and health data, allowing policymakers and health leaders to make informed decisions as they build climate-resilient health systems. By combining satellite data, weather patterns, and health sector insights, we can better predict disease outbreaks, respond to changing health needs, and mitigate the impact of extreme weather events.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/global-goods?climate-health=true">
                {tPage('hero.exploreCatalog', 'climateServices')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={handleDownloadGuidebook} disabled>
              <Download className="mr-2 h-4 w-4" />
              {tPage('hero.downloadGuidebook', 'climateServices')}
            </Button>
          </div>
        </section>

        {/* Featured Global Goods Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">{tPage('featured.title', 'climateServices')}</h2>
              <p className="text-muted-foreground">{tPage('featured.description', 'climateServices')}</p>
            </div>
            <Button asChild variant="link" className="mt-2 md:mt-0">
              <Link to="/global-goods?climate-health=true">
                View All Climate & Health Tools <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {isLoadingGoods ? <FeaturedGoodsSkeleton /> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {climateHealthGoods.slice(0, 3).map(good => <EnhancedGlobalGoodCard key={good.ID} good={good} />)}
            </div>}
        </section>

        {/* WHO-WMO Joint Programme Section */}
        <section className="mb-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{tPage('whoWmo.title', 'climateServices')}</h2>
            <h4 className="text-lg font-semibold text-muted-foreground">Forward from the WHO-WMO Joint Programme on Climate and Health</h4>
          </div>
          
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              The health impacts of climate change are no longer a distant concern. They are here, now, affecting people and health systems around the world in diverse and unequal ways. From shifting patterns of disease to more frequent heat waves and extreme weather, understanding, monitoring, and preventing the nexus of health risks amplified by changing weather and climate have never been more urgent.
            </p>
            
            <p>
              To support countries in addressing these growing risks, the Joint Programme office is a unique partnership bringing together science, policy, information, and action to support governments and partners to better anticipate and respond to health risks of weather and climate.
            </p>
            
            <p>
              This Global Goods Guidebook Climate Services for Health Annex is part of that effort. While DPI has not historically been designed with climate resilience in mind, it plays a vital role in building it. Service delivery components such as telemedicine, supply chain management, and patient record systems actively support health systems to handle climate challenges better. Furthermore, climate- and health-focused digital global goods can strengthen DPI by providing open, interoperable tools and data systems that integrate climate information into health decision-making. Climate-enabled health DPI can accelerate the access and use of standardized climate information more easily and accelerate efforts to predict, prepare, and respond to climate-related health risks in coordinated and scalable ways by considering the influence of weather and climate on health risk, the timing of vector control, opening of cooling centers, and issuing public advisories that are more precise and protective.
            </p>
            
            <p>
              Effective climate-health integration requires strong collaboration across sectors, better data access, user-centered systems, and expanded training opportunities. WMO's global network, built through decades of cooperation among its member states, enables the collection, processing, and sharing of vital weather, climate, and environmental observations, information, and services. But data alone are not enough. They must be translated into actionable information for health professionals, whether they're managing a disease surveillance system, designing an early warning tool, or writing a national adaptation plan.
            </p>
            
            <p>
              WMO's 2023 resolution on climate, environment, and health (<a href="https://climahealth.info/resource-library/who-wmo-implementation-plan-2023-2033/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WMO's 19th Congress Resolution 17</a>) underscores these needs and calls for a more coordinated and practical approach to using science and technology to support human well-being.
            </p>
            
            <p>
              This Annex reflects what is possible when sectors come together with a shared purpose. We hope it serves as a valuable resource for those working at the intersection of climate and health, whether you are just starting out or building on existing efforts. Additional tools, case studies, and guidance can be found at <a href="https://climahealth.info" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ClimaHealth.info</a>, a joint WHO-WMO initiative supporting learning and collaboration in this growing field.
            </p>
            
            <p>
              We are grateful to everyone who contributed their time, knowledge, and experience to this Annex. We look forward to continued collaboration.
            </p>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild variant="outline">
              <a href="https://climahealth.info" target="_blank" rel="noopener noreferrer">
                Visit ClimaHealth.info <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* WHO: Climate and Weather Responsive Digital Health Systems Section */}
        <section className="mb-16 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6">WHO: Climate and Weather Responsive Digital Health Systems</h2>
          
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
            <p>
              Climate change is recognized by the World Health Organization (WHO) as a significant global public health threat. It acts as a threat multiplier, exacerbating existing systemic vulnerabilities across populations and health systems. The increasing frequency of extreme weather events and gradual climatic shifts escalate risks to human well-being, livelihoods, and health, while also placing health systems under considerable strain. These environmental changes can impact biodiversity, food security, nutrition, air quality, and access to safe water, contributing to an increase in food-, water-, and vector-borne diseases. The Seventy-Seventh World Health Assembly in 2024 highlighted this critical issue through resolution WHA77.14, which calls for global action to foster health and develop climate-resilient, sustainable health systems. Building on this momentum, in May 2025, at the Seventy-eighth World Health Assembly, Member States adopted the first-ever draft Global action plan on climate change and health. The draft Global action plan 2025–2028 (EB156(40)) acknowledged the urgent need to address the health impacts of climate change, positioning health systems as part of the climate solution. Each WHA action build upon previous resolutions going back two decades, which acknowledge the interconnectedness of health, environment, and climate change.
            </p>
            
            <p>
              The WHO's Global Strategy on Digital Health, with its mandate recently extended through 2027, provides a framework for how technology can be leveraged for health improvement. This strategy guides countries in the digital transformation of their health systems by focusing on interoperability standards and national digital health architecture. It supports patient-facing systems like telemedicine, point-of-care systems such as Electronic Health Records leveraging Artificial Intelligence (AI) for enhanced decision support, and the maintenance of global digital public infrastructure, such as verifiable health records through initiatives like the Global Digital Health Certification Network (GDHCN). A key challenge is ensuring these digital health systems can effectively achieve interoperability with the extensive standardized climate and weather data curated by organizations like the World Meteorological Organization (WMO).
            </p>
            
            <p>
              As part of a broader set of recommendations and priority actions, the WHA77.14 resolution specifically urges Member States to enhance their data systems. A key recommendation is to:
            </p>
            
            <blockquote className="border-l-4 border-primary pl-6 italic">
              "Integrate climate data into existing monitoring, early warning, surveillance, and data collection systems, including data disaggregated by sex, age, disability, and any other relevant factor, where appropriate."
            </blockquote>
            
            <p>
              This integration is crucial for enabling "evidence-based decision-making and targeted interventions that respond to the impacts of climate change...on health and health systems."
            </p>
            
            <p>
              Technical integration of climate and health information systems provides operational means to ensure critical data streams foster necessary combined evidence to inform more equitable policy choices and ensure that interventions are targeted effectively. The Global Action Plan 2025 - 28 (EB156(40)) similarly notes:
            </p>
            
            <blockquote className="border-l-4 border-primary pl-6 italic">
              "Support integrated climate and health data and surveillance systems and identify gaps for integrating climate and weather information into country-level health information systems, including by working through the WMO–WHO Joint Office for Climate and Health to build collaborative partnerships among national meteorological and hydrological services and national ministries of health"
            </blockquote>
            
            <p>
              Achieving true interoperability between diverse datasets—including satellite information, in-situ climate data, and health information—is vital for understanding and addressing how seasonal variations and extreme weather events can worsen health risks and strain health system capacities.
            </p>
            
            <p>
              To support these efforts, WHO is engaged in key activities aimed at fostering interoperable climate-health solutions. This currently involves:
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>Working through initiatives such as the WHO-WMO Joint Office on Climate and Health to advance the use of interoperable digital tools, data, and Digital Public Infrastructure (DPI). The overarching impact of these activities is to enable climate-informed health action by fostering interoperable, sustainable national information systems and supporting data-driven decision-making at all levels.</li>
              <li>Systematically addressing priority climate-health data challenges by documenting standardized "use cases" for operationalizing climate-informed health services. This includes defining essential data, workflows, and system specifications, guided by approaches like the WHO SMART Guidelines.</li>
              <li>Supporting country-led solutions by providing technical assistance, convening partners, and enabling capacity building for an array of climate and health interventions.</li>
              <li>Supporting the development and implementation of early warning and surveillance systems, which both serve an operational function and as early adopters of interoperability requirements.</li>
              <li>Convening partners around global strategies and action plans for climate and health which include dimensions of interoperability for climate and health information systems</li>
            </ul>
          </div>
        </section>

        {/* Emerging Innovations Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">{tPage('emerging.title', 'climateServices')}</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {tPage('emerging.description', 'climateServices')}
          </p>
          
          {/* Main Tools */}
          <div className="grid grid-cols-1 gap-6 mb-12">
            {emergingTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-all border-border/50 bg-gradient-to-br from-background to-muted/10">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        <a 
                          href={tool.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          {tool.name}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </CardTitle>
                      <CardDescription className="text-sm font-medium">
                        {tool.organization}
                      </CardDescription>
                    </div>
                    {tool.deployment && (
                      <Badge variant="secondary" className="ml-4">
                        {tool.deployment}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* GHR Tools Suite Section */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-3">GHR Tools Suite</h3>
              <p className="text-muted-foreground leading-relaxed">
                The Global Health Resilience (GHR) group, within the Earth Sciences Department at the{' '}
                <a 
                  href="https://www.bsc.es/discover-bsc/organisation/research-departments/global-health-resilience" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Barcelona Supercomputing Center (BSC)
                </a>
                , develops cutting-edge modeling and digital innovations at the intersection of climate and health to enhance resilience to climate-sensitive health challenges globally and locally. The GHR group is developing a suite of open-source R packages called GHRtools designed for climate-health data integration and analysis:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ghrTools.map((tool, index) => {
                const iconMap: { [key: string]: any } = {
                  'Database': Database,
                  'Globe': Globe,
                  'BarChart3': BarChart3,
                  'Code': Code
                };
                const IconComponent = iconMap[tool.icon] || Database;
                
                return (
                  <Card key={index} className="bg-background/60 backdrop-blur-sm hover:shadow-md transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-primary" />
                        <CardTitle className="text-base">
                          <a 
                            href={tool.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                          >
                            {tool.name}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          
          <p className="text-muted-foreground mt-6 italic">
            This reflects growing international momentum to equip health systems with the digital infrastructure needed to withstand climate shocks, improve preparedness, and safeguard vulnerable populations.
          </p>
        </section>

        {/* Resources Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {tPage('resources.title', 'climateServices')}
            </h2>
            <p className="text-muted-foreground">
              {tPage('resources.description', 'climateServices')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => {
              // Map icon strings to actual icon components
              const iconMap: { [key: string]: any } = {
                'Globe': Globe,
                'Leaf': Leaf,
                'Building': Building,
                'Heart': Heart,
                'BookOpen': BookOpen,
                'Wifi': Wifi
              };
              const IconComponent = iconMap[resource.icon] || Globe;
              
              return (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <IconComponent className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-primary transition-colors"
                          >
                            {resource.title}
                          </a>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          {resource.organization}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {resource.description}
                        </p>
                        <Button asChild variant="outline" size="sm">
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center"
                          >
                            {tPage('resources.visitTool', 'climateServices')}
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Endorsements Section */}
        <section className="mb-16 bg-card/50 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6">{tPage('endorsements.title', 'climateServices')}</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {tPage('endorsements.description', 'climateServices')}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {endorsementOrgs.map((org, index) => <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <img src={org.logo} alt={org.name} className="h-24 w-auto mx-auto mb-4 object-contain" />
                  <h3 className="font-semibold text-sm">{org.name}</h3>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Funding Acknowledgment Section */}
        <section className="mb-16 text-center">
          <div className="prose prose-sm max-w-4xl mx-auto text-muted-foreground space-y-4 italic">
            <p>
              Digital Square is a PATH-led initiative funded by a consortium of donors. This guidebook is made possible with funding from Wellcome, The Rockefeller Foundation, and the World Meteorological Organization (WMO) and World Health Organization (WHO) Climate and Health Joint Programme.
            </p>
            
            <p>
              The contents of this document are the responsibility of PATH and do not necessarily reflect the views of those donors.
            </p>
          </div>
        </section>
      </div>
      </div>
    </>
  );
}