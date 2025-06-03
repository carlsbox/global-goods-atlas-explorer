
import React, { useState } from 'react';
import { useReferenceData } from '@/contexts/ReferenceDataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Database, Globe, Shield, MapPin, Languages, Users } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function ReferencePage() {
  const { tPage } = useI18n();
  const { 
    licenses, 
    countries, 
    classifications, 
    standards, 
    languages, 
    initiatives, 
    globalGoodsTypes,
    loading 
  } = useReferenceData();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  if (loading) {
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

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveCategory(category.id)}
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

      {/* Detailed Content Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="types">Types</TabsTrigger>
          <TabsTrigger value="licenses">Licenses</TabsTrigger>
          <TabsTrigger value="classifications">Classifications</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
          <TabsTrigger value="countries">Countries</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Select a category above to explore specific reference data, or use the search to find specific items.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="types" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {globalGoodsTypes
              .filter(type => !searchTerm || type.title.toLowerCase().includes(searchTerm.toLowerCase()) || type.description.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((type) => (
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
            {licenses
              .filter(license => !searchTerm || license.name.toLowerCase().includes(searchTerm.toLowerCase()) || license.description.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((license) => (
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
            {['Health', 'Interoperability', 'Climate'].map(domain => {
              const domainStandards = Object.values(standards).filter((standard: any) => standard.domain === domain);
              if (domainStandards.length === 0) return null;
              
              return (
                <div key={domain}>
                  <h3 className="text-lg font-semibold mb-3">{domain} Standards</h3>
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

        <TabsContent value="countries" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {countries
              .filter(country => !searchTerm || country.name?.short?.toLowerCase().includes(searchTerm.toLowerCase()) || country.name?.official?.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((country) => (
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

        <TabsContent value="languages" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {languages
              .filter(language => !searchTerm || language.name.toLowerCase().includes(searchTerm.toLowerCase()) || language.nativeName.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((language) => (
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
      </Tabs>
    </div>
  );
}
