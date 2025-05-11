
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ResultsSummaryProps } from '@/types';
import InfoTooltip from './InfoTooltip';

const ResultsSummary = ({ results }: ResultsSummaryProps) => {
  const { totalQueries, benignQueries, suspiciousQueries } = results;
  
  const pieData = [
    { name: 'Benign', value: benignQueries },
    { name: 'Suspicious', value: suspiciousQueries }
  ];
  
  const COLORS = ['#4ECE5D', '#F72585'];
  
  const percentSuspicious = ((suspiciousQueries / totalQueries) * 100).toFixed(1);
  
  return (
    <div className="w-full dns-card p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Analysis Summary</h3>
          <p className="text-sm text-gray-500">Results of AI-powered DNS traffic analysis</p>
        </div>
        <span className="ai-badge">Powered by AI</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} queries`, undefined]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-col justify-center space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Total Queries</p>
              <p className="text-2xl font-semibold">{totalQueries}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">
                Suspicious Queries
                <InfoTooltip content="Queries identified as potential DNS tunneling attempts based on patterns, entropy, and other characteristics." />
              </p>
              <p className="text-2xl font-semibold text-dns-warning">{suspiciousQueries}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Benign Queries</p>
              <p className="text-2xl font-semibold text-dns-success">{benignQueries}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">
                Suspicious Rate
                <InfoTooltip content="Percentage of total queries classified as suspicious. Rates above 5% may indicate tunneling activity." />
              </p>
              <p className="text-2xl font-semibold">{percentSuspicious}%</p>
            </div>
          </div>
          
          {/* <div className="text-sm text-gray-500 bg-dns-primary/5 p-4 rounded-lg border border-dns-primary/10">
            <p>Analysis performed using a Random Forest model trained on real-world DNS traffic. The model has been optimized for high precision to minimize false positives in tunneling detection.</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;
