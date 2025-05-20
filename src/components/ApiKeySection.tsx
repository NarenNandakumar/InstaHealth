
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ApiKeyManager from './ApiKeyManager';

const ApiKeySection: React.FC = () => {
  return (
    <section className="mb-8">
      <ApiKeyManager />
    </section>
  );
};

export default ApiKeySection;
