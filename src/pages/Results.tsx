
import { useState } from "react";
import Header from "@/components/Header";
import ResultsTable from "@/components/ResultsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { simulateAnalysis } from "@/utils/analysisUtils";
import { AnalysisResult } from "@/types";
import { SearchX } from "lucide-react";

const Results = () => {
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDemoLoad = async () => {
    setIsLoading(true);
    try {
      const demoResults = await simulateAnalysis(2000); // 2 seconds for demo data
      setResults(demoResults);
      toast({
        title: "Demo Data Loaded",
        description: "Sample analysis results have been loaded for demonstration.",
      });
    } catch (error) {
      toast({
        title: "Error Loading Demo Data",
        description: "Failed to load demonstration data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Analysis Results</h1>
              <p className="text-gray-600">Review and manage your DNS traffic analysis history</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button 
                onClick={handleDemoLoad}
                disabled={isLoading}
                className="dns-primary-button"
              >
                {isLoading ? "Loading..." : "Load Demo Data"}
              </Button>
            </div>
          </div>
          
          {results ? (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Total Queries</p>
                    <p className="text-2xl font-semibold">{results.totalQueries}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Suspicious Queries</p>
                    <p className="text-2xl font-semibold text-dns-warning">{results.suspiciousQueries}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Benign Queries</p>
                    <p className="text-2xl font-semibold text-dns-success">{results.benignQueries}</p>
                  </div>
                </div>
              </div>
              
              <ResultsTable queries={results.queries} />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-10 text-center">
              <div className="max-w-md mx-auto">
                <SearchX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-medium text-gray-900 mb-2">No Results Available</h2>
                <p className="text-gray-600 mb-6">
                  You haven't analyzed any DNS traffic data yet, or you can load demo data to see example results.
                </p>
                <div className="flex justify-center">
                  <Button onClick={handleDemoLoad} disabled={isLoading} className="dns-primary-button">
                    {isLoading ? "Loading..." : "Load Demo Data"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
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

export default Results;
