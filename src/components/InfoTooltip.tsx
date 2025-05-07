
import { useState, useRef } from "react";
import { Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { InfoTooltipProps } from "@/types";

const InfoTooltip = ({ content }: InfoTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help inline-flex">
            <Info className="h-4 w-4 text-dns-primary/70 ml-1" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs bg-white p-2 text-sm">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
