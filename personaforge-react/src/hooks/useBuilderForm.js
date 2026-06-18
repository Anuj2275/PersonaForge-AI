import { useState } from 'react';

const initialData = {
  name: '',
  category: '',
  domain: '',
  goal: '',
  level: '',
  timeAvail: 2,
  tone: '',
  responseLen: 2,
  exampleExchange: '',
  teaching: '',
  difficulty: 2,
  weakAreas: '',
  alwaysRules: ['Explain reasoning', 'Show trade-offs'],
  neverRules: ['Give solutions without guiding first'],
  memoryPrefs: [],
  notes: '',
};

export const categoryIcons = { mentor: '🎓', coach: '🏋️', advisor: '💼', expert: '🔬', assistant: '🤖', reviewer: '🔍' };
export const timeLabels = ['15 minutes / day', '1 hour / day', '2 hours / day', '4 hours / day'];
export const lenLabels = ['Minimal — short answers', 'Balanced', 'Thorough explanations', 'Exhaustive depth'];
export const diffLabels = ['Fixed easy difficulty', 'Gradual ramp', 'Fast ramp-up', 'Aggressive difficulty'];

export function useBuilderForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);

  const update = (field, value) => setData((d) => ({ ...d, [field]: value }));

  const addTag = (field, value) => {
    if (!value.trim()) return;
    setData((d) => ({ ...d, [field]: [...d[field], value.trim()] }));
  };

  const removeTag = (field, index) => {
    setData((d) => ({ ...d, [field]: d[field].filter((_, i) => i !== index) }));
  };

  const toggleMemoryPref = (value) => {
    setData((d) => ({
      ...d,
      memoryPrefs: d.memoryPrefs.includes(value)
        ? d.memoryPrefs.filter((v) => v !== value)
        : [...d.memoryPrefs, value],
    }));
  };

  const goToStep = (n) => setStep(Math.min(6, Math.max(1, n)));

  const promptPreview = () => {
    const { name, category, goal, level, tone, teaching } = data;
    if (!name && !category) return '';
    let p = '';
    if (name || category) p += `You are ${name || 'an AI ' + category}.`;
    if (level) p += `\n\nUser level: ${level}.`;
    if (goal) p += `\nGoal: ${goal.substring(0, 60)}...`;
    if (tone) p += `\n\nCommunication: ${tone}.`;
    if (teaching) p += `\nTeaching: ${teaching}-based approach.`;
    return p;
  };

  return { step, data, update, addTag, removeTag, toggleMemoryPref, goToStep, promptPreview };
}
