
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Digital Public Good Registry</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore digital solutions that have been assessed against the Digital Public Goods Standard
          </p>
        </header>

        <Card className="border-2">
          <CardHeader className="bg-muted/50">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">DHIS2</CardTitle>
                <CardDescription>Health Management Information System</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-10">
              {/* Overview Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 pb-2 border-b">Overview</h2>
                <p className="mb-4 text-muted-foreground">
                  DHIS2 is an open-source, web-based health management information system platform used in more than 
                  70 countries worldwide. It is the world's largest health information system.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Organization</h3>
                    <p>University of Oslo</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Website</h3>
                    <a href="https://dhis2.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      https://dhis2.org
                    </a>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">License</h3>
                    <p>BSD 3-Clause</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Countries Deployed</h3>
                    <p>70+</p>
                  </div>
                </div>
              </section>

              {/* Description Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 pb-2 border-b">Description</h2>
                <div className="prose max-w-none">
                  <p>
                    DHIS2 is a flexible, web-based information management system that is used for data collection, 
                    validation, analysis, and presentation of aggregated and patient-based statistical data. It is 
                    designed for health information management activities and facilitates:
                  </p>
                  <ul className="my-4 list-disc pl-6 space-y-1">
                    <li>Data collection, validation, and analysis</li>
                    <li>Management of health facilities and services</li>
                    <li>Logistical management systems</li>
                    <li>Patient-level tracking</li>
                    <li>Routine surveillance</li>
                  </ul>
                  <p>
                    DHIS2 is managed by the Health Information Systems Programme (HISP) at the University of Oslo 
                    and has been implemented in more than 70 countries across Africa, Asia, and Latin America.
                  </p>
                </div>
              </section>

              {/* Standards & Classification Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 pb-2 border-b">Standards & Classification</h2>
                
                {/* Health Standards */}
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-3">Health Standards</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    <li className="bg-muted/30 p-3 rounded-md">HL7 FHIR</li>
                    <li className="bg-muted/30 p-3 rounded-md">ICD-10</li>
                    <li className="bg-muted/30 p-3 rounded-md">SNOMED CT</li>
                    <li className="bg-muted/30 p-3 rounded-md">LOINC</li>
                  </ul>
                </div>

                {/* WHO Classification */}
                <div>
                  <h3 className="text-xl font-medium mb-3">WHO System Classification</h3>
                  
                  <div className="mb-3">
                    <h4 className="font-medium text-muted-foreground mb-2">PRIMARY</h4>
                    <div className="bg-primary/10 p-3 rounded-md">
                      D6 | D6 Health management information systems (HMIS)
                    </div>
                  </div>

                  <Collapsible className="border rounded-md">
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 font-medium text-left">
                      <span>ADDITIONAL</span>
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 pt-0 space-y-2">
                      <div className="bg-muted/30 p-3 rounded-md">
                        A2 | A2 Community-based information systems
                      </div>
                      <div className="bg-muted/30 p-3 rounded-md">
                        B6 | B6 Logistics management information systems (LMIS)
                      </div>
                      <div className="bg-muted/30 p-3 rounded-md">
                        E2 | E2 Public health and disease surveillance system
                      </div>
                      <div className="bg-muted/30 p-3 rounded-md">
                        D8 | D8 Shared Health Record and Health Information Repositories
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </section>

              {/* Documentation Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 pb-2 border-b">Documentation</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="hover:bg-muted/20 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg">User Manual</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground">Comprehensive guide for day-to-day users of the platform.</p>
                      <a href="#" className="text-primary text-sm hover:underline">View Documentation →</a>
                    </CardContent>
                  </Card>
                  <Card className="hover:bg-muted/20 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg">Implementation Guide</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground">Best practices for implementing DHIS2 in various contexts.</p>
                      <a href="#" className="text-primary text-sm hover:underline">View Documentation →</a>
                    </CardContent>
                  </Card>
                  <Card className="hover:bg-muted/20 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg">Developer Docs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground">Technical documentation and API references for developers.</p>
                      <a href="#" className="text-primary text-sm hover:underline">View Documentation →</a>
                    </CardContent>
                  </Card>
                  <Card className="hover:bg-muted/20 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg">Community Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground">Forums, discussion groups, and community support options.</p>
                      <a href="#" className="text-primary text-sm hover:underline">View Resources →</a>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
