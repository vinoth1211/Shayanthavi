"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, inputClass } from "@/components/admin/AdminForm";
import type { SiteSettingsData, NavItem } from "@/lib/content/types";

export default function AdminSettingsPage() {
  const [data, setData] = useState<SiteSettingsData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/content/settings")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMessage(res.ok ? { type: "success", text: "Settings updated!" } : { type: "error", text: "Failed to save." });
  }

  function updateNav(index: number, field: keyof NavItem, value: string) {
    if (!data) return;
    const navItems = [...data.navItems];
    navItems[index] = { ...navItems[index], [field]: value };
    setData({ ...data, navItems });
  }

  if (!data) return <p className="text-gray-500">Loading...</p>;

  return (
    <AdminForm title="Site Settings" onSubmit={handleSubmit} saving={saving} message={message}>
      <FormField label="Site Title">
        <input className={inputClass} value={data.siteTitle} onChange={(e) => setData({ ...data, siteTitle: e.target.value })} />
      </FormField>
      <FormField label="Meta Description">
        <input className={inputClass} value={data.metaDescription} onChange={(e) => setData({ ...data, metaDescription: e.target.value })} />
      </FormField>
      <FormField label="Logo Initials">
        <input className={inputClass} value={data.logoInitials} onChange={(e) => setData({ ...data, logoInitials: e.target.value })} maxLength={4} />
      </FormField>
      <FormField label="Footer Copyright Name">
        <input className={inputClass} value={data.footerCopyright} onChange={(e) => setData({ ...data, footerCopyright: e.target.value })} />
      </FormField>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-3">Navigation Items</h3>
        {data.navItems.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 mb-3">
            <FormField label="Label">
              <input className={inputClass} value={item.name} onChange={(e) => updateNav(index, "name", e.target.value)} />
            </FormField>
            <FormField label="Link">
              <input className={inputClass} value={item.href} onChange={(e) => updateNav(index, "href", e.target.value)} />
            </FormField>
          </div>
        ))}
      </div>
    </AdminForm>
  );
}
