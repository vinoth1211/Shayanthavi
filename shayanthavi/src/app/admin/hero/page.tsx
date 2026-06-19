"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, inputClass } from "@/components/admin/AdminForm";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { HeroData } from "@/lib/content/types";

export default function AdminHeroPage() {
  const [data, setData] = useState<HeroData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/content/hero")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    setMessage(null);

    const res = await fetch("/api/content/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSaving(false);
    if (res.ok) {
      setMessage({ type: "success", text: "Hero section updated successfully!" });
    } else {
      setMessage({ type: "error", text: "Failed to save changes." });
    }
  }

  if (!data) return <p className="text-gray-500">Loading...</p>;

  return (
    <AdminForm title="Edit Hero Section" onSubmit={handleSubmit} saving={saving} message={message}>
      <FormField label="Greeting">
        <input className={inputClass} value={data.greeting} onChange={(e) => setData({ ...data, greeting: e.target.value })} />
      </FormField>
      <FormField label="Full Name">
        <input className={inputClass} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
      </FormField>
      <FormField label="Tagline">
        <input className={inputClass} value={data.tagline} onChange={(e) => setData({ ...data, tagline: e.target.value })} />
      </FormField>
      <FormField label="University">
        <input className={inputClass} value={data.university} onChange={(e) => setData({ ...data, university: e.target.value })} />
      </FormField>
      <FormField label="CTA Button Label">
        <input className={inputClass} value={data.ctaLabel} onChange={(e) => setData({ ...data, ctaLabel: e.target.value })} />
      </FormField>
      <FormField label="CTA Link">
        <input className={inputClass} value={data.ctaHref} onChange={(e) => setData({ ...data, ctaHref: e.target.value })} />
      </FormField>
      <ImageUploader label="Profile Image" value={data.heroImageUrl} onChange={(url) => setData({ ...data, heroImageUrl: url })} />
      <ImageUploader label="CV (PDF)" value={data.cvUrl} onChange={(url) => setData({ ...data, cvUrl: url })} />
      <FormField label="CV Download Filename">
        <input className={inputClass} value={data.cvDownloadName} onChange={(e) => setData({ ...data, cvDownloadName: e.target.value })} />
      </FormField>
    </AdminForm>
  );
}
