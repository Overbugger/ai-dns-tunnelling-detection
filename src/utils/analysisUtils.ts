
import { AnalysisResult, DNSQuery } from "../types";

// Common DNS query types
const DNS_QUERY_TYPES = ["A", "AAAA", "MX", "TXT", "CNAME", "NS", "PTR", "SRV"];

// Common domain TLDs
const DOMAIN_TLDS = [".com", ".net", ".org", ".io", ".dev", ".info", ".biz"];

// Generate random integer between min and max (inclusive)
const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random float between min and max with decimal places
const randomFloat = (min: number, max: number, decimals = 2) => {
  const random = Math.random() * (max - min) + min;
  return Number(random.toFixed(decimals));
};

// Generate random domain name
const generateDomain = (isSuspicious: boolean) => {
  const length = isSuspicious ? randomInt(15, 30) : randomInt(5, 15);
  let domain = "";
  
  // For suspicious domains, occasionally add random characters and numbers
  if (isSuspicious && Math.random() > 0.5) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789-";
    for (let i = 0; i < length; i++) {
      domain += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } else {
    // Dictionary words for normal domains
    const words = ["cloud", "secure", "net", "web", "data", "mail", "api", "cdn", "app", "tech", "cyber", "dev"];
    const numWords = isSuspicious ? randomInt(3, 5) : randomInt(1, 3);
    
    for (let i = 0; i < numWords; i++) {
      domain += words[Math.floor(Math.random() * words.length)];
      if (isSuspicious && Math.random() > 0.7) {
        domain += randomInt(0, 999);
      }
    }
  }

  const tld = DOMAIN_TLDS[Math.floor(Math.random() * DOMAIN_TLDS.length)];
  return domain + tld;
};

// Calculate entropy for a string (measure of randomness)
const calculateEntropy = (str: string) => {
  const len = str.length;
  const frequencies: Record<string, number> = {};
  
  for (let i = 0; i < len; i++) {
    const char = str.charAt(i);
    if (frequencies[char]) {
      frequencies[char]++;
    } else {
      frequencies[char] = 1;
    }
  }
  
  let entropy = 0;
  Object.values(frequencies).forEach(freq => {
    const p = freq / len;
    entropy -= p * Math.log2(p);
  });
  
  return entropy;
};

// Generate a single DNS query
const generateDNSQuery = (isSuspicious: boolean): DNSQuery => {
  const domain = generateDomain(isSuspicious);
  const queryType = DNS_QUERY_TYPES[Math.floor(Math.random() * DNS_QUERY_TYPES.length)];
  const entropy = isSuspicious 
    ? randomFloat(3.5, 5.0) 
    : randomFloat(1.0, 3.5);
  
  const confidence = isSuspicious 
    ? randomFloat(70, 99) 
    : randomFloat(75, 99);
  
  const now = new Date();
  const timestamp = now.toISOString();
  
  return {
    id: Math.random().toString(36).substring(2, 15),
    domain,
    queryType,
    queryLength: domain.length,
    entropy,
    classification: isSuspicious ? "Suspicious" : "Benign",
    confidence,
    timestamp
  };
};

// Simulate analysis with random results
export const simulateAnalysis = (delay = 3000): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Total number of queries to generate
      const totalQueries = randomInt(50, 200);
      
      // Determine percentage of suspicious queries (5-20%)
      const suspiciousPercentage = randomInt(5, 20) / 100;
      const suspiciousQueries = Math.floor(totalQueries * suspiciousPercentage);
      const benignQueries = totalQueries - suspiciousQueries;
      
      // Generate queries
      const queries: DNSQuery[] = [];
      
      // Generate benign queries
      for (let i = 0; i < benignQueries; i++) {
        queries.push(generateDNSQuery(false));
      }
      
      // Generate suspicious queries
      for (let i = 0; i < suspiciousQueries; i++) {
        queries.push(generateDNSQuery(true));
      }
      
      // Shuffle the array to mix benign and suspicious queries
      for (let i = queries.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [queries[i], queries[j]] = [queries[j], queries[i]];
      }
      
      const result: AnalysisResult = {
        totalQueries,
        benignQueries,
        suspiciousQueries,
        queries
      };
      
      resolve(result);
    }, delay);
  });
};

export const validateFile = (file: File | null): { valid: boolean; error?: string } => {
  if (!file) return { valid: false, error: "No file selected." };
  
  const allowedExtensions = ['.pcap', '.csv'];
  const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  
  if (!allowedExtensions.includes(fileExtension)) {
    return { 
      valid: false, 
      error: "Invalid file format. Please upload a .pcap or .csv file." 
    };
  }
  
  // 50MB size limit
  const maxSizeMB = 50;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  if (file.size > maxSizeBytes) {
    return { 
      valid: false, 
      error: `File size exceeds the ${maxSizeMB}MB limit.` 
    };
  }
  
  return { valid: true };
};
