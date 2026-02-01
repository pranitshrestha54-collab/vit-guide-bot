import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Eye, Award, Building2 } from 'lucide-react';
import vitLogo from '@/assets/vit-logo.png';

const leadership = [
  { name: 'Dr. G. Viswanathan', title: 'Founder & Chancellor', image: '/placeholder.svg' },
  { name: 'Dr. Sankar Viswanathan', title: 'Vice President', image: '/placeholder.svg' },
  { name: 'Dr. Sekar Viswanathan', title: 'Vice President', image: '/placeholder.svg' },
  { name: 'Dr. G.V. Selvam', title: 'Vice President', image: '/placeholder.svg' },
];

const timeline = [
  { year: '1984', event: 'VIT was founded as Vellore Engineering College' },
  { year: '2001', event: 'Became a Deemed University' },
  { year: '2006', event: 'VIT Chennai Campus established' },
  { year: '2015', event: 'VIT AP & VIT Bhopal campuses launched' },
  { year: '2020', event: 'Ranked among top 10 private universities in India' },
  { year: '2024', event: 'Celebrating 40 years of excellence in education' },
];

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="vit-gradient text-primary-foreground py-20">
        <div className="container">
          <div className="flex items-center gap-6 mb-6">
            <img src={vitLogo} alt="VIT" className="h-20 w-auto bg-white rounded-lg p-2" />
            <div>
              <h1 className="text-4xl font-heading font-bold">About VIT</h1>
              <p className="text-primary-foreground/80">Vellore Institute of Technology</p>
            </div>
          </div>
          <p className="text-xl text-primary-foreground/80 max-w-3xl">
            A place to learn, grow, and excel. VIT is committed to providing world-class education 
            and fostering innovation, research, and entrepreneurship.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="vit-card">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be a world-class university that transforms students into global citizens 
                  who will lead, innovate, and solve the most pressing challenges of our time 
                  through excellence in education, research, and entrepreneurship.
                </p>
              </CardContent>
            </Card>
            <Card className="vit-card">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Target className="h-7 w-7 text-accent" />
                </div>
                <h2 className="text-2xl font-heading font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To provide high-quality education that empowers students to realize their 
                  full potential while contributing to the advancement of knowledge and 
                  technology for the betterment of society.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Excellence', desc: 'Striving for the highest standards in everything we do' },
              { icon: Users, title: 'Integrity', desc: 'Maintaining ethical principles and transparency' },
              { icon: Building2, title: 'Innovation', desc: 'Fostering creativity and forward thinking' },
              { icon: Target, title: 'Impact', desc: 'Creating positive change in society' },
            ].map((value) => (
              <Card key={value.title} className="vit-card text-center">
                <CardContent className="p-6">
                  <value.icon className="h-10 w-10 mx-auto text-primary mb-4" />
                  <h3 className="font-heading font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-4 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pt-4">
                  <p className="text-lg">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Our Leadership</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {leadership.map((person) => (
              <Card key={person.name} className="vit-card text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-muted mb-4 overflow-hidden">
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-heading font-semibold">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
