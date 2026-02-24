
-- Fix 1: Remove the dangerous user INSERT policy on user_roles (prevents privilege escalation)
DROP POLICY "Users can insert their own role on signup" ON public.user_roles;

-- Fix 2: Update trigger to always assign 'visitor' role, ignoring client-supplied role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  
  -- Always assign 'visitor' role regardless of metadata
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'visitor');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix 3: Add DELETE policy for messages (users can delete messages in their own conversations)
CREATE POLICY "Users can delete messages in their conversations"
  ON public.messages FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations
      WHERE conversations.id = messages.conversation_id
      AND conversations.user_id = auth.uid()
    )
  );
