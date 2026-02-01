import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, FileText, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const eligibility = [
  { program: 'B.Tech', requirement: '10+2 with Physics, Chemistry, and Mathematics with 60% aggregate' },
  { program: 'M.Tech', requirement: 'B.Tech/B.E. degree with 60% aggregate and valid GATE score' },
  { program: 'PhD', requirement: 'M.Tech/M.E./M.Sc. degree with 60% aggregate' },
  { program: 'MBA', requirement: 'Bachelor\'s degree with 50% aggregate and valid CAT/MAT score' },
];

const feeStructure = [
  { program: 'B.Tech', tuition: '₹2,00,000', hostel: '₹1,20,000', total: '₹3,20,000' },
  { program: 'M.Tech', tuition: '₹1,50,000', hostel: '₹1,20,000', total: '₹2,70,000' },
  { program: 'PhD', tuition: '₹80,000', hostel: '₹1,20,000', total: '₹2,00,000' },
  { program: 'MBA', tuition: '₹3,00,000', hostel: '₹1,20,000', total: '₹4,20,000' },
];

const importantDates = [
  { event: 'VITEEE 2024 Registration Opens', date: 'November 1, 2024' },
  { event: 'VITEEE 2024 Registration Closes', date: 'March 31, 2025' },
  { event: 'VITEEE 2024 Exam Date', date: 'April 15-21, 2025' },
  { event: 'Results Declaration', date: 'April 30, 2025' },
  { event: 'Counseling Begins', date: 'May 15, 2025' },
  { event: 'Classes Commence', date: 'July 15, 2025' },
];

const documents = [
  '10th and 12th Mark Sheets',
  'Transfer Certificate',
  'Migration Certificate',
  'Character Certificate',
  'Passport Size Photographs (6)',
  'Aadhar Card',
  'Caste Certificate (if applicable)',
  'Income Certificate (for scholarship)',
];

const AdmissionsPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="vit-gradient text-primary-foreground py-20">
        <div className="container">
          <GraduationCap className="h-12 w-12 mb-4" />
          <h1 className="text-4xl font-heading font-bold mb-4">Admissions</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mb-6">
            Join VIT and become part of a community that nurtures talent, encourages innovation, 
            and prepares you for global success.
          </p>
          <Button size="lg" variant="secondary" className="gap-2">
            Apply Now for VITEEE 2025
          </Button>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Admission Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Register', desc: 'Create an account and fill the application form' },
              { step: '2', title: 'Take VITEEE', desc: 'Appear for VIT Engineering Entrance Exam' },
              { step: '3', title: 'Counseling', desc: 'Attend counseling based on your rank' },
              { step: '4', title: 'Enrollment', desc: 'Complete admission formalities' },
            ].map((item) => (
              <Card key={item.step} className="vit-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-heading font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Eligibility Criteria</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {eligibility.map((item) => (
              <Card key={item.program} className="vit-card">
                <CardContent className="p-4 flex items-start gap-4">
                  <Badge className="mt-0.5">{item.program}</Badge>
                  <p className="text-muted-foreground">{item.requirement}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-12">
            <DollarSign className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-heading font-bold">Fee Structure (Per Year)</h2>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-heading">Program</th>
                  <th className="text-right p-4 font-heading">Tuition Fee</th>
                  <th className="text-right p-4 font-heading">Hostel Fee</th>
                  <th className="text-right p-4 font-heading font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {feeStructure.map((item) => (
                  <tr key={item.program} className="border-b">
                    <td className="p-4 font-medium">{item.program}</td>
                    <td className="p-4 text-right text-muted-foreground">{item.tuition}</td>
                    <td className="p-4 text-right text-muted-foreground">{item.hostel}</td>
                    <td className="p-4 text-right font-bold text-primary">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            * Fees are subject to change. Additional charges may apply for specific programs.
          </p>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Calendar className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-heading font-bold">Important Dates</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {importantDates.map((item) => (
              <div key={item.event} className="flex justify-between items-center p-4 bg-card rounded-lg border">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">{item.event}</span>
                </div>
                <span className="text-muted-foreground">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-12">
            <FileText className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-heading font-bold">Required Documents</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {documents.map((doc) => (
                    <li key={doc} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 vit-gradient text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Join VIT?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Have questions about admissions? Our AI Assistant is available 24/7 to help you.
          </p>
          <Link to="/chat">
            <Button size="lg" variant="secondary">
              Chat with AI Assistant
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default AdmissionsPage;
