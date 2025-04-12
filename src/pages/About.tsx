
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Code, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8">About Our Project</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <User className="w-6 h-6" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We are dedicated to creating innovative solutions that simplify complex challenges 
            and provide meaningful value to our users.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Code className="w-6 h-6" />
            Technology Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>React with TypeScript</li>
            <li>Vite as build tool</li>
            <li>Shadcn UI for components</li>
            <li>Tailwind CSS for styling</li>
            <li>React Query for data management</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Award className="w-6 h-6" />
            Our Commitment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We are committed to continuous improvement, user-centric design, 
            and delivering high-quality software solutions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
