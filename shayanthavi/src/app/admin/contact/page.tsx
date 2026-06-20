"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, inputClass } from "@/components/admin/AdminForm";
import { IconPicker } from "@/components/admin/IconPicker";
import type { ContactData, SocialLink } from "@/lib/content/types";

export default function AdminContactPage() {
  const [data, setData] = useState<ContactData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/content/contact")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMessage(res.ok ? { type: "success", text: "Contact updated!" } : { type: "error", text: "Failed to save." });
  }

  function updateSocial(index: number, field: keyof SocialLink, value: string) {
    if (!data) return;
    const socialLinks = [...data.socialLinks];
    socialLinks[index] = { ...socialLinks[index], [field]: value };
    setData({ ...data, socialLinks });
  }

  function addSocial() {
    if (!data) return;
    setData({
      ...data,
      socialLinks: [
        ...data.socialLinks,
        { name: "GitHub", url: "https://github.com", iconKey: "FaGithub", color: "#333" },
      ],
    });
  }

  if (!data) return <p className="text-gray-500">Loading...</p>;

  return (
    <AdminForm title="Edit Contact Section" onSubmit={handleSubmit} saving={saving} message={message}>
      <FormField label="Section Heading">
        <input className={inputClass} value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })} />
      </FormField>
      <FormField label="Subtitle">
        <input className={inputClass} value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} />
      </FormField>
      <FormField label="Email">
        <input className={inputClass} type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
      </FormField>
      <FormField label="Phone">
        <input className={inputClass} value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
      </FormField>
      <FormField label="Location">
        <input className={inputClass} value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} />
      </FormField>
      <FormField label="Social Note">
        <input className={inputClass} value={data.socialNote} onChange={(e) => setData({ ...data, socialNote: e.target.value })} />
      </FormField>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-3">
          <h3 className="font-semibold">Social Links</h3>
          <button type="button" onClick={addSocial} className="px-3 py-1 bg-teal text-white text-sm rounded-lg">
            Add Link
          </button>
        </div>
        {data.socialLinks.map((social, index) => (
          <div key={index} className="border rounded-lg p-3 mb-3 grid md:grid-cols-2 gap-3">
            <FormField label="Platform Name">
              <input className={inputClass} value={social.name} onChange={(e) => updateSocial(index, "name", e.target.value)} />
            </FormField>
            <FormField label="URL">
              <input className={inputClass} value={social.url} onChange={(e) => updateSocial(index, "url", e.target.value)} />
            </FormField>
            <FormField label="Color">
              <input className={inputClass} value={social.color} onChange={(e) => updateSocial(index, "color", e.target.value)} />
            </FormField>
            <IconPicker value={social.iconKey} onChange={(key) => updateSocial(index, "iconKey", key)} />
          </div>
        ))}
      </div>
    </AdminForm>
  );
}
