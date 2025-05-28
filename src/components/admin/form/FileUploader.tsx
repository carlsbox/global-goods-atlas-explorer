
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { upload } from 'lucide-react';

interface FileUploaderProps {
  onChange: (url: string) => void;
  value?: string;
}

export function FileUploader({ onChange, value }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // For now, just use a placeholder URL
      // In a real app, this would upload to a service like Supabase or S3
      const mockUrl = URL.createObjectURL(file);
      onChange(mockUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const UploadIcon = upload;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <Button type="button" variant="outline" disabled={uploading}>
          <UploadIcon className="h-4 w-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
      {value && (
        <div className="flex items-center gap-2">
          <img src={value} alt="Preview" className="h-16 w-16 object-cover rounded" />
          <Input value={value} readOnly />
        </div>
      )}
    </div>
  );
}
