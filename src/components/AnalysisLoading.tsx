
import { Brain } from "lucide-react";

const AnalysisLoading = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-dns-accent/30 border-t-dns-accent animate-spin"></div>
        </div>
        <div className="p-10 rounded-full bg-dns-primary/10 border border-dns-primary/20">
          <Brain size={64} className="text-dns-primary animate-brain-pulse" />
        </div>
      </div>
      
      <h3 className="text-xl font-medium text-gray-900 mt-8 mb-2">
        Analyzing DNS patterns using trained AI model...
      </h3>
      
      <div className="text-sm text-gray-500 max-w-md text-center">
        Our Random Forest model is examining network traffic characteristics, evaluating query
        entropy, and identifying potential tunneling patterns.
      </div>
      
      <div className="mt-8 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-dns-primary rounded-full relative">
          <div className="scan-line"></div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center space-x-2">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-xs font-medium text-gray-500 px-4 py-1 bg-white rounded-full border border-gray-200">
          This may take a few moments
        </span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
    </div>
  );
};

export default AnalysisLoading;
