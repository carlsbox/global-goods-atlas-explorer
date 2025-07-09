import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download, Heart, ExternalLink } from "lucide-react";
import { useGlobalGoodsFlat } from "@/lib/api/globalGoodsFlat";
import { useI18n } from "@/hooks/useI18n";
import { Skeleton } from "@/components/ui/skeleton";
import { EnhancedGlobalGoodCard } from "@/components/global-goods/EnhancedGlobalGoodCard";

// Skeleton component for featured goods loading state
function FeaturedGoodsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="transition-all">
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
        </Card>
      ))}
    </div>
  );
}

// Endorsement organizations data
const endorsementOrgs = [
  {
    name: "Wellcome",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=100&fit=crop",
    description: "Global health research charity"
  },
  {
    name: "RF",
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=100&fit=crop",
    description: "Research Foundation"
  },
  {
    name: "WHO-WMO Joint Programme",
    logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=100&fit=crop",
    description: "Joint Programme on Climate and Health"
  }
];

// Emerging tools data
const emergingTools = [
  {
    name: "GHR Tool Suite",
    organization: "Barcelona Supercomputing Center",
    description: "A powerful suite of open-source R packages enabling the harmonization, exploration, modeling, and prediction of climate-health datasets."
  },
  {
    name: "OpenHIM with Climate Mediator",
    organization: "Jembi Health Systems",
    description: "Extending an established interoperability platform to support climate data integration, with initial deployment planned in Mozambique."
  },
  {
    name: "IDS-DRR Open Source Flood Risk Analysis Platform for Disaster Preparedness",
    organization: "Civic Data Lab & Open Contracting Partnership",
    description: "Aggregating diverse disaster risk reduction datasets, including flood hazard and rainfall data, to inform climate-resilient disaster response, currently piloted in parts of India."
  },
  {
    name: "Speedy Mesh",
    organization: "SpeedyKom",
    description: "A cutting-edge pipeline integrating climate, human, and animal health data, with national and regional deployments across Africa, including Cameroon, the African Union's Digital One Health Platform, and IGAD initiatives."
  }
];

export default function ClimateServicesPage() {
  const { data: globalGoods = [], isLoading: isLoadingGoods } = useGlobalGoodsFlat();
  const { tPage } = useI18n();

  // Filter for climate health global goods
  const climateHealthGoods = globalGoods.filter(good => 
    good.ClimateHealth === true || 
    ['dhis2', 'geoprism', 'ewars'].includes(good.ID)
  );

  const handleDownloadGuidebook = () => {
    const link = document.createElement('a');
    link.href = '/assets/Climate_Annex.pdf';
    link.download = 'Climate_Services_for_Health_Annex.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
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
            {tPage('hero.summary', 'climateServices')}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/global-goods?climate-health=true">
                {tPage('hero.exploreCatalog', 'climateServices')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={handleDownloadGuidebook}>
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
          
          {isLoadingGoods ? (
            <FeaturedGoodsSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {climateHealthGoods.slice(0, 3).map((good) => (
                <EnhancedGlobalGoodCard key={good.ID} good={good} />
              ))}
            </div>
          )}
        </section>

        {/* Endorsements Section */}
        <section className="mb-16 bg-card/50 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6">{tPage('endorsements.title', 'climateServices')}</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {tPage('endorsements.description', 'climateServices')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {endorsementOrgs.map((org, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <img 
                    src={org.logo} 
                    alt={org.name}
                    className="h-16 w-auto mx-auto mb-4 object-contain"
                  />
                  <h3 className="font-semibold mb-2">{org.name}</h3>
                  <p className="text-sm text-muted-foreground">{org.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Emerging Innovations Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">{tPage('emerging.title', 'climateServices')}</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {tPage('emerging.description', 'climateServices')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergingTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                  <p className="text-sm text-primary mb-3">({tool.organization})</p>
                  <p className="text-muted-foreground text-sm">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <p className="text-muted-foreground mt-6 italic">
            This reflects growing international momentum to equip health systems with the digital infrastructure needed to withstand climate shocks, improve preparedness, and safeguard vulnerable populations.
          </p>
        </section>

        {/* WHO-WMO Joint Programme Section */}
        <section className="mb-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">{tPage('whoWmo.title', 'climateServices')}</h2>
              <h3 className="text-lg font-semibold text-muted-foreground mb-4">
                {tPage('whoWmo.subtitle', 'climateServices')}
              </h3>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{tPage('whoWmo.forward', 'climateServices')}</h4>
            </div>
          </div>
          
          <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground mt-6">
            "The health impacts of climate change are no longer a distant concern. They are here, now, affecting lives and health systems in every part of the world. From shifting patterns of disease to more frequent heat waves and extreme weather, the connection between climate and health has never been more urgent, or more clear."
          </blockquote>
          
          <div className="mt-6 prose prose-sm max-w-none text-muted-foreground">
            <p>
              The World Health Organization (WHO) - World Meteorological Organization (WMO) Climate and Health Joint Office was created to support countries in responding to these growing risks by bridging two vital communities: public health and climate science. By combining expertise, data, and action, we aim to help governments and partners build stronger, more resilient health systems that can anticipate and respond to the challenges of a changing climate.
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

        {/* Additional Content Sections */}
        <section className="space-y-12">
          {/* Climate Change and Health Systems */}
          <div className="bg-card/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{tPage('climateChange.title', 'climateServices')}</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Climate change is recognized by the World Health Organization (WHO) as a significant global public health threat. The increasing frequency of extreme weather events and gradual climatic shifts escalate risks to human well-being, livelihoods, and health, while also placing health systems under considerable strain.
              </p>
              <p>
                These environmental changes can impact biodiversity, food security, nutrition, air quality, and access to safe water, contributing to an increase in food-, water-, and vector-borne diseases. The Seventy-Seventh World Health Assembly in 2024 highlighted this critical issue through resolution WHA77.14, which calls for global action to foster health and develop climate-resilient, sustainable health systems.
              </p>
            </div>
          </div>

          {/* WHO Digital Health Strategy */}
          <div className="bg-card/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{tPage('digitalHealth.title', 'climateServices')}</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                The WHO's Global Strategy on Digital Health, with its mandate recently extended through 2027, provides a framework for how technology can be leveraged for health improvement. This strategy guides countries in the digital transformation of their health systems by focusing on:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Interoperability standards</li>
                <li>National digital health architecture</li>
                <li>Patient-facing systems (e.g., telemedicine)</li>
                <li>Point-of-care systems (e.g., EHRs with AI decision support)</li>
                <li>Global digital public infrastructure (e.g., GDHCN for verifiable health records)</li>
              </ul>
            </div>
          </div>

          {/* Call for Climate-Health Interoperability */}
          <div className="bg-card/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{tPage('interoperability.title', 'climateServices')}</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                A key challenge is ensuring these digital health systems can effectively achieve interoperability with the extensive standardized climate and weather data curated by organizations like the World Meteorological Organization (WMO).
              </p>
              <p>
                The WHA77.14 resolution specifically urges Member States to enhance their data systems. A key recommendation is to:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic">
                "Integrate climate data into existing monitoring, early warning, surveillance, and data collection systems, including data disaggregated by sex, age, disability, and any other relevant factor, where appropriate."
              </blockquote>
            </div>
          </div>

          {/* WHO Support Activities */}
          <div className="bg-card/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{tPage('support.title', 'climateServices')}</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                To support these efforts, WHO is engaged in key activities aimed at fostering interoperable climate-health solutions. This currently involves:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Working through initiatives such as the WHO-WMO Joint Office on Climate and Health to advance the use of interoperable digital tools, data, and Digital Public Infrastructure (DPI).</li>
                <li>Systematically addressing priority climate-health data challenges by documenting standardized "use cases" for operationalizing climate-informed health services.</li>
                <li>Defining essential data, workflows, and system specifications, guided by approaches like the WHO SMART Guidelines.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}