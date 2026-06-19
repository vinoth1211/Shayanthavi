"use client";

import { iconOptions, getIconSmall } from "@/lib/iconMap";

interface IconPickerProps {
  value: string;
  onChange: (key: string) => void;
  label?: string;
}

export function IconPicker({ value, onChange, label = "Icon" }: IconPickerProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        <span className="text-2xl text-teal">{getIconSmall(value)}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          {iconOptions.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
