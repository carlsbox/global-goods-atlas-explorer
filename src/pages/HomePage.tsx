
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Globe, FileText, MapPin, Users, TrendingUp, Award, CheckCircle, Search, Play } from "lucide-react";
import { useGlobalGoods } from "@/lib/api";
import { useI18n } from "@/hooks/useI18n";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useReferenceData } from "@/contexts/ReferenceDataContext";

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

// Animated counter component
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function HomePage() {
  const { data: globalGoods, isLoading: isLoadingGoods } = useGlobalGoods();
  const { t, tPage } = useI18n();
  const { countries, loadCountries } = useReferenceData();
  const [searchTerm, setSearchTerm] = useState("");

  // Load countries for statistics
  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  // Calculate statistics
  const totalGoods = globalGoods?.length || 0;
  const totalCountries = countries?.length || 195;
  const totalImplementations = globalGoods?.reduce((acc, good) => 
    acc + (good.Reach?.NumberOfImplementations || 0), 0) || 0;

  const categories = [
    { 
      title: "Health Systems", 
      icon: "🏥", 
      count: globalGoods?.filter(g => g.PrimarySectorType?.some(s => s.title?.toLowerCase().includes('health')))?.length || 0,
      color: "bg-red-50 border-red-200 hover:bg-red-100"
    },
    { 
      title: "Climate & Environment", 
      icon: "🌍", 
      count: globalGoods?.filter(g => g.PrimarySectorType?.some(s => s.title?.toLowerCase().includes('climate')))?.length || 0,
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    { 
      title: "Education", 
      icon: "📚", 
      count: globalGoods?.filter(g => g.PrimarySectorType?.some(s => s.title?.toLowerCase().includes('education')))?.length || 0,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    { 
      title: "Agriculture", 
      icon: "🌾", 
      count: globalGoods?.filter(g => g.PrimarySectorType?.some(s => s.title?.toLowerCase().includes('agriculture')))?.length || 0,
      color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
    }
  ];

  const successStories = [
    {
      title: "10M+ Lives Impacted",
      description: "Digital health solutions reaching rural communities across 47 countries",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Climate Resilience",
      description: "Weather monitoring systems helping farmers adapt to climate change",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Education Access",
      description: "Open educational platforms serving underserved communities",
      icon: Award,
      color: "text-purple-600"
    }
  ];

  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust badges */}
            <div className="flex justify-center items-center gap-4 mb-6 text-sm text-muted-foreground">
              <Badge variant="outline" className="bg-white/50">
                <CheckCircle className="h-3 w-3 mr-1" />
                Open Source Verified
              </Badge>
              <Badge variant="outline" className="bg-white/50">
                <Award className="h-3 w-3 mr-1" />
                WHO Endorsed
              </Badge>
              <Badge variant="outline" className="bg-white/50">
                <Globe className="h-3 w-3 mr-1" />
                Global Community
              </Badge>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {tPage('hero.title', 'home')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {tPage('hero.subtitle', 'home')}
            </p>

            {/* Live Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  <AnimatedCounter end={totalGoods} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Digital Solutions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  <AnimatedCounter end={Math.min(totalCountries, 195)} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Countries Reached</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  <AnimatedCounter end={Math.min(totalImplementations, 10000)} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Active Implementations</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search global goods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-center bg-white/80 backdrop-blur-sm"
              />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all">
                <Link to="/global-goods">
                  {tPage('hero.buttons.catalog', 'home')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm hover:bg-white">
                <Link to="/map">
                  {tPage('hero.buttons.map', 'home')} <MapPin className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" className="text-primary hover:bg-primary/10">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Dashboard Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Global Impact Dashboard</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-time insights into how digital public goods are transforming communities worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {successStories.map((story, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 bg-white">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <story.icon className={`h-6 w-6 ${story.color}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                  <p className="text-muted-foreground text-sm">{story.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Explorer */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover solutions tailored to your sector and development needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {categories.map((category, index) => (
              <Link to="/global-goods" key={index}>
                <Card className={`${category.color} transition-all duration-300 hover:shadow-lg cursor-pointer border-2`}>
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-2">{category.title}</h3>
                    <div className="text-2xl font-bold text-primary mb-1">{category.count}</div>
                    <div className="text-xs text-muted-foreground">Solutions Available</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tPage('features.goods.title', 'home')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {tPage('features.goods.description', 'home')}
                  </p>
                  <Button asChild variant="link">
                    <Link to="/global-goods">
                      {tPage('features.goods.button', 'home')} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tPage('features.cases.title', 'home')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {tPage('features.cases.description', 'home')}
                  </p>
                  <Button asChild variant="link">
                    <Link to="/use-cases">
                      {tPage('features.cases.button', 'home')} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tPage('features.map.title', 'home')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {tPage('features.map.description', 'home')}
                  </p>
                  <Button asChild variant="link">
                    <Link to="/map">
                      {tPage('features.map.button', 'home')} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Global Goods - Progressive loading */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">{tPage('featuredGoods.title', 'home')}</h2>
              <p className="text-muted-foreground">Discover the most impactful solutions making a difference</p>
            </div>
            <Button asChild variant="link" className="mt-2 md:mt-0">
              <Link to="/global-goods">
                {tPage('featuredGoods.viewAll', 'home')} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {isLoadingGoods ? (
            <FeaturedGoodsSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {globalGoods?.slice(0, 3).map((good) => (
                <Link to={`/global-goods/${good.ID}`} key={good.ID}>
                  <Card className="transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
                    <CardContent className="pt-6">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          {good.Logo ? (
                            <img 
                              src={good.Logo} 
                              alt={good.Name} 
                              className="h-10 w-10 mr-3 rounded"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-10 w-10 bg-primary/10 rounded-full mr-3 flex items-center justify-center">
                              <Globe className="h-5 w-5 text-primary" />
                            </div>
                          )}
                          <h3 className="font-semibold">{good.Name}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
                          {good.ProductOverview?.Description || good.ProductOverview?.Summary || ''}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-auto">
                          {good.GlobalGoodsType?.slice(0, 2).map(type => (
                            <Badge 
                              key={type.code || type.title}
                              variant="secondary"
                              className="text-xs"
                            >
                              {type.title || type.code}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Community?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of implementers using digital public goods to create lasting impact
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/global-goods">
                Start Exploring
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/use-cases">
                View Success Stories
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
