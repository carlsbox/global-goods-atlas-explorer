
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { tPage } = useI18n();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    setFormSubmitted(true);
  };
  
  return (
    <>
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {tPage('title', 'contact')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {tPage('subtitle', 'contact')}
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tPage('location.title', 'contact')}</h3>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: tPage('location.address', 'contact') }}></p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tPage('email.title', 'contact')}</h3>
                  <p className="text-muted-foreground">
                    <a href={`mailto:${tPage('email.general.address', 'contact')}`} className="text-primary hover:underline">
                      {tPage('email.general.address', 'contact')}
                    </a><br />
                    <span className="text-sm">{tPage('email.general.label', 'contact')}</span>
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <a href={`mailto:${tPage('email.support.address', 'contact')}`} className="text-primary hover:underline">
                      {tPage('email.support.address', 'contact')}
                    </a><br />
                    <span className="text-sm">{tPage('email.support.label', 'contact')}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tPage('phone.title', 'contact')}</h3>
                  <p className="text-muted-foreground">
                    {tPage('phone.number', 'contact')}<br />
                    <span className="text-sm">{tPage('phone.hours', 'contact')}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6 text-center">{tPage('form.title', 'contact')}</h2>
                
                {formSubmitted ? (
                  <div className="text-center p-8">
                    <h3 className="text-xl font-medium text-primary mb-2">{tPage('form.success.title', 'contact')}</h3>
                    <p className="text-muted-foreground">{tPage('form.success.message', 'contact')}</p>
                    <Button 
                      className="mt-4" 
                      variant="outline" 
                      onClick={() => setFormSubmitted(false)}
                    >
                      {tPage('form.success.button', 'contact')}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          {tPage('form.nameLabel', 'contact')}
                        </label>
                        <Input id="name" placeholder={tPage('form.namePlaceholder', 'contact')} required />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          {tPage('form.emailLabel', 'contact')}
                        </label>
                        <Input id="email" type="email" placeholder={tPage('form.emailPlaceholder', 'contact')} required />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        {tPage('form.subjectLabel', 'contact')}
                      </label>
                      <Input id="subject" placeholder={tPage('form.subjectPlaceholder', 'contact')} required />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        {tPage('form.messageLabel', 'contact')}
                      </label>
                      <Textarea
                        id="message"
                        placeholder={tPage('form.messagePlaceholder', 'contact')}
                        rows={5}
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">{tPage('form.submitButton', 'contact')}</Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
