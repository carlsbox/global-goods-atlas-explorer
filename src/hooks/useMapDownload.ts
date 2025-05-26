
import { useCallback, useState } from 'react';
import html2canvas from 'html2canvas';
import { toast } from '@/hooks/use-toast';

export interface UseMapDownloadOptions {
  filename?: string;
  format?: 'png' | 'jpeg';
  quality?: number;
  scale?: number;
}

export function useMapDownload() {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadMapAsImage = useCallback(async (
    element: HTMLElement,
    globalGoodName: string,
    options: UseMapDownloadOptions = {}
  ) => {
    const {
      format = 'png',
      quality = 0.95,
      scale = 2
    } = options;

    try {
      setIsDownloading(true);
      
      // Generate canvas from the element
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: scale,
        useCORS: true,
        allowTaint: true,
        height: element.offsetHeight,
        width: element.offsetWidth,
      });

      // Create download link
      const link = document.createElement('a');
      const date = new Date().toISOString().split('T')[0];
      const filename = `${globalGoodName.toLowerCase().replace(/\s+/g, '-')}-implementation-map-${date}.${format}`;
      
      link.download = filename;
      link.href = canvas.toDataURL(`image/${format}`, quality);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Map downloaded successfully",
        description: `Saved as ${filename}`,
      });
      
    } catch (error) {
      console.error('Error downloading map:', error);
      toast({
        title: "Download failed",
        description: "There was an error downloading the map. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return {
    downloadMapAsImage,
    isDownloading
  };
}
