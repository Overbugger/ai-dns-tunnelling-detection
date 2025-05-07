
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

const ResultsTable = ({ queries }: ResultsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "suspicious" | "benign">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredQueries = useMemo(() => {
    return queries.filter(query => {
      const matchesSearch = query.domain.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === "all" || 
        (filter === "suspicious" && query.classification === "Suspicious") ||
        (filter === "benign" && query.classification === "Benign");
      
      return matchesSearch && matchesFilter;
    });
  }, [queries, searchTerm, filter]);

  const totalPages = Math.ceil(filteredQueries.length / ITEMS_PER_PAGE);
  
  const paginatedQueries = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredQueries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredQueries, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
            {paginatedQueries.length > 0 ? (
              paginatedQueries.map((query) => (
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
      
      {filteredQueries.length > 0 && (
        <div className="py-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                let pageNumber: number;
                
                // Calculate page number based on current page
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }
                
                // Only render if page number is valid
                if (pageNumber > 0 && pageNumber <= totalPages) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink 
                        isActive={pageNumber === currentPage}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return null;
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
