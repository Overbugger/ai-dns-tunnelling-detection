
import { useState, useMemo } from "react";
import { ResultsTableProps, DNSQuery } from "@/types";
import { Search, Filter, BadgeAlert, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InfoTooltip from "./InfoTooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ResultsTable = ({ queries }: ResultsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "suspicious" | "benign">("all");

  const filteredQueries = useMemo(() => {
    return queries.filter(query => {
      const matchesSearch = query.domain.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "all" || 
        (filter === "suspicious" && query.classification === "Suspicious") ||
        (filter === "benign" && query.classification === "Benign");
      
      return matchesSearch && matchesFilter;
    });
  }, [queries, searchTerm, filter]);

  return (
    <div className="w-full dns-card overflow-hidden">
      <div className="p-4 md:p-6 border-b">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Query Results</h3>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-gray-50"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="h-10"
            >
              All
            </Button>
            <Button
              variant={filter === "suspicious" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("suspicious")}
              className="h-10"
            >
              <BadgeAlert className="h-4 w-4 mr-1" />
              Suspicious
            </Button>
            <Button
              variant={filter === "benign" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("benign")}
              className="h-10"
            >
              Benign
            </Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Domain Name</TableHead>
              <TableHead>Query Type</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Length
                  <InfoTooltip content="The length of the domain name in characters. Unusually long domains may indicate encoded data." />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Entropy
                  <InfoTooltip content="Entropy measures the randomness of characters. Higher values (>3.5) may indicate encoded or encrypted data being tunneled." />
                </div>
              </TableHead>
              <TableHead>Classification</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Confidence
                  <InfoTooltip content="The AI model's confidence level in its classification decision." />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQueries.length > 0 ? (
              filteredQueries.map((query) => (
                <TableRow key={query.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {query.domain}
                  </TableCell>
                  <TableCell>{query.queryType}</TableCell>
                  <TableCell>{query.queryLength}</TableCell>
                  <TableCell>{query.entropy.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        query.classification === "Suspicious"
                          ? "bg-dns-warning/10 text-dns-warning"
                          : "bg-dns-success/10 text-dns-success"
                      }`}
                    >
                      {query.classification === "Suspicious" && (
                        <BadgeAlert className="h-3 w-3 mr-1" />
                      )}
                      {query.classification}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          query.classification === "Suspicious"
                            ? "bg-dns-warning"
                            : "bg-dns-success"
                        }`}
                        style={{ width: `${query.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {query.confidence.toFixed(1)}%
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResultsTable;
