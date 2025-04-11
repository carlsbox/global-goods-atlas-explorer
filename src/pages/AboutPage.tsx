
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-6">About Global Goods Atlas</h1>
          <p className="text-xl text-muted-foreground">
            Mapping and cataloging digital global goods that address global challenges.
          </p>
        </div>
        
        <div className="prose prose-slate max-w-none mb-12">
          <h2>Our Mission</h2>
          <p>
            The Global Goods Atlas is dedicated to identifying, documenting, and promoting digital 
            global goods that help address critical challenges in health, education, and other 
            sectors around the world. We aim to serve as a comprehensive resource for implementers, 
            funders, policymakers, and developers working on digital solutions for global development.
          </p>
          
          <h2>What are Digital Global Goods?</h2>
          <p>
            Digital Global Goods are digital solutions that address key development needs, 
            are adaptable to different countries and contexts, have been deployed at scale, 
            are free and open source, are supported by a community, have clear ownership, 
            are designed to be interoperable, and are built for sustainability.
          </p>
          
          <h2>Our Approach</h2>
          <p>
            We use a systematic approach to identify, evaluate, and catalog digital global goods:
          </p>
          <ul>
            <li>
              <strong>Comprehensive Research:</strong> We conduct extensive research to identify 
              potential global goods across multiple sectors.
            </li>
            <li>
              <strong>Rigorous Assessment:</strong> Each solution is evaluated against established 
              criteria for digital global goods.
            </li>
            <li>
              <strong>Detailed Documentation:</strong> We create detailed profiles for each global 
              good, including technical specifications, implementation requirements, and use cases.
            </li>
            <li>
              <strong>Geographic Mapping:</strong> We track where global goods are being implemented 
              and their impact.
            </li>
          </ul>
          
          <h2>How to Use This Resource</h2>
          <p>
            The Global Goods Atlas offers several ways to explore digital global goods:
          </p>
          <ul>
            <li>
              <strong>Catalog:</strong> Browse our comprehensive catalog of digital global goods, 
              with filtering by sector, technologies, and other criteria.
            </li>
            <li>
              <strong>Map:</strong> Explore our interactive map to see where global goods are being 
              implemented around the world.
            </li>
            <li>
              <strong>Use Cases:</strong> Discover real-world implementations and success stories of 
              digital global goods.
            </li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Explore the Catalog</h3>
              <p className="text-muted-foreground mb-4">
                Browse our comprehensive collection of digital global goods.
              </p>
              <Button asChild>
                <Link to="/global-goods">
                  View Catalog <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Discover Use Cases</h3>
              <p className="text-muted-foreground mb-4">
                Learn how global goods are being implemented around the world.
              </p>
              <Button asChild>
                <Link to="/use-cases">
                  View Use Cases <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Explore the Map</h3>
              <p className="text-muted-foreground mb-4">
                See the global distribution of digital global goods.
              </p>
              <Button asChild>
                <Link to="/map">
                  View Map <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-secondary/30 rounded-lg p-8 text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Have questions about the Global Goods Atlas or want to suggest a global good for inclusion?
            We'd love to hear from you.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Sectors Covered</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="text-sm py-1 px-3">Health</Badge>
            <Badge variant="outline" className="text-sm py-1 px-3">Education</Badge>
            <Badge variant="outline" className="text-sm py-1 px-3">Agriculture</Badge>
            <Badge variant="outline" className="text-sm py-1 px-3">Financial Inclusion</Badge>
            <Badge variant="outline" className="text-sm py-1 px-3">Governance</Badge>
            <Badge variant="outline" className="text-sm py-1 px-3">Humanitarian Response</Badge>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
