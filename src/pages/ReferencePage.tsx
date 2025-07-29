import React, { useState, useEffect } from 'react';
import { useReferenceData } from '@/contexts/ReferenceDataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Database, Globe, Shield, MapPin, Languages, Users } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function ReferencePage() {
  const { tPage } = useI18n();
  const { 
    licenses, 
    countries, 
    classifications, 
    standards, 
    sdgs,
    languages, 
    initiatives, 
    globalGoodsTypes,
    loading,
    loadCountries,
    loadClassifications,
    loadStandards
  } = useReferenceData();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [mainTab, setMainTab] = useState('all');
  const [cardCategory, setCardCategory] = useState('types');
  const [dataLoading, setDataLoading] = useState(true);

  // Load all reference data on component mount
  useEffect(() => {
    const loadAllReferenceData = async () => {
      console.log('ReferencePage - Loading all reference data');
      setDataLoading(true);
      
      try {
        // Load all lazy-loaded sections
        await Promise.all([
          loadCountries(),
          loadClassifications(),
          loadStandards()
        ]);
        
        console.log('ReferencePage - All data loaded:', {
          countries: countries.length,
          classifications: classifications.length,
          standards: Object.keys(standards).length,
          sdgs: sdgs.length,
          initiatives: initiatives.length,
          licenses: licenses.length,
          languages: languages.length,
          globalGoodsTypes: globalGoodsTypes.length
        });
        
      } catch (error) {
        console.error('ReferencePage - Error loading data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    loadAllReferenceData();
  }, [loadCountries, loadClassifications, loadStandards]);

  if (loading || dataLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading reference data...</div>
      </div>
    );
  }

  const categories = [
    {
      id: 'types',
      name: 'Global Goods Types',
      icon: Database,
      count: globalGoodsTypes.length,
      description: 'Categories of digital public goods and tools'
    },
    {
      id: 'licenses',
      name: 'Licenses',
      icon: Shield,
      count: licenses.length,
      description: 'Open source and open data licenses'
    },
    {
      id: 'classifications',
      name: 'Classifications',
      icon: Database,
      count: classifications.length,
      description: 'International taxonomies and frameworks'
    },
    {
      id: 'standards',
      name: 'Standards',
      icon: Globe,
      count: Object.keys(standards).length,
      description: 'Technical and interoperability standards'
    },
    {
      id: 'countries',
      name: 'Countries',
      icon: MapPin,
      count: countries.length,
      description: 'Geographic implementation locations'
    },
    {
      id: 'languages',
      name: 'Languages',
      icon: Languages,
      count: languages.length,
      description: 'Supported product languages'
    },
    {
      id: 'initiatives',
      name: 'Initiatives',
      icon: Users,
      count: initiatives.length,
      description: 'Partner organizations and collections'
    }
  ];

  const filteredGlobalGoodsTypes = globalGoodsTypes.filter(type => 
    !searchTerm || type.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    type.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLicenses = licenses.filter(license => 
    !searchTerm || license.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    license.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClassifications = classifications.filter(classification => 
    !searchTerm || classification.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    classification.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStandards = Object.values(standards).filter((standard: any) => 
    !searchTerm || standard.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    standard.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLanguages = languages.filter(language => 
    !searchTerm || language.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    language.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInitiatives = initiatives.filter(initiative => 
    !searchTerm || initiative.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
    initiative.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCountries = countries.filter(country => 
    !searchTerm || country.name?.short?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    country.name?.official?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Reference Data</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore the comprehensive taxonomy and standards that power our global goods platform. 
          This reference data ensures consistency and enables interoperability across all digital public goods.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search across all reference data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3">
          <TabsTrigger value="all">Overview</TabsTrigger>
          <TabsTrigger value="cards">Card View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {/* Category Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setMainTab('cards');
                    setCardCategory(category.id);
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <IconComponent className="h-8 w-8 text-primary" />
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-6">
          <div className="space-y-8">
            {/* Global Goods Types Table */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Global Goods Types ({filteredGlobalGoodsTypes.length})</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGlobalGoodsTypes.map((type) => (
                    <TableRow key={`type-${type.code}`}>
                      <TableCell className="font-mono">{type.code}</TableCell>
                      <TableCell className="font-medium">{type.title}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{type.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Licenses Table */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Licenses ({filteredLicenses.length})</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>URL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLicenses.map((license) => (
                    <TableRow key={`license-${license.id}`}>
                      <TableCell className="font-mono">{license.id}</TableCell>
                      <TableCell className="font-medium">{license.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{license.description}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <a href={license.url} target="_blank" rel="noopener noreferrer" className="text-xs">
                            View
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Classifications Table with Grouping */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Classifications ({filteredClassifications.length})</h3>
              {['SDG', 'WHO', 'WMO', 'DPI-H'].map(authority => {
                const authorityClassifications = filteredClassifications.filter(c => c.authority === authority);
                if (authorityClassifications.length === 0) return null;
                
                return (
                  <div key={authority} className="mb-6">
                    <h4 className="text-lg font-medium mb-3 text-primary">{authority} Classifications</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Code</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Group</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {authorityClassifications.map((classification) => (
                          <TableRow key={`classification-${authority}-${classification.code}`}>
                            <TableCell className="font-mono">{classification.code}</TableCell>
                            <TableCell className="font-medium">{classification.title}</TableCell>
                            <TableCell className="text-sm">{classification.group_name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{classification.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                );
              })}
            </div>

            {/* Standards Table with Grouping */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Standards ({filteredStandards.length})</h3>
              {['Health', 'Interoperability', 'Weather and Climate'].map(domain => {
                const domainStandards = filteredStandards.filter((standard: any) => standard.domain === domain);
                if (domainStandards.length === 0) return null;
                
                const displayName = domain === 'Weather and Climate' ? 'Climate' : domain;
                
                return (
                  <div key={domain} className="mb-6">
                    <h4 className="text-lg font-medium mb-3 text-primary">{displayName} Standards</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Code</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Link</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {domainStandards.map((standard: any) => (
                          <TableRow key={`standard-${domain}-${standard.code}`}>
                            <TableCell className="font-mono">{standard.code}</TableCell>
                            <TableCell className="font-medium">{standard.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{standard.type}</Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">{standard.description}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" asChild>
                                <a href={standard.link} target="_blank" rel="noopener noreferrer" className="text-xs">
                                  View
                                </a>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                );
              })}
            </div>

            {/* Languages Table */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Languages ({filteredLanguages.length})</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Native Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLanguages.map((language) => (
                    <TableRow key={`language-${language.code}`}>
                      <TableCell className="font-mono">{language.code}</TableCell>
                      <TableCell className="font-medium">{language.name}</TableCell>
                      <TableCell>{language.nativeName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Initiatives Table */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Initiatives ({filteredInitiatives.length})</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Site URL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInitiatives.map((initiative) => (
                    <TableRow key={`initiative-${initiative.id}`}>
                      <TableCell className="font-mono">{initiative.id}</TableCell>
                      <TableCell className="font-medium">{initiative.label}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{initiative.description}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <a href={initiative.site_url} target="_blank" rel="noopener noreferrer" className="text-xs">
                            Visit
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Countries Table - Last as requested */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Countries ({filteredCountries.length})</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ISO Code</TableHead>
                    <TableHead>Short Name</TableHead>
                    <TableHead>Official Name</TableHead>
                    <TableHead>UN Code</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCountries.map((country) => (
                    <TableRow key={`country-${country.code}`}>
                      <TableCell className="font-mono">{country.code?.toUpperCase()}</TableCell>
                      <TableCell className="font-medium">{country.name?.short}</TableCell>
                      <TableCell className="text-sm">{country.name?.official}</TableCell>
                      <TableCell className="font-mono">{country.un_code}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cards" className="mt-6">
          {/* Category Selection Tabs */}
          <Tabs value={cardCategory} onValueChange={setCardCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
              <TabsTrigger value="types">Types</TabsTrigger>
              <TabsTrigger value="licenses">Licenses</TabsTrigger>
              <TabsTrigger value="classifications">Classifications</TabsTrigger>
              <TabsTrigger value="standards">Standards</TabsTrigger>
              <TabsTrigger value="languages">Languages</TabsTrigger>
              <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
              <TabsTrigger value="countries">Countries</TabsTrigger>
            </TabsList>

            <TabsContent value="types" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGlobalGoodsTypes.map((type) => (
                  <Card key={type.code}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {type.title}
                        <Badge variant="outline">{type.code}</Badge>
                      </CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="licenses" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLicenses.map((license) => (
                  <Card key={license.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {license.name}
                        <Badge variant="outline">{license.id}</Badge>
                      </CardTitle>
                      <CardDescription>{license.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm" asChild>
                        <a href={license.url} target="_blank" rel="noopener noreferrer">
                          View License
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="classifications" className="mt-6">
              <div className="space-y-6">
                {['SDG', 'WHO', 'WMO', 'DPI-H'].map(authority => {
                  const authorityClassifications = classifications.filter(c => c.authority === authority);
                  if (authorityClassifications.length === 0) return null;
                  
                  return (
                    <div key={authority}>
                      <h3 className="text-lg font-semibold mb-3">{authority}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {authorityClassifications
                          .filter(classification => !searchTerm || classification.title.toLowerCase().includes(searchTerm.toLowerCase()) || classification.code.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((classification) => (
                            <Card key={classification.code} className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <Badge variant="secondary">{classification.code}</Badge>
                                {classification.group_name && (
                                  <Badge variant="outline" className="text-xs">{classification.group_name}</Badge>
                                )}
                              </div>
                              <h4 className="font-medium mb-1">{classification.title}</h4>
                              {classification.description && (
                                <p className="text-sm text-muted-foreground">{classification.description}</p>
                              )}
                            </Card>
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="standards" className="mt-6">
              <div className="space-y-6">
                {['Health', 'Interoperability', 'Weather and Climate'].map(domain => {
                  const domainStandards = Object.values(standards).filter((standard: any) => standard.domain === domain);
                  if (domainStandards.length === 0) return null;
                  
                  const displayName = domain === 'Weather and Climate' ? 'Climate' : domain;
                  
                  return (
                    <div key={domain}>
                      <h3 className="text-lg font-semibold mb-3">{displayName} Standards</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {domainStandards
                          .filter((standard: any) => !searchTerm || standard.name.toLowerCase().includes(searchTerm.toLowerCase()) || standard.description.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((standard: any) => (
                            <Card key={standard.code}>
                              <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                  {standard.name}
                                  <div className="flex gap-1">
                                    <Badge variant="outline">{standard.code}</Badge>
                                    <Badge variant="secondary">{standard.type}</Badge>
                                  </div>
                                </CardTitle>
                                <CardDescription>{standard.description}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <Button variant="outline" size="sm" asChild>
                                  <a href={standard.link} target="_blank" rel="noopener noreferrer">
                                    Learn More
                                  </a>
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="languages" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLanguages.map((language) => (
                  <Card key={language.code} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{language.code}</Badge>
                    </div>
                    <h4 className="font-medium">{language.name}</h4>
                    <p className="text-sm text-muted-foreground">{language.nativeName}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="initiatives" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredInitiatives.map((initiative) => (
                  <Card key={initiative.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {initiative.label}
                        <Badge variant="outline">{initiative.id}</Badge>
                      </CardTitle>
                      <CardDescription>{initiative.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm" asChild>
                        <a href={initiative.site_url} target="_blank" rel="noopener noreferrer">
                          Visit Initiative
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="countries" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredCountries.map((country) => (
                  <Card key={country.code} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{country.code?.toUpperCase()}</Badge>
                      {country.un_code && (
                        <Badge variant="secondary" className="text-xs">UN: {country.un_code}</Badge>
                      )}
                    </div>
                    <h4 className="font-medium">{country.name?.short}</h4>
                    {country.name?.official !== country.name?.short && (
                      <p className="text-sm text-muted-foreground">{country.name?.official}</p>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
