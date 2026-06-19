"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, inputClass } from "@/components/admin/AdminForm";
import { IconPicker } from "@/components/admin/IconPicker";
import type { SkillsData } from "@/lib/content/types";

export default function AdminSkillsPage() {
  const [data, setData] = useState<SkillsData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/content/skills")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/skills", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMessage(res.ok ? { type: "success", text: "Skills updated!" } : { type: "error", text: "Failed to save." });
  }

  function updateItem(index: number, field: string, value: string) {
    if (!data) return;
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  }

  function addItem() {
    if (!data) return;
    setData({
      ...data,
      items: [
        ...data.items,
        { name: "New Skill", iconKey: "SiReact", color: "#000000", sortOrder: data.items.length },
      ],
    });
  }

  function removeItem(index: number) {
    if (!data) return;
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });
  }

  function moveItem(index: number, direction: -1 | 1) {
    if (!data) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= data.items.length) return;
    const items = [...data.items];
    [items[index], items[newIndex]] = [items[newIndex], items[index]];
    setData({ ...data, items: items.map((item, i) => ({ ...item, sortOrder: i })) });
  }

  if (!data) return <p className="text-gray-500">Loading...</p>;

  return (
    <AdminForm title="Edit Skills Section" onSubmit={handleSubmit} saving={saving} message={message}>
      <FormField label="Section Heading">
        <input className={inputClass} value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })} />
      </FormField>
      <FormField label="Subtitle">
        <input className={inputClass} value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} />
      </FormField>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Skills ({data.items.length})</h3>
          <button type="button" onClick={addItem} className="px-3 py-1 bg-teal text-white text-sm rounded-lg">
            Add Skill
          </button>
        </div>
        {data.items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3 grid md:grid-cols-2 gap-3">
            <FormField label="Name">
              <input className={inputClass} value={item.name} onChange={(e) => updateItem(index, "name", e.target.value)} />
            </FormField>
            <FormField label="Color">
              <input className={inputClass} value={item.color} onChange={(e) => updateItem(index, "color", e.target.value)} />
            </FormField>
            <IconPicker value={item.iconKey} onChange={(key) => updateItem(index, "iconKey", key)} />
            <div className="flex items-end gap-2">
              <button type="button" onClick={() => moveItem(index, -1)} className="px-2 py-1 border rounded text-sm">↑</button>
              <button type="button" onClick={() => moveItem(index, 1)} className="px-2 py-1 border rounded text-sm">↓</button>
              <button type="button" onClick={() => removeItem(index)} className="px-2 py-1 text-red-500 text-sm">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </AdminForm>
  );
}
