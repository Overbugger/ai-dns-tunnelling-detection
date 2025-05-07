
export interface DNSQuery {
  id: string;
  domain: string;
  queryType: string;
  queryLength: number;
  entropy: number;
  classification: "Benign" | "Suspicious";
  confidence: number;
  timestamp: string;
}

export interface AnalysisResult {
  totalQueries: number;
  benignQueries: number;
  suspiciousQueries: number;
  queries: DNSQuery[];
}

export interface FileUploadProps {
  onFileSelected: (file: File) => void;
  isUploading: boolean;
}

export interface InfoTooltipProps {
  content: string;
}

export interface ResultsSummaryProps {
  results: AnalysisResult;
}

export interface ResultsTableProps {
  queries: DNSQuery[];
}
