"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, inputClass, textareaClass } from "@/components/admin/AdminForm";
import { IconPicker } from "@/components/admin/IconPicker";
import type { AboutData } from "@/lib/content/types";

export default function AdminAboutPage() {
  const [data, setData] = useState<AboutData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/content/about")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    setMessage(null);

    const res = await fetch("/api/content/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSaving(false);
    setMessage(res.ok ? { type: "success", text: "About section updated!" } : { type: "error", text: "Failed to save." });
  }

  function updateCard(index: number, field: string, value: string) {
    if (!data) return;
    const cards = [...data.cards];
    cards[index] = { ...cards[index], [field]: value };
    setData({ ...data, cards });
  }

  function addCard() {
    if (!data) return;
    setData({
      ...data,
      cards: [
        ...data.cards,
        {
          title: "New Role",
          description: "Description here",
          iconKey: "FaLaptopCode",
          gradient: "from-teal to-teal-dark",
          sortOrder: data.cards.length,
        },
      ],
    });
  }

  function removeCard(index: number) {
    if (!data) return;
    setData({ ...data, cards: data.cards.filter((_, i) => i !== index) });
  }

  if (!data) return <p className="text-gray-500">Loading...</p>;

  return (
    <AdminForm title="Edit About Section" onSubmit={handleSubmit} saving={saving} message={message}>
      <FormField label="Section Heading">
        <input className={inputClass} value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })} />
      </FormField>
      <FormField label="Intro Paragraph">
        <textarea className={textareaClass} value={data.intro} onChange={(e) => setData({ ...data, intro: e.target.value })} />
      </FormField>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Role Cards</h3>
          <button type="button" onClick={addCard} className="px-3 py-1 bg-teal text-white text-sm rounded-lg">
            Add Card
          </button>
        </div>
        {data.cards.map((card, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-500">Card {index + 1}</span>
              <button type="button" onClick={() => removeCard(index)} className="text-red-500 text-sm">
                Remove
              </button>
            </div>
            <FormField label="Title">
              <input className={inputClass} value={card.title} onChange={(e) => updateCard(index, "title", e.target.value)} />
            </FormField>
            <FormField label="Description">
              <textarea className={textareaClass} value={card.description} onChange={(e) => updateCard(index, "description", e.target.value)} />
            </FormField>
            <IconPicker value={card.iconKey} onChange={(key) => updateCard(index, "iconKey", key)} />
            <FormField label="Gradient Classes">
              <input className={inputClass} value={card.gradient} onChange={(e) => updateCard(index, "gradient", e.target.value)} />
            </FormField>
          </div>
        ))}
      </div>
    </AdminForm>
  );
}
