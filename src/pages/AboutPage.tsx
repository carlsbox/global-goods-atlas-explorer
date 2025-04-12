
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Heart, Terminal } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              About Global Goods Atlas
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connecting the world to open-source digital public goods for sustainable development.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                  <p className="text-muted-foreground">
                    We're dedicated to promoting digital global goods that solve critical challenges in sustainable development. Our platform connects developers, organizations, and communities to create lasting impact.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Terminal className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Technology Stack</h3>
                  <p className="text-muted-foreground">
                    We build using modern web technologies focused on performance, accessibility, and user experience. Our open architecture encourages collaboration and innovation.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Open Source Commitment</h3>
                  <p className="text-muted-foreground">
                    We believe in the power of open source to transform lives. By supporting and promoting open digital goods, we help create a more equitable digital world.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're a diverse group of technologists, policy experts, and development specialists committed to leveraging technology for social good.
            </p>
            <Button variant="default" size="lg">
              Join Our Team
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
