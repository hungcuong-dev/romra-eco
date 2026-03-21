"use client";

import type { FieldStatus } from "@/types";
import { STATUS_LABELS, STATUS_COLORS, STATUS_ICONS } from "@/lib/constants";

interface MapFiltersProps {
  activeFilters: FieldStatus[];
  onToggle: (status: FieldStatus) => void;
}

const statuses: FieldStatus[] = ["collected", "available"];

export default function MapFilters({ activeFilters, onToggle }: MapFiltersProps) {
  return (
    <div className="flex gap-1.5 md:gap-2">
      {statuses.map((status) => {
        const isActive = activeFilters.includes(status);
        return (
          <button
            key={status}
            onClick={() => onToggle(status)}
            className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-medium transition-all md:gap-2 md:px-4 md:py-2 md:text-sm ${
              isActive
                ? "border-transparent text-white shadow-md"
                : "border-gray-300 bg-white text-gray-500"
            }`}
            style={
              isActive ? { backgroundColor: STATUS_COLORS[status] } : undefined
            }
          >
            <span>{STATUS_ICONS[status]}</span>
            {STATUS_LABELS[status]}
          </button>
        );
      })}
    </div>
  );
}
