import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, BookOpen, DollarSign, Building2, Users, Trophy, Globe, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import vitLogo from '@/assets/vit-logo.png';

const stats = [
  { label: 'Students', value: '45,000+', icon: Users },
  { label: 'Faculty', value: '2,500+', icon: GraduationCap },
  { label: 'Placements', value: '95%', icon: Trophy },
  { label: 'Countries', value: '60+', icon: Globe },
];

const quickLinks = [
  { 
    title: 'Admissions', 
    description: 'Apply now for undergraduate and postgraduate programs', 
    icon: GraduationCap, 
    href: '/admissions',
    color: 'bg-blue-500/10 text-blue-600'
  },
  { 
    title: 'Courses', 
    description: 'Explore our wide range of engineering and science programs', 
    icon: BookOpen, 
    href: '/academics',
    color: 'bg-green-500/10 text-green-600'
  },
  { 
    title: 'Fee Structure', 
    description: 'View tuition fees and scholarship opportunities', 
    icon: DollarSign, 
    href: '/admissions',
    color: 'bg-amber-500/10 text-amber-600'
  },
  { 
    title: 'Campus Life', 
    description: 'Discover our world-class facilities and vibrant campus', 
    icon: Building2, 
    href: '/campus',
    color: 'bg-purple-500/10 text-purple-600'
  },
];

const announcements = [
  { title: 'VITEEE 2024 Registration Open', date: 'Jan 15, 2024', type: 'Admission' },
  { title: 'Convocation Ceremony 2024', date: 'Feb 20, 2024', type: 'Event' },
  { title: 'Research Symposium', date: 'Mar 10, 2024', type: 'Academic' },
  { title: 'Placement Drive - Top Companies', date: 'Mar 25, 2024', type: 'Placement' },
];

const Index = () => {
  const { user, fullName, userRole } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative vit-gradient text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyek0zNiAxNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container relative py-20 lg:py-32">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <img src={vitLogo} alt="VIT Logo" className="h-16 w-auto bg-white rounded-lg p-2" />
              <div>
                <h2 className="text-lg font-medium text-primary-foreground/80">Vellore Institute of Technology</h2>
                <p className="text-sm text-primary-foreground/60">Empowering Innovation Since 1984</p>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              Shape Your Future with{' '}
              <span className="text-accent">World-Class</span> Education
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl">
              Join India's leading private university for engineering, technology, and management. 
              Experience excellence in education, research, and innovation.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/admissions">
                <Button size="lg" variant="secondary" className="gap-2 font-semibold">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              {user ? (
                <Link to="/chat">
                  <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    <MessageSquare className="h-4 w-4" />
                    Chat with AI Assistant
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Sign In to Chat
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                <div className="text-3xl font-heading font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Message for Logged In Users */}
      {user && (
        <section className="py-8 bg-accent/10 border-y">
          <div className="container">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-semibold">
                  Welcome back, {fullName || 'User'}!
                </h2>
                <p className="text-muted-foreground">
                  You're logged in as a <span className="capitalize font-medium">{userRole}</span>
                </p>
              </div>
              <Link to="/chat">
                <Button className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Open AI Assistant
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Quick Links Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-3">Quick Access</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to know about VIT, just a click away
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => (
              <Link key={link.title} to={link.href}>
                <Card className="h-full vit-card group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center mb-3`}>
                      <link.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {link.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{link.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Latest Updates</h2>
              <p className="text-muted-foreground">Stay informed with the latest news and events</p>
            </div>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {announcements.map((item, index) => (
              <Card key={index} className="vit-card">
                <CardContent className="p-4">
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary mb-2">
                    {item.type}
                  </span>
                  <h3 className="font-medium mb-1 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant CTA */}
      <section className="py-16 vit-gradient text-primary-foreground">
        <div className="container text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-accent" />
          <h2 className="text-3xl font-heading font-bold mb-4">
            Need Help? Ask Our AI Assistant
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-6">
            Get instant answers about admissions, courses, fees, campus facilities, and more. 
            Available 24/7 to assist you.
          </p>
          {user ? (
            <Link to="/chat">
              <Button size="lg" variant="secondary" className="gap-2 font-semibold animate-pulse-glow">
                <MessageSquare className="h-5 w-5" />
                Start Chatting Now
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="gap-2 font-semibold">
                Sign In to Chat
              </Button>
            </Link>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
