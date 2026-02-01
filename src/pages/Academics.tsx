import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, Cpu, Database, Microscope, Building2 } from 'lucide-react';

const departments = [
  { name: 'Computer Science & Engineering', icon: Code, programs: ['B.Tech', 'M.Tech', 'PhD'], students: 4500 },
  { name: 'Electronics & Communication', icon: Cpu, programs: ['B.Tech', 'M.Tech', 'PhD'], students: 3200 },
  { name: 'Mechanical Engineering', icon: Building2, programs: ['B.Tech', 'M.Tech', 'PhD'], students: 2800 },
  { name: 'Information Technology', icon: Database, programs: ['B.Tech', 'M.Tech'], students: 2500 },
  { name: 'Biotechnology', icon: Microscope, programs: ['B.Tech', 'M.Tech', 'PhD'], students: 1200 },
  { name: 'Civil Engineering', icon: Building2, programs: ['B.Tech', 'M.Tech', 'PhD'], students: 1800 },
];

const btechPrograms = [
  'Computer Science & Engineering',
  'Computer Science (AI & ML)',
  'Computer Science (Data Science)',
  'Computer Science (Cyber Security)',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'Information Technology',
  'Computer Science (IoT)',
];

const mtechPrograms = [
  'Computer Science & Engineering',
  'Software Engineering',
  'Data Science',
  'Artificial Intelligence',
  'VLSI Design',
  'Embedded Systems',
  'Structural Engineering',
  'Power Electronics',
  'Manufacturing Engineering',
  'Biotechnology',
];

const AcademicsPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="vit-gradient text-primary-foreground py-20">
        <div className="container">
          <BookOpen className="h-12 w-12 mb-4" />
          <h1 className="text-4xl font-heading font-bold mb-4">Academics</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl">
            World-class programs designed to prepare you for the challenges of tomorrow.
            Explore our diverse range of engineering, science, and management courses.
          </p>
        </div>
      </section>

      {/* Programs Tabs */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="btech" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="btech">B.Tech</TabsTrigger>
              <TabsTrigger value="mtech">M.Tech</TabsTrigger>
              <TabsTrigger value="phd">PhD</TabsTrigger>
            </TabsList>

            <TabsContent value="btech">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading font-bold mb-2">Bachelor of Technology Programs</h2>
                <p className="text-muted-foreground">4-year undergraduate programs in engineering and technology</p>
              </div>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {btechPrograms.map((program) => (
                  <Card key={program} className="vit-card">
                    <CardContent className="p-4">
                      <p className="font-medium text-sm">{program}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mtech">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading font-bold mb-2">Master of Technology Programs</h2>
                <p className="text-muted-foreground">2-year postgraduate programs with specializations</p>
              </div>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mtechPrograms.map((program) => (
                  <Card key={program} className="vit-card">
                    <CardContent className="p-4">
                      <p className="font-medium text-sm">{program}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="phd">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading font-bold mb-2">Doctoral Programs</h2>
                <p className="text-muted-foreground">Research-focused programs across all engineering disciplines</p>
              </div>
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">
                    PhD programs are offered in all major departments. Candidates work closely with 
                    faculty advisors on cutting-edge research projects. Research areas include 
                    AI/ML, IoT, Nanotechnology, Renewable Energy, and more.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Our Departments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <Card key={dept.name} className="vit-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <dept.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {dept.programs.map((prog) => (
                      <Badge key={prog} variant="secondary">{prog}</Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{dept.students.toLocaleString()} students enrolled</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Academic Calendar 2024-25</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              { event: 'Odd Semester Begins', date: 'July 15, 2024' },
              { event: 'Mid-Semester Exams', date: 'September 10-20, 2024' },
              { event: 'Odd Semester Ends', date: 'December 15, 2024' },
              { event: 'Even Semester Begins', date: 'January 10, 2025' },
              { event: 'Mid-Semester Exams', date: 'March 10-20, 2025' },
              { event: 'Even Semester Ends', date: 'May 30, 2025' },
            ].map((item) => (
              <div key={item.event} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                <span className="font-medium">{item.event}</span>
                <span className="text-muted-foreground">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AcademicsPage;
