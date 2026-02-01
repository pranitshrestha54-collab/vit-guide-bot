import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Home, Dumbbell, Book, Utensils, Heart, Music, Users } from 'lucide-react';

const facilities = [
  { 
    name: 'Academic Buildings', 
    icon: Building2, 
    description: 'State-of-the-art classrooms, laboratories, and research centers equipped with the latest technology.',
    details: ['Smart classrooms', 'Research labs', 'Computer centers', 'Project labs']
  },
  { 
    name: 'Hostels', 
    icon: Home, 
    description: 'Comfortable and secure accommodation for students with all modern amenities.',
    details: ['Separate boys & girls hostels', 'Wi-Fi connectivity', '24/7 security', 'Mess facilities']
  },
  { 
    name: 'Sports Complex', 
    icon: Dumbbell, 
    description: 'World-class sports facilities including indoor and outdoor games.',
    details: ['Cricket ground', 'Football field', 'Indoor stadium', 'Swimming pool', 'Gym']
  },
  { 
    name: 'Central Library', 
    icon: Book, 
    description: 'One of the largest technical libraries in South India with extensive digital resources.',
    details: ['2 lakh+ books', 'Digital library', 'E-journals', 'Reading halls']
  },
  { 
    name: 'Food Court', 
    icon: Utensils, 
    description: 'Multiple food outlets offering hygienic and diverse cuisine options.',
    details: ['North & South Indian', 'Multi-cuisine', 'Cafeterias', 'Juice bars']
  },
  { 
    name: 'Health Center', 
    icon: Heart, 
    description: '24/7 medical facility with qualified doctors and ambulance service.',
    details: ['OPD services', 'Pharmacy', 'Emergency care', 'Ambulance']
  },
];

const clubs = [
  { name: 'IEEE VIT', category: 'Technical', members: 500 },
  { name: 'ACM VIT', category: 'Technical', members: 300 },
  { name: 'MUN Society', category: 'Literary', members: 200 },
  { name: 'Dance Club', category: 'Cultural', members: 250 },
  { name: 'Music Club', category: 'Cultural', members: 180 },
  { name: 'Photography Club', category: 'Creative', members: 150 },
  { name: 'Entrepreneurship Cell', category: 'Business', members: 400 },
  { name: 'NSS', category: 'Social Service', members: 600 },
];

const events = [
  { name: 'Riviera', type: 'Cultural Festival', description: 'Annual cultural festival with performances, competitions, and celebrity nights' },
  { name: 'GravITas', type: 'Tech Festival', description: 'Technical symposium featuring hackathons, workshops, and tech talks' },
  { name: 'Sports Day', type: 'Sports', description: 'Annual sports competition between hostels and departments' },
  { name: 'Convocation', type: 'Academic', description: 'Graduation ceremony celebrating student achievements' },
];

const CampusPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="vit-gradient text-primary-foreground py-20">
        <div className="container">
          <Building2 className="h-12 w-12 mb-4" />
          <h1 className="text-4xl font-heading font-bold mb-4">Campus Life</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            Experience a vibrant campus life with world-class facilities, diverse clubs, 
            and unforgettable events that shape your personality beyond academics.
          </p>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Campus Facilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <Card key={facility.name} className="vit-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <facility.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{facility.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{facility.description}</p>
                  <ul className="text-sm space-y-1">
                    {facility.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Users className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-heading font-bold">Clubs & Societies</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {clubs.map((club) => (
              <Card key={club.name} className="vit-card">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{club.name}</h3>
                  <p className="text-sm text-muted-foreground">{club.category}</p>
                  <p className="text-xs text-primary mt-2">{club.members}+ members</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Music className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-heading font-bold">Annual Events</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {events.map((event) => (
              <Card key={event.name} className="vit-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{event.name}</CardTitle>
                    <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                      {event.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-16 vit-gradient text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Want to Know More?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Chat with our AI assistant to learn more about campus life, hostels, and facilities.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default CampusPage;
