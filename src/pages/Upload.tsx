import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FolderOpen, Upload as UploadIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      toast({
        title: "Please select a file",
        description: "You need to upload a financial dataset first.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "File uploaded successfully!",
      description: "Processing your financial dataset...",
    });

    // Simulate file processing and navigate to data preview
    setTimeout(() => {
      navigate("/data-preview");
    }, 1000);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            What decision are we powering up today?
          </h1>
        </div>

        <Card className="p-8">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive 
                ? "border-accent bg-accent/10" 
                : "border-border hover:border-accent/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FolderOpen className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            
            <h2 className="text-xl font-semibold mb-2 text-foreground">
              Upload your financial dataset
            </h2>
            
            <p className="text-muted-foreground mb-6">
              (Drag & drop or click to browse)
            </p>

            <input
              type="file"
              onChange={handleFileSelect}
              accept=".csv,.xlsx,.xls"
              className="hidden"
              id="file-upload"
            />
            
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Choose File
                </span>
              </Button>
            </label>

            {file && (
              <div className="mt-4 p-3 bg-secondary rounded-lg">
                <p className="text-sm text-foreground">
                  Selected: {file.name}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <Button 
              onClick={handleSubmit}
              className="px-8"
              disabled={!file}
            >
              Submit Dataset
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Upload;