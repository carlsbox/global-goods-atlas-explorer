
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useContentLoader } from "@/hooks/useContentLoader";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { content, isLoading } = useContentLoader("contact");
  const [contactContent, setContactContent] = useState<any>(null);

  useEffect(() => {
    if (content) {
      setContactContent(content);
    }
  }, [content]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    setFormSubmitted(true);
  };

  if (isLoading || !contactContent) {
    return (
      <div className="container py-12 text-center">
        <p>Loading content...</p>
      </div>
    );
  }
  
  return (
    <>
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {contactContent.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {contactContent.subtitle}
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
                  <h3 className="text-xl font-semibold mb-2">{contactContent.location.title}</h3>
                  <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: contactContent.location.address }}></p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{contactContent.email.title}</h3>
                  <p className="text-muted-foreground">
                    <a href={`mailto:${contactContent.email.general.address}`} className="text-primary hover:underline">
                      {contactContent.email.general.address}
                    </a><br />
                    <span className="text-sm">{contactContent.email.general.label}</span>
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <a href={`mailto:${contactContent.email.support.address}`} className="text-primary hover:underline">
                      {contactContent.email.support.address}
                    </a><br />
                    <span className="text-sm">{contactContent.email.support.label}</span>
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
                  <h3 className="text-xl font-semibold mb-2">{contactContent.phone.title}</h3>
                  <p className="text-muted-foreground">
                    {contactContent.phone.number}<br />
                    <span className="text-sm">{contactContent.phone.hours}</span>
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
                <h2 className="text-2xl font-bold mb-6 text-center">{contactContent.form.title}</h2>
                
                {formSubmitted ? (
                  <div className="text-center p-8">
                    <h3 className="text-xl font-medium text-primary mb-2">{contactContent.form.success.title}</h3>
                    <p className="text-muted-foreground">{contactContent.form.success.message}</p>
                    <Button 
                      className="mt-4" 
                      variant="outline" 
                      onClick={() => setFormSubmitted(false)}
                    >
                      {contactContent.form.success.button}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          {contactContent.form.nameLabel}
                        </label>
                        <Input id="name" placeholder={contactContent.form.namePlaceholder} required />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          {contactContent.form.emailLabel}
                        </label>
                        <Input id="email" type="email" placeholder={contactContent.form.emailPlaceholder} required />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        {contactContent.form.subjectLabel}
                      </label>
                      <Input id="subject" placeholder={contactContent.form.subjectPlaceholder} required />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        {contactContent.form.messageLabel}
                      </label>
                      <Textarea
                        id="message"
                        placeholder={contactContent.form.messagePlaceholder}
                        rows={5}
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">{contactContent.form.submitButton}</Button>
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
