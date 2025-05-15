
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Control } from 'react-hook-form';
import { useI18n } from '@/hooks/useI18n';

interface MultilingualTextInputProps {
  name: string;
  label: string;
  control: Control<any>;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
}

export function MultilingualTextInput({
  name,
  label,
  control,
  multiline = false,
  placeholder = '',
  required = false,
}: MultilingualTextInputProps) {
  const { t } = useI18n();
  const languages = ['en', 'fr', 'es'];

  return (
    <FormItem className="space-y-3">
      <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>
      <Tabs defaultValue="en" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="fr">Français</TabsTrigger>
          <TabsTrigger value="es">Español</TabsTrigger>
        </TabsList>
        
        {languages.map(lang => (
          <TabsContent key={lang} value={lang}>
            <FormField
              control={control}
              name={`${name}.${lang}`}
              render={({ field }) => (
                <FormControl>
                  {multiline ? (
                    <Textarea
                      placeholder={`${placeholder} (${lang})`}
                      className="min-h-32"
                      {...field}
                    />
                  ) : (
                    <Input
                      placeholder={`${placeholder} (${lang})`}
                      {...field}
                    />
                  )}
                </FormControl>
              )}
            />
          </TabsContent>
        ))}
      </Tabs>
      <FormMessage />
    </FormItem>
  );
}
