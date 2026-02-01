import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    details: ['VIT University, Vellore Campus', 'Tiruvalam Road, Vellore - 632014', 'Tamil Nadu, India'],
  },
  {
    icon: Phone,
    title: 'Phone',
    details: ['+91 416 220 2020', '+91 416 224 3091', 'Toll Free: 1800-102-8484'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['admissions@vit.ac.in', 'info@vit.ac.in', 'support@vit.ac.in'],
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: ['Monday - Friday: 9:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 1:00 PM', 'Sunday: Closed'],
  },
];

const ContactPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="vit-gradient text-primary-foreground py-20">
        <div className="container">
          <Phone className="h-12 w-12 mb-4" />
          <h1 className="text-4xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            Have questions? We're here to help. Reach out to us through any of the channels below 
            or chat with our AI assistant for instant answers.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item) => (
              <Card key={item.title} className="vit-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {item.details.map((detail, index) => (
                    <p key={index} className="text-sm text-muted-foreground mb-1">{detail}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">Send us a Message</h2>
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Your message..." rows={5} />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">Find Us</h2>
              <Card className="overflow-hidden h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0014455391655!2d79.15384731482198!3d12.969441390853556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad479f0ccbe067%3A0xfef222e5f36ecdeb!2sVIT%20University!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="VIT Location"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant CTA */}
      <section className="py-16 vit-gradient text-primary-foreground">
        <div className="container text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-accent" />
          <h2 className="text-3xl font-heading font-bold mb-4">Need Instant Answers?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Our AI Assistant is available 24/7 to answer your questions about admissions, 
            courses, fees, and more.
          </p>
          <Link to="/chat">
            <Button size="lg" variant="secondary" className="gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat with AI Assistant
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
