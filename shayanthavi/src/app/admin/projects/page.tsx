"use client";

import { useEffect, useState } from "react";
import { AdminForm, FormField, inputClass, textareaClass } from "@/components/admin/AdminForm";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TagInput } from "@/components/admin/TagInput";
import type { ProjectsData, ProjectData } from "@/lib/content/types";

export default function AdminProjectsPage() {
  const [data, setData] = useState<ProjectsData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/content/projects")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMessage(res.ok ? { type: "success", text: "Projects updated!" } : { type: "error", text: "Failed to save." });
  }

  function updateProject(index: number, field: keyof ProjectData, value: unknown) {
    if (!data) return;
    const projects = [...data.projects];
    projects[index] = { ...projects[index], [field]: value };
    setData({ ...data, projects });
  }

  function addProject() {
    if (!data) return;
    setData({
      ...data,
      projects: [
        ...data.projects,
        {
          title: "New Project",
          description: "Project description",
          skills: [],
          demoUrl: "",
          mainImageUrl: "",
          color: "from-teal to-teal-dark",
          bgGradient: "from-teal/10 to-olive/10",
          sortOrder: data.projects.length,
          screenshots: [],
        },
      ],
    });
  }

  function removeProject(index: number) {
    if (!data) return;
    setData({ ...data, projects: data.projects.filter((_, i) => i !== index) });
  }

  function addScreenshot(projectIndex: number, url: string) {
    if (!data || !url) return;
    const projects = [...data.projects];
    const screenshots = [...projects[projectIndex].screenshots, { imageUrl: url, sortOrder: projects[projectIndex].screenshots.length }];
    projects[projectIndex] = { ...projects[projectIndex], screenshots };
    setData({ ...data, projects });
  }

  if (!data) return <p className="text-gray-500">Loading...</p>;

  return (
    <AdminForm title="Edit Projects Section" onSubmit={handleSubmit} saving={saving} message={message}>
      <FormField label="Section Heading">
        <input className={inputClass} value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })} />
      </FormField>
      <FormField label="Subtitle">
        <input className={inputClass} value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} />
      </FormField>

      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Projects ({data.projects.length})</h3>
        <button type="button" onClick={addProject} className="px-3 py-1 bg-teal text-white text-sm rounded-lg">
          Add Project
        </button>
      </div>

      {data.projects.map((project, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">Project {index + 1}</span>
            <button type="button" onClick={() => removeProject(index)} className="text-red-500 text-sm">
              Remove
            </button>
          </div>
          <FormField label="Title">
            <input className={inputClass} value={project.title} onChange={(e) => updateProject(index, "title", e.target.value)} />
          </FormField>
          <FormField label="Description">
            <textarea className={textareaClass} value={project.description} onChange={(e) => updateProject(index, "description", e.target.value)} />
          </FormField>
          <FormField label="Demo URL">
            <input className={inputClass} value={project.demoUrl} onChange={(e) => updateProject(index, "demoUrl", e.target.value)} />
          </FormField>
          <TagInput label="Skills" tags={project.skills} onChange={(skills) => updateProject(index, "skills", skills)} />
          <ImageUploader
            label="Main Image"
            value={project.mainImageUrl}
            onChange={(url) => updateProject(index, "mainImageUrl", url)}
          />
          <ImageUploader
            label="Add Screenshot"
            value=""
            onChange={(url) => addScreenshot(index, url)}
          />
          {project.screenshots.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.screenshots.map((s, si) => (
                <div key={si} className="relative">
                  <img src={s.imageUrl} alt="" className="w-20 h-20 object-cover rounded border" />
                  <button
                    type="button"
                    onClick={() => {
                      const screenshots = project.screenshots.filter((_, i) => i !== si);
                      updateProject(index, "screenshots", screenshots);
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </AdminForm>
  );
}
