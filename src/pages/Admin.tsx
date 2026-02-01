import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Save, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type FaqCategory = 'admissions' | 'courses' | 'fees' | 'events' | 'facilities' | 'exams' | 'general';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  is_active: boolean;
  created_at: string;
}

const categories: { value: FaqCategory; label: string }[] = [
  { value: 'admissions', label: 'Admissions' },
  { value: 'courses', label: 'Courses' },
  { value: 'fees', label: 'Fees' },
  { value: 'events', label: 'Events' },
  { value: 'facilities', label: 'Facilities' },
  { value: 'exams', label: 'Exams' },
  { value: 'general', label: 'General' },
];

const AdminPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'general' as FaqCategory,
    is_active: true,
  });
  
  const { user, userRole, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check admin access
  useEffect(() => {
    if (!authLoading && (!user || userRole !== 'admin')) {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You need admin privileges to access this page.',
      });
      navigate('/');
    }
  }, [user, userRole, authLoading, navigate, toast]);

  // Load FAQs
  useEffect(() => {
    if (user && userRole === 'admin') {
      loadFaqs();
    }
  }, [user, userRole]);

  // Filter FAQs
  useEffect(() => {
    let filtered = faqs;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.question.toLowerCase().includes(query) ||
          f.answer.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((f) => f.category === selectedCategory);
    }
    
    setFilteredFaqs(filtered);
  }, [faqs, searchQuery, selectedCategory]);

  const loadFaqs = async () => {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading FAQs:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to load FAQs' });
      return;
    }

    const typedFaqs: FAQ[] = (data || []).map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category as FaqCategory,
      is_active: f.is_active,
      created_at: f.created_at,
    }));
    setFaqs(typedFaqs);
  };

  const handleCreate = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please fill in all fields' });
      return;
    }

    const { error } = await supabase.from('faqs').insert({
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
      is_active: formData.is_active,
      created_by: user?.id,
    });

    if (error) {
      console.error('Error creating FAQ:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to create FAQ' });
      return;
    }

    toast({ title: 'Success', description: 'FAQ created successfully' });
    setIsCreating(false);
    setFormData({ question: '', answer: '', category: 'general', is_active: true });
    loadFaqs();
  };

  const handleUpdate = async (id: string) => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please fill in all fields' });
      return;
    }

    const { error } = await supabase
      .from('faqs')
      .update({
        question: formData.question,
        answer: formData.answer,
        category: formData.category,
        is_active: formData.is_active,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating FAQ:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to update FAQ' });
      return;
    }

    toast({ title: 'Success', description: 'FAQ updated successfully' });
    setEditingId(null);
    loadFaqs();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('faqs').delete().eq('id', id);

    if (error) {
      console.error('Error deleting FAQ:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete FAQ' });
      return;
    }

    toast({ title: 'Success', description: 'FAQ deleted successfully' });
    loadFaqs();
  };

  const startEditing = (faq: FAQ) => {
    setEditingId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      is_active: faq.is_active,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({ question: '', answer: '', category: 'general', is_active: true });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || userRole !== 'admin') {
    return null;
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold">Knowledge Base Management</h1>
            <p className="text-muted-foreground">Manage FAQs for the AI Assistant</p>
          </div>
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add FAQ
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Create Form */}
        {isCreating && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Question</Label>
                <Input
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Enter the question..."
                />
              </div>
              <div className="space-y-2">
                <Label>Answer</Label>
                <Textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Enter the answer..."
                  rows={4}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="space-y-2 flex-1">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value as FaqCategory })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label>Active</Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreate} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No FAQs found. Create one to get started.
              </CardContent>
            </Card>
          ) : (
            filteredFaqs.map((faq) => (
              <Card key={faq.id}>
                <CardContent className="p-4">
                  {editingId === faq.id ? (
                    <div className="space-y-4">
                      <Input
                        value={formData.question}
                        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      />
                      <Textarea
                        value={formData.answer}
                        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                        rows={4}
                      />
                      <div className="flex gap-4">
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value as FaqCategory })}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={formData.is_active}
                            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                          />
                          <Label>Active</Label>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleUpdate(faq.id)}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEditing}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold">{faq.question}</h3>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant={faq.is_active ? 'default' : 'secondary'}>
                            {faq.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Badge variant="outline">{faq.category}</Badge>
                          <Button size="icon" variant="ghost" onClick={() => startEditing(faq)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive"
                            onClick={() => handleDelete(faq.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm whitespace-pre-wrap">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
