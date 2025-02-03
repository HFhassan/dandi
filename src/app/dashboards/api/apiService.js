import { supabase } from '@/utils/supabase';

// Helper function to generate random API key
const generateApiKey = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const prefix = 'dandi';
  const keyLength = 32;
  let key = '';
  
  for (let i = 0; i < keyLength; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `${prefix}-${key}`;
};

export const fetchApiKeys = async () => {
  const { data, error } = await supabase
    .from('api_keys')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createApiKey = async (keyData) => {
  const newKey = {
    name: keyData.name,
    key: generateApiKey(), // Using the new random key generator
    usage: 0,
    monthly_limit: keyData.monthlyLimit,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('api_keys')
    .insert([newKey]);

  if (error) throw error;
};

export const updateApiKey = async (id, keyData) => {
  const { error } = await supabase
    .from('api_keys')
    .update({
      name: keyData.name,
      monthly_limit: keyData.monthlyLimit,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw error;
};

export const deleteApiKey = async (id) => {
  const { error } = await supabase
    .from('api_keys')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const validateApiKey = async (key) => {
  const { data, error } = await supabase
    .from('api_keys')
    .select('id')
    .eq('key', key)
    .single();

  if (error) {
    console.error('Error validating API key:', error);
    return false;
  }

  return !!data;
}; 