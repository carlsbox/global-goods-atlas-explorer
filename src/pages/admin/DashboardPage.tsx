
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useGlobalGoods, useUseCases } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { 
  FiPlus, 
  FiGlobe,
  FiBookOpen,
  FiImage,
  FiUsers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export default function DashboardPage() {
  const { user } = useAuth();
  const [mediaCount, setMediaCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [isLoadingCounts, setIsLoadingCounts] = useState(true);
  
  // Fetch global goods and use cases using existing hooks
  const { 
    data: globalGoods, 
    isLoading: isLoadingGlobalGoods 
  } = useGlobalGoods();
  
  const { 
    data: useCases, 
    isLoading: isLoadingUseCases 
  } = useUseCases();

  useEffect(() => {
    async function fetchCounts() {
      try {
        setIsLoadingCounts(true);
        
        // Fetch media count
        const { count: mediaCountResult, error: mediaError } = await supabase
          .from('media')
          .select('*', { count: 'exact', head: true });
        
        if (mediaError) throw mediaError;
        
        // Fetch user count (only if admin)
        let userCountResult = 0;
        if (user?.role === 'admin') {
          const { count: usersCount, error: usersError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });
          
          if (usersError) throw usersError;
          userCountResult = usersCount || 0;
        }
        
        setMediaCount(mediaCountResult || 0);
        setUserCount(userCountResult);
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setIsLoadingCounts(false);
      }
    }
    
    if (user) {
      fetchCounts();
    }
  }, [user]);

  const isLoading = isLoadingGlobalGoods || isLoadingUseCases || isLoadingCounts;
  const greeting = getGreeting();
  const userName = user?.firstName || user?.email?.split('@')[0] || 'there';
  
  const statCards = [
    {
      title: 'Global Goods',
      value: globalGoods?.length || 0,
      icon: <FiGlobe className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-700',
      link: '/admin/global-goods'
    },
    {
      title: 'Use Cases',
      value: useCases?.length || 0,
      icon: <FiBookOpen className="h-6 w-6" />,
      color: 'bg-green-100 text-green-700',
      link: '/admin/use-cases'
    },
    {
      title: 'Media Assets',
      value: mediaCount,
      icon: <FiImage className="h-6 w-6" />,
      color: 'bg-amber-100 text-amber-700',
      link: '/admin/media'
    }
  ];

  // Add Users card only for admins
  if (user?.role === 'admin') {
    statCards.push({
      title: 'Users',
      value: userCount,
      icon: <FiUsers className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-700',
      link: '/admin/users'
    });
  }

  function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{greeting}, {userName}!</h1>
        <p className="text-muted-foreground">
          Welcome to your dashboard. Here's an overview of your content.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => (
              <Link key={card.title} to={card.link} className="block">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-medium">{card.title}</CardTitle>
                    <div className={`p-2 rounded-full ${card.color}`}>
                      {card.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{card.value}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Global Goods</CardTitle>
                <CardDescription>
                  Latest global goods added to the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {globalGoods?.slice(0, 5).map((good) => (
                  <div key={good.id} className="flex items-center gap-2 border-b pb-2 last:border-0">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {good.logo ? (
                        <img
                          src={good.logo}
                          alt={good.name}
                          className="h-6 w-6 object-contain"
                        />
                      ) : (
                        <FiGlobe className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{good.name}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-xs">
                        {good.sector.join(', ')}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/global-goods" className="flex items-center">
                    <FiPlus className="mr-2 h-4 w-4" />
                    Manage Global Goods
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Use Cases</CardTitle>
                <CardDescription>
                  Latest use cases added to the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {useCases?.slice(0, 5).map((useCase) => (
                  <div key={useCase.id} className="flex items-center gap-2 border-b pb-2 last:border-0">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FiBookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{useCase.title}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-xs">
                        {useCase.organization} — {useCase.country}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/use-cases" className="flex items-center">
                    <FiPlus className="mr-2 h-4 w-4" />
                    Manage Use Cases
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
