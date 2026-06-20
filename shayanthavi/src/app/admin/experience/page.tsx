"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, inputClass, textareaClass } from "@/components/admin/AdminForm";
import { IconPicker } from "@/components/admin/IconPicker";
import { TagInput } from "@/components/admin/TagInput";
import type { ExperienceData, ExperiencePositionData, ExperienceProjectData } from "@/lib/content/types";

export default function AdminExperiencePage() {
  const [data, setData] = useState<ExperienceData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/content/experience")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/experience", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMessage(res.ok ? { type: "success", text: "Experience updated!" } : { type: "error", text: "Failed to save." });
  }

  function updatePosition(posIndex: number, field: keyof ExperiencePositionData, value: string) {
    if (!data) return;
    const positions = [...data.positions];
    positions[posIndex] = { ...positions[posIndex], [field]: value };
    setData({ ...data, positions });
  }

  function updateProject(posIndex: number, projIndex: number, field: keyof ExperienceProjectData, value: unknown) {
    if (!data) return;
    const positions = [...data.positions];
    const projects = [...positions[posIndex].projects];
    projects[projIndex] = { ...projects[projIndex], [field]: value };
    positions[posIndex] = { ...positions[posIndex], projects };
    setData({ ...data, positions });
  }

  if (!data) return <p className="text-gray-500">Loading...</p>;

  return (
    <AdminForm title="Edit Experience Section" onSubmit={handleSubmit} saving={saving} message={message}>
      <FormField label="Section Heading">
        <input className={inputClass} value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })} />
      </FormField>
      <FormField label="Subtitle">
        <input className={inputClass} value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} />
      </FormField>

      {data.positions.map((position, posIndex) => (
        <div key={posIndex} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <h3 className="font-semibold text-gray-900">Position {posIndex + 1}</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <FormField label="Role">
              <input className={inputClass} value={position.role} onChange={(e) => updatePosition(posIndex, "role", e.target.value)} />
            </FormField>
            <FormField label="Company">
              <input className={inputClass} value={position.company} onChange={(e) => updatePosition(posIndex, "company", e.target.value)} />
            </FormField>
            <FormField label="Duration">
              <input className={inputClass} value={position.duration} onChange={(e) => updatePosition(posIndex, "duration", e.target.value)} />
            </FormField>
            <FormField label="Location">
              <input className={inputClass} value={position.location} onChange={(e) => updatePosition(posIndex, "location", e.target.value)} />
            </FormField>
          </div>

          {position.projects.map((project, projIndex) => (
            <div key={projIndex} className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Project: {project.name}</h4>
              <FormField label="Project Name">
                <input
                  className={inputClass}
                  value={project.name}
                  onChange={(e) => updateProject(posIndex, projIndex, "name", e.target.value)}
                />
              </FormField>
              <FormField label="Description">
                <textarea
                  className={textareaClass}
                  value={project.description}
                  onChange={(e) => updateProject(posIndex, projIndex, "description", e.target.value)}
                />
              </FormField>
              <FormField label="Your Role">
                <input
                  className={inputClass}
                  value={project.role}
                  onChange={(e) => updateProject(posIndex, projIndex, "role", e.target.value)}
                />
              </FormField>
              <TagInput
                label="Highlights"
                tags={project.highlights}
                onChange={(tags) => updateProject(posIndex, projIndex, "highlights", tags)}
              />
            </div>
          ))}
        </div>
      ))}
    </AdminForm>
  );
}
