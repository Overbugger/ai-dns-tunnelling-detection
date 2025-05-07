
import { useState, useRef } from "react";
import { FileUploadProps } from "@/types";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { validateFile } from "@/utils/analysisUtils";
import { useToast } from "@/hooks/use-toast";

const FileUpload = ({ onFileSelected, isUploading }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFile(selectedFile);
  };

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    const validation = validateFile(selectedFile);
    
    if (!validation.valid) {
      toast({
        title: "Invalid File",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    onFileSelected(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0] || null;
    handleFile(droppedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors ${
          isDragging 
            ? "border-dns-primary bg-dns-primary/5" 
            : "border-gray-300 hover:border-dns-primary/70 hover:bg-gray-50"
        } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pcap,.csv"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />

        {!file ? (
          <div className="text-center">
            <div className="mx-auto h-12 w-12 mb-4 rounded-full bg-dns-primary/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-dns-primary" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Upload DNS Traffic File</h3>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop your .pcap or .csv files here, or click to browse
            </p>
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="dns-primary-button py-2 px-4"
              disabled={isUploading}
            >
              Select File
            </Button>
            <p className="text-xs text-gray-400 mt-4">
              Maximum file size: 50MB
            </p>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="bg-dns-primary/10 p-2 rounded-lg">
                  <Upload className="h-5 w-5 text-dns-primary" />
                </div>
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                className="text-gray-400 hover:text-gray-500"
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-2 text-center">
              File ready for analysis
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
