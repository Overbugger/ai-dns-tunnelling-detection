
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import AnalysisLoading from "@/components/AnalysisLoading";
import ResultsSummary from "@/components/ResultsSummary";
import ResultsTable from "@/components/ResultsTable";
import { simulateAnalysis } from "@/utils/analysisUtils";
import { AnalysisResult } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    // Reset results when a new file is selected
    setResults(null);
  };

  const handleRunAnalysis = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a file to analyze.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      const analysisResults = await simulateAnalysis(4000); // 4 seconds delay
      
      setResults(analysisResults);
      
      toast({
        title: "Analysis Complete",
        description: `Analyzed ${analysisResults.totalQueries} DNS queries with ${analysisResults.suspiciousQueries} suspicious entries detected.`,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred while analyzing the file.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI DNS Tunneling Detection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by Machine Learning. Detect DNS-based threats intelligently.
            </p>
          </div>
          
          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {isAnalyzing ? (
              <AnalysisLoading />
            ) : !results ? (
              <div className="p-6 md:p-10 space-y-8">
                <div className="max-w-xl mx-auto">
                  <FileUpload
                    onFileSelected={handleFileSelected}
                    isUploading={isAnalyzing}
                  />
                </div>
                
                <div className="flex justify-center">
                  <Button
                    className="dns-primary-button py-2 px-6"
                    size="lg"
                    disabled={!file || isAnalyzing}
                    onClick={handleRunAnalysis}
                  >
                    Run AI Analysis
                  </Button>
                </div>
                
                <div className="flex items-center justify-center text-sm text-gray-500 space-x-2">
                  <div className="w-8 h-px bg-gray-200"></div>
                  <span>Supported formats: .pcap and .csv</span>
                  <div className="w-8 h-px bg-gray-200"></div>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900">Analysis Results</h2>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setResults(null);
                      setFile(null);
                    }}
                  >
                    New Analysis
                  </Button>
                </div>
                
                <ResultsSummary results={results} />
                
                <ResultsTable queries={results.queries} />
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 DNS Sentinel. AI-powered DNS security monitoring.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
