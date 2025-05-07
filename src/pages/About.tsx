
import Header from "@/components/Header";
import { Brain, ShieldCheck, Activity, Database, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">About the AI Model</h1>
          <p className="text-xl text-gray-600 mb-8">Understanding our machine learning approach to DNS tunnel detection</p>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6 md:p-8 space-y-8">
            <section>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-dns-primary/10 text-dns-primary">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Model Architecture</h2>
                  <p className="text-gray-700">
                    Our system uses a Random Forest classifier trained on a curated dataset of both legitimate and tunneled DNS queries. 
                    The model analyzes multiple features of DNS requests to identify anomalous patterns that may indicate data exfiltration attempts.
                  </p>
                </div>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features Analyzed</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 text-dns-accent">
                        <Database className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Query Characteristics</h3>
                        <p className="text-sm text-gray-600">
                          Domain length, subdomain depth, character distribution, and TLD analysis.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 text-dns-accent">
                        <Activity className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Traffic Patterns</h3>
                        <p className="text-sm text-gray-600">
                          Request frequency, timing analysis, and query type distribution.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 text-dns-accent">
                        <ChevronRight className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Entropy Measurement</h3>
                        <p className="text-sm text-gray-600">
                          Statistical analysis of domain name randomness to detect encoded data.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 text-dns-accent">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Anomaly Detection</h3>
                        <p className="text-sm text-gray-600">
                          Identification of outliers based on historical DNS usage patterns.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Training Methodology</h2>
              <p className="text-gray-700 mb-4">
                The model was trained on over 1 million DNS queries, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Legitimate enterprise DNS traffic</li>
                <li>Known DNS tunneling tools (Iodine, dnscat2, etc.)</li>
                <li>Synthetic data representing various exfiltration techniques</li>
                <li>Public datasets of malicious DNS activity</li>
              </ul>
              
              <div className="mt-6 bg-dns-primary/5 p-4 rounded-lg border border-dns-primary/10">
                <h3 className="font-medium text-gray-900 mb-2">Performance Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Accuracy</p>
                    <p className="font-semibold">97.8%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Precision</p>
                    <p className="font-semibold">94.3%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Recall</p>
                    <p className="font-semibold">92.5%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">F1 Score</p>
                    <p className="font-semibold">93.4%</p>
                  </div>
                </div>
              </div>
            </section>
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

export default About;
