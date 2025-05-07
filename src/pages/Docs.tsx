
import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertCircle, 
  FileSpreadsheet, 
  Search, 
  Filter, 
  BadgeAlert, 
  ChevronRight, 
  BarChart4, 
  FileUp
} from "lucide-react";
import InfoTooltip from "@/components/InfoTooltip";

const Docs = () => {
  const [activeTab, setActiveTab] = useState("getting-started");
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Documentation</h1>
          <p className="text-lg text-gray-600 mb-8">Learn how to use DNS Sentinel to analyze and detect DNS tunneling threats</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="hidden md:block">
              <div className="sticky top-24 space-y-1">
                <button 
                  onClick={() => setActiveTab("getting-started")}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "getting-started" 
                      ? "bg-dns-primary text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Getting Started
                </button>
                <button 
                  onClick={() => setActiveTab("file-upload")}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "file-upload" 
                      ? "bg-dns-primary text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  File Upload
                </button>
                <button 
                  onClick={() => setActiveTab("understanding-results")}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "understanding-results" 
                      ? "bg-dns-primary text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Understanding Results
                </button>
                <button 
                  onClick={() => setActiveTab("faq")}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "faq" 
                      ? "bg-dns-primary text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  FAQ
                </button>
              </div>
            </div>
            
            {/* Mobile Tabs */}
            <div className="md:hidden mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                  <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                  <TabsTrigger value="file-upload">File Upload</TabsTrigger>
                  <TabsTrigger value="understanding-results">Results</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Content */}
            <div className="md:col-span-3">
              {activeTab === "getting-started" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>What is DNS Sentinel?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        DNS Sentinel is an AI-powered tool designed to detect DNS tunneling attacks by analyzing DNS traffic patterns.
                      </p>
                      <p>
                        DNS tunneling is a technique that encodes data of other programs or protocols in DNS queries and responses.
                        Malicious actors can use this method to bypass security controls and exfiltrate data from protected networks.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>How it Works</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-dns-primary/10 rounded-full p-2 mt-1">
                          <FileUp className="w-5 h-5 text-dns-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">1. Upload Your DNS Data</h3>
                          <p className="text-gray-600">
                            Start by uploading your DNS logs in .pcap or .csv format. The system accepts files up to 10MB in size.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-dns-primary/10 rounded-full p-2 mt-1">
                          <BarChart4 className="w-5 h-5 text-dns-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">2. AI-Powered Analysis</h3>
                          <p className="text-gray-600">
                            Our machine learning model processes your data, analyzing multiple features of DNS queries to identify suspicious patterns.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-dns-primary/10 rounded-full p-2 mt-1">
                          <Search className="w-5 h-5 text-dns-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">3. Review Results</h3>
                          <p className="text-gray-600">
                            Examine the analysis results, which include a summary of findings and detailed classifications of DNS queries.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {activeTab === "file-upload" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Supported File Formats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-dns-primary/10 rounded-full p-2 mt-1">
                          <FileSpreadsheet className="w-5 h-5 text-dns-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">.pcap Files</h3>
                          <p className="text-gray-600">
                            Packet capture files containing DNS traffic. These can be generated using tools like Wireshark or tcpdump.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-dns-primary/10 rounded-full p-2 mt-1">
                          <FileSpreadsheet className="w-5 h-5 text-dns-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">.csv Files</h3>
                          <p className="text-gray-600">
                            Comma-separated values files containing DNS query data. The CSV must include columns for domain name, query type, and timestamp.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Requirements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Maximum file size: <span className="font-semibold">10MB</span></li>
                        <li>File formats: <span className="font-semibold">.pcap</span> or <span className="font-semibold">.csv</span></li>
                        <li>For CSV files: Required columns include domain name, query type, and timestamp</li>
                        <li>Minimum 10 DNS queries required for meaningful analysis</li>
                      </ul>
                      
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-yellow-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              For best results, upload files containing at least 100 DNS queries to provide sufficient data for the AI model.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {activeTab === "understanding-results" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Results Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>After analysis, you'll see a summary of the findings with the following metrics:</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Total Queries</p>
                          <p className="text-xl font-semibold">324</p>
                          <p className="text-xs text-gray-500 mt-1">Total number of DNS queries analyzed in the dataset</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Suspicious Queries</p>
                          <p className="text-xl font-semibold text-dns-warning">42</p>
                          <p className="text-xs text-gray-500 mt-1">Queries identified as potentially malicious</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Benign Queries</p>
                          <p className="text-xl font-semibold text-dns-success">282</p>
                          <p className="text-xs text-gray-500 mt-1">Queries identified as normal traffic</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Understanding Detailed Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p>The detailed results table provides information on individual DNS queries with the following columns:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-2 font-medium border-b">
                            Domain Name
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-600">
                              The domain name queried in the DNS request
                            </p>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-2 font-medium border-b">
                            Query Type
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-600">
                              Type of DNS query (e.g., A, AAAA, TXT, MX)
                            </p>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-2 font-medium border-b">
                            Length
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-600">
                              Length of the domain name in characters. Unusually long domains may indicate encoded data.
                            </p>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-2 font-medium border-b">
                            Entropy
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-600">
                              Measure of randomness in the domain name. Higher values (>3.5) may indicate encoded data being tunneled.
                            </p>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-2 font-medium border-b">
                            Classification
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-600">
                              The AI model's verdict: <span className="text-dns-success font-medium">Benign</span> or <span className="text-dns-warning font-medium">Suspicious</span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-2 font-medium border-b">
                            Confidence
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-600">
                              The AI model's confidence level in its classification (0-100%)
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg mt-4">
                        <h3 className="font-medium text-gray-900 mb-2">Filtering and Searching</h3>
                        <p className="text-gray-600 mb-2">
                          You can filter the results table to show:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          <li>All queries</li>
                          <li>Only suspicious queries</li> 
                          <li>Only benign queries</li>
                        </ul>
                        <p className="text-gray-600 mt-2">
                          Use the search field to find specific domains in the results.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {activeTab === "faq" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">
                          What is DNS tunneling?
                        </h3>
                        <p className="text-gray-600">
                          DNS tunneling is a technique used to encode the data of other programs or protocols in DNS queries and responses.
                          It is primarily used to bypass security controls, exfiltrate sensitive data, or facilitate command-and-control communications for malware.
                        </p>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                          How accurate is the AI model?
                        </h3>
                        <p className="text-gray-600">
                          Our AI model has an overall accuracy of 97.8% based on testing against known DNS tunneling techniques and legitimate traffic patterns.
                          The model provides confidence scores to help you evaluate each detection.
                        </p>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                          What should I do if suspicious queries are detected?
                        </h3>
                        <p className="text-gray-600">
                          If suspicious queries are detected, we recommend:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
                          <li>Investigate the source IP address associated with the queries</li>
                          <li>Check if the destination domains are legitimate</li>
                          <li>Review the systems generating these queries for signs of compromise</li>
                          <li>Consider implementing DNS monitoring and blocking rules in your security infrastructure</li>
                        </ul>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                          How do I export my analysis results?
                        </h3>
                        <p className="text-gray-600">
                          Currently, direct export functionality is not available. However, you can capture screenshots of the analysis summary and results tables for documentation purposes.
                          We plan to add CSV and PDF export capabilities in future updates.
                        </p>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                          Is my data kept private?
                        </h3>
                        <p className="text-gray-600">
                          Yes, all DNS data uploaded to DNS Sentinel is processed locally in your browser and is not stored on our servers.
                          The analysis is performed client-side using a pre-trained machine learning model, ensuring your sensitive network data remains confidential.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
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

export default Docs;
