
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bold, Italic, Underline, List, ListOrdered, 
  Link, Image, AlignLeft, AlignCenter, AlignRight, Heading1, Heading2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Start typing...",
  minHeight = "200px"
}: RichTextEditorProps) {
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);
  
  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSelectionStart(target.selectionStart);
    setSelectionEnd(target.selectionEnd);
  };
  
  const applyFormatting = (prefix: string, suffix: string = prefix) => {
    // Get the selected text
    const selectedText = value.substring(selectionStart, selectionEnd);
    
    // Create the formatted text
    const beforeText = value.substring(0, selectionStart);
    const afterText = value.substring(selectionEnd);
    const newValue = beforeText + prefix + selectedText + suffix + afterText;
    
    // Update the value
    onChange(newValue);
  };
  
  // Formatting handlers
  const handleBold = () => applyFormatting("**");
  const handleItalic = () => applyFormatting("*");
  const handleUnderline = () => applyFormatting("<u>", "</u>");
  const handleHeading1 = () => applyFormatting("# ");
  const handleHeading2 = () => applyFormatting("## ");
  const handleBulletList = () => {
    const selectedText = value.substring(selectionStart, selectionEnd);
    if (selectedText) {
      const items = selectedText.split('\n').map(item => `- ${item}`).join('\n');
      const beforeText = value.substring(0, selectionStart);
      const afterText = value.substring(selectionEnd);
      onChange(beforeText + items + afterText);
    } else {
      applyFormatting("- ");
    }
  };
  const handleNumberedList = () => {
    const selectedText = value.substring(selectionStart, selectionEnd);
    if (selectedText) {
      const items = selectedText.split('\n').map((item, i) => `${i + 1}. ${item}`).join('\n');
      const beforeText = value.substring(0, selectionStart);
      const afterText = value.substring(selectionEnd);
      onChange(beforeText + items + afterText);
    } else {
      applyFormatting("1. ");
    }
  };
  const handleLink = () => {
    const selectedText = value.substring(selectionStart, selectionEnd);
    if (selectedText) {
      applyFormatting("[", "](https://)");
    } else {
      applyFormatting("[Link text](https://)");
    }
  };
  const handleImage = () => {
    applyFormatting("![Image description](", ")");
  };
  const handleAlignLeft = () => applyFormatting("<div style=\"text-align: left\">", "</div>");
  const handleAlignCenter = () => applyFormatting("<div style=\"text-align: center\">", "</div>");
  const handleAlignRight = () => applyFormatting("<div style=\"text-align: right\">", "</div>");
  
  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-muted/30">
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleBold}
          className="h-8 w-8"
        >
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleItalic}
          className="h-8 w-8"
        >
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleUnderline}
          className="h-8 w-8"
        >
          <Underline className="h-4 w-4" />
          <span className="sr-only">Underline</span>
        </Button>
        
        <Separator orientation="vertical" className="mx-1 h-6" />
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleHeading1}
          className="h-8 w-8"
        >
          <Heading1 className="h-4 w-4" />
          <span className="sr-only">Heading 1</span>
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleHeading2}
          className="h-8 w-8"
        >
          <Heading2 className="h-4 w-4" />
          <span className="sr-only">Heading 2</span>
        </Button>
        
        <Separator orientation="vertical" className="mx-1 h-6" />
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleBulletList}
          className="h-8 w-8"
        >
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet list</span>
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleNumberedList}
          className="h-8 w-8"
        >
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered list</span>
        </Button>
        
        <Separator orientation="vertical" className="mx-1 h-6" />
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleAlignLeft}
          className="h-8 w-8"
        >
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">Align left</span>
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleAlignCenter}
          className="h-8 w-8"
        >
          <AlignCenter className="h-4 w-4" />
          <span className="sr-only">Align center</span>
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleAlignRight}
          className="h-8 w-8"
        >
          <AlignRight className="h-4 w-4" />
          <span className="sr-only">Align right</span>
        </Button>
        
        <Separator orientation="vertical" className="mx-1 h-6" />
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleLink}
          className="h-8 w-8"
        >
          <Link className="h-4 w-4" />
          <span className="sr-only">Link</span>
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleImage}
          className="h-8 w-8"
        >
          <Image className="h-4 w-4" />
          <span className="sr-only">Image</span>
        </Button>
      </div>
      
      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onSelect={handleSelect}
        placeholder={placeholder}
        className={cn("border-none rounded-t-none focus-visible:ring-0 min-h-[200px]", {
          [`min-h-[${minHeight}]`]: minHeight !== "200px"
        })}
      />
    </div>
  );
}
