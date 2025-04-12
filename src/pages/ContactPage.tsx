
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Send, 
  MessageSquare,
  Globe,
  GithubIcon,
  TwitterIcon
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Have questions or suggestions? Get in touch with our team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Email Us</CardTitle>
              <CardDescription>Reach out directly</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-primary">info@globalgoodsatlas.org</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Community</CardTitle>
              <CardDescription>Join the conversation</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-primary">Join our Slack channel</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Follow our updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon">
                  <TwitterIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <GithubIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here"
                  rows={6}
                  required
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              We'll respond within 48 hours
            </p>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="flex items-center"
            >
              {isSubmitting ? "Sending..." : (
                <>
                  Send Message <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="bg-secondary/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Suggest a Global Good</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Know of a digital global good that should be included in our catalog?
            Let us know and we'll review it for inclusion.
          </p>
          <Button size="lg">Suggest a Global Good</Button>
        </div>
      </div>
    </PageLayout>
  );
}
