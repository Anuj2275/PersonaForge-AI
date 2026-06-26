import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionChip from "../components/builder/OptionChip";
import TagInput from "../components/builder/TagInput";
import { createPersona } from "../api/personaApi";
import {
  useBuilderForm,
  categoryIcons,
  timeLabels,
  lenLabels,
  diffLabels,
} from "../hooks/useBuilderForm";

const stepLabels = ["Basics", "Goals", "Style", "Learning", "Rules", "Review"];

const categories = [
  ["mentor", "🎓", "Mentor", "Teach & guide"],
  ["coach", "🏋️", "Coach", "Motivate & plan"],
  ["advisor", "💼", "Advisor", "Strategy & decisions"],
  ["expert", "🔬", "Expert", "Deep domain knowledge"],
  ["assistant", "🤖", "Assistant", "Execute & produce"],
  ["reviewer", "🔍", "Reviewer", "Critique & improve"],
];
const levels = [
  ["beginner", "🌱", "Beginner", "Just starting out"],
  ["intermediate", "⚡", "Intermediate", "Building real things"],
  ["advanced", "🚀", "Advanced", "Optimizing & architecting"],
];

const tones = [
  ["direct", "Direct"],
  ["friendly", "Friendly"],
  ["formal", "Formal"],
  ["casual", "Casual"],
];
const teachingStyles = [
  ["project_based", "Project Based"],
  ["theory_first", "Theory First"],
  ["hands_on", "Hands On"],
  ["mentor_style", "Mentor Style"],
];
const memoryOptions = [
  ["track_progress", "📈", "Track progress", "Remember what's been covered"],
  ["track_mistakes", "🔁", "Track mistakes", "Reinforce weak spots"],
  [
    "session_summary",
    "📋",
    "Session summaries",
    "End each session with a recap",
  ],
  ["roadmap", "🗺️", "Roadmap tracking", "Maintain a learning roadmap"],
];

export default function Builder() {
  const navigate = useNavigate();
  const {
    step,
    data,
    update,
    addTag,
    removeTag,
    toggleMemoryPref,
    goToStep,
    promptPreview,
  } = useBuilderForm();
  const [generating, setGenerating] = useState(false);
  const [genMessage, setGenMessage] = useState("Analyzing context...");

  const genSteps = [
    "Analyzing your context...",
    "Structuring behavior rules...",
    "Defining communication style...",
    "Building memory instructions...",
    "Scoring prompt quality...",
    "Finalizing persona blueprint...",
  ];

  const handleGenerate = async () => {
    try {
      if (!data.name) {
  alert("Persona name is required");
  return;
}

if (!data.goal) {
  alert("Goal is required");
  return;
}

if (!data.category) {
  alert("Category is required");
  return;
}

if (!data.tone) {
  alert("Communication style is required");
  return;
}

if (!data.teaching) {
  alert("Teaching style is required");
  return;
}
if (!data.goal?.trim()) {
  alert("Goal is required");
  return;
}

      const payload = {
        name: data.name,

        role: data.category.toUpperCase(),

        goal: data.goal,

        skillLevel:
          data.level === "beginner"
            ? "BEGINNER"
            : data.level === "advanced"
              ? "ADVANCED"
              : "INTERMEDIATE",

        communicationStyle: data.tone.toUpperCase(),

        // teachingStyle:
        //   data.teaching.toUpperCase(),
        teachingStyle: data.teaching
          ? data.teaching.replace(/_/g, '_').toUpperCase().replace(/PROJECT BASED/g, 'PROJECT_BASED').replace(/THEORY FIRST/g, 'THEORY_FIRST').replace(/HANDS ON/g, 'HANDS_ON').replace(/MENTOR STYLE/g, 'MENTOR_STYLE')
          : "PROJECT_BASED",

        responseLength:
          data.responseLen <= 1
            ? "SHORT"
            : data.responseLen === 2
              ? "MEDIUM"
              : "LONG",

        strictness: data.difficulty,

        memoryPreference: data.memoryPrefs.length > 0,

        constraints: data.notes,
      };

      setGenerating(true);
      for (let i = 0; i < genSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 400));
        setGenMessage(genSteps[i]);
      }
      const response = await createPersona(payload);

      navigate(`/persona/${response.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const pct = Math.round((step / 6) * 100);

  return (
    <div className="bg-bg text-textc font-sans min-h-screen">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[60px] border-b border-border bg-[rgba(10,10,15,0.9)] backdrop-blur-lg flex items-center px-6 gap-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 text-[13px] text-dim bg-transparent border-none cursor-pointer px-2.5 py-1.5 rounded-lg hover:text-muted hover:bg-white/[0.04] transition-all"
        >
          ← Dashboard
        </button>
        <span className="font-display text-[15px] font-semibold">
          New Persona
        </span>
        <div className="ml-auto">
          <button className="text-xs text-dim bg-transparent border border-border px-3.5 py-1.5 rounded-lg cursor-pointer hover:text-muted hover:border-borderH transition-all">
            Save draft
          </button>
        </div>
      </header>

      {/* Generating overlay */}
      {generating && (
        <div
          className="fixed inset-0 z-[100] bg-[rgba(10,10,15,0.92)] backdrop-blur-md flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Generating persona"
        >
          <div
            className="card relative overflow-hidden p-12 text-center max-w-[400px] w-[90%]"
            style={{ borderColor: "rgba(124,111,224,0.25)" }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(124,111,224,0.7),rgba(45,212,168,0.5),transparent)",
              }}
            />
            <span
              className="text-5xl mb-5 block animate-spinSlow"
              aria-hidden="true"
            >
              ⚡
            </span>
            <div className="font-display text-[22px] font-bold mb-2">
              Building your persona
            </div>
            <p className="text-sm text-muted mb-7">
              Analyzing your answers and generating a production-grade prompt...
            </p>
            <div className="bg-borderH rounded-full h-[3px] overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-purple to-teal rounded-full"
                style={{ animation: "genFill 2.5s ease forwards" }}
              />
            </div>
            <div className="text-xs text-dim" role="status" aria-live="polite">
              {genMessage}
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_380px] pt-[60px] min-h-screen">
        {/* MAIN FORM */}
        <main className="p-7 sm:p-10 pb-20">
          {/* Progress bar */}
          <div
            className="mb-10"
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={6}
          >
            <div className="flex gap-1.5 mb-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="flex-1 h-[3px] rounded-full transition-colors"
                  style={{
                    background:
                      n < step
                        ? "var(--purple)"
                        : n === step
                          ? "var(--purple-b)"
                          : "rgba(255,255,255,0.13)",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-dim">
              <span>Step {step} of 6</span>
              <span>{pct}%</span>
            </div>
          </div>

          {/* Step label track */}
          <div
            className="flex gap-1 mb-9 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Builder steps"
          >
            {stepLabels.map((label, i) => {
              const n = i + 1;
              const isActive = n === step;
              const isDone = n < step;
              return (
                <button
                  key={label}
                  onClick={() => goToStep(n)}
                  role="tab"
                  aria-selected={isActive}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-purple/[0.12] text-purple-b"
                      : isDone
                        ? "text-muted"
                        : "text-dim"
                  }`}
                >
                  <div
                    className="w-[18px] h-[18px] rounded-full text-[9px] font-semibold flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isDone
                        ? "rgba(45,212,168,0.15)"
                        : isActive
                          ? "rgba(124,111,224,0.25)"
                          : "rgba(255,255,255,0.07)",
                      color: isDone
                        ? "var(--teal)"
                        : isActive
                          ? "var(--purple-b)"
                          : "var(--dim)",
                    }}
                  >
                    {n}
                  </div>
                  {label}
                </button>
              );
            })}
          </div>

          {/* STEP 1: Basics */}
          {step === 1 && (
            <div className="animate-fade-slide">
              <StepHeader
                count="Step 1 of 6"
                title={
                  <>
                    What kind of persona
                    <br />
                    are you building?
                  </>
                }
                sub="Give your persona a name and define its core role. This shapes everything else."
              />
              <FormGroup
                label="Persona name"
                hint="Give it a name you'll recognize quickly in your library."
              >
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. React Mentor, Career Coach, DSA Tutor..."
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                  autoComplete="off"
                />
              </FormGroup>
              <FormGroup label="Persona category">
                <div
                  className="grid gap-2.5"
                  style={{
                    gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))",
                  }}
                  role="radiogroup"
                  aria-label="Select persona category"
                >
                  {categories.map(([val, icon, label, sub]) => (
                    <OptionChip
                      key={val}
                      icon={icon}
                      label={label}
                      sub={sub}
                      selected={data.category === val}
                      onClick={() => update("category", val)}
                    />
                  ))}
                </div>
              </FormGroup>
              <FormGroup
                label="Domain or subject area"
                hint="Be specific — this shapes how the persona frames its knowledge."
              >
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. React, System Design, English, Fitness, DSA..."
                  value={data.domain}
                  onChange={(e) => update("domain", e.target.value)}
                  autoComplete="off"
                />
              </FormGroup>
              <StepNav onNext={() => goToStep(2)} />
            </div>
          )}

          {/* STEP 2: Goals */}
          {step === 2 && (
            <div className="animate-fade-slide">
              <StepHeader
                count="Step 2 of 6"
                title={
                  <>
                    What&rsquo;s your
                    <br />
                    goal with this persona?
                  </>
                }
                sub="Be specific. The more precise the goal, the sharper the generated prompt."
              />
              <FormGroup label="Your main goal">
                <textarea
                  className="form-input resize-y min-h-[100px] leading-relaxed"
                  rows={3}
                  placeholder="e.g. I want to get good enough at React to build and ship production applications on my own within 3 months."
                  value={data.goal}
                  onChange={(e) => update("goal", e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Current skill level">
                <div
                  className="grid grid-cols-2 gap-2.5"
                  role="radiogroup"
                  aria-label="Select skill level"
                >
                  {levels.map(([val, icon, label, sub]) => (
                    <OptionChip
                      key={val}
                      icon={icon}
                      label={label}
                      sub={sub}
                      selected={data.level === val}
                      onClick={() => update("level", val)}
                    />
                  ))}
                </div>
              </FormGroup>
              <FormGroup label="Daily time available">
                <SliderField
                  labels={timeLabels}
                  value={data.timeAvail}
                  onChange={(v) => update("timeAvail", v)}
                  ariaLabel="Daily time available"
                />
              </FormGroup>
              <StepNav onBack={() => goToStep(1)} onNext={() => goToStep(3)} />
            </div>
          )}

          {/* STEP 3: Communication Style */}
          {step === 3 && (
            <div className="animate-fade-slide">
              <StepHeader
                count="Step 3 of 6"
                title={
                  <>
                    How should the
                    <br />
                    persona communicate?
                  </>
                }
                sub="This defines the tone, response length, and interaction style."
              />
              <FormGroup label="Communication tone">
                <div
                  className="grid gap-2.5"
                  style={{
                    gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))",
                  }}
                  role="radiogroup"
                  aria-label="Select communication tone"
                >
                  {tones.map(([val, icon, label, sub]) => (
                    <OptionChip
                      key={val}
                      icon={icon}
                      label={label}
                      sub={sub}
                      selected={data.tone === val}
                      onClick={() => update("tone", val)}
                    />
                  ))}
                </div>
              </FormGroup>
              <FormGroup label="Response length preference">
                <SliderField
                  labels={lenLabels}
                  value={data.responseLen}
                  onChange={(v) => update("responseLen", v)}
                  ariaLabel="Response length"
                />
              </FormGroup>
              <FormGroup
                label={
                  <>
                    Example of ideal exchange{" "}
                    <span className="text-dim font-normal">(optional)</span>
                  </>
                }
              >
                <textarea
                  className="form-input resize-y min-h-[100px]"
                  rows={3}
                  placeholder="Describe or show an example of the perfect interaction you have in mind..."
                  value={data.exampleExchange}
                  onChange={(e) => update("exampleExchange", e.target.value)}
                />
              </FormGroup>
              <StepNav onBack={() => goToStep(2)} onNext={() => goToStep(4)} />
            </div>
          )}

          {/* STEP 4: Learning/Teaching Style */}
          {step === 4 && (
            <div className="animate-fade-slide">
              <StepHeader
                count="Step 4 of 6"
                title={
                  <>
                    How should the
                    <br />
                    persona teach?
                  </>
                }
                sub="Choose the approach that matches how you actually learn best."
              />
              <FormGroup label="Teaching approach">
                <div
                  className="grid grid-cols-2 gap-2.5"
                  role="radiogroup"
                  aria-label="Select teaching approach"
                >
                  {teachingStyles.map(([val, icon, label, sub]) => (
                    <OptionChip
                      key={val}
                      icon={icon}
                      label={label}
                      sub={sub}
                      selected={data.teaching === val}
                      onClick={() => update("teaching", val)}
                    />
                  ))}
                </div>
              </FormGroup>
              <FormGroup label="Difficulty adaptation">
                <SliderField
                  labels={diffLabels}
                  value={data.difficulty}
                  onChange={(v) => update("difficulty", v)}
                  ariaLabel="Difficulty adaptation"
                />
              </FormGroup>
              <FormGroup
                label="Areas you struggle with most"
                hint="The persona will pay extra attention to these areas."
              >
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. State management, async code, system design trade-offs..."
                  value={data.weakAreas}
                  onChange={(e) => update("weakAreas", e.target.value)}
                  autoComplete="off"
                />
              </FormGroup>
              <StepNav onBack={() => goToStep(3)} onNext={() => goToStep(5)} />
            </div>
          )}

          {/* STEP 5: Rules & Constraints */}
          {step === 5 && (
            <div className="animate-fade-slide">
              <StepHeader
                count="Step 5 of 6"
                title={
                  <>
                    Set rules and
                    <br />
                    boundaries.
                  </>
                }
                sub="Define what the persona should always do, and what it should never do."
              />
              <FormGroup
                label="Things the persona should always do"
                hint="Press Enter after each rule to add it."
              >
                <TagInput
                  tags={data.alwaysRules}
                  onAdd={(v) => addTag("alwaysRules", v)}
                  onRemove={(i) => removeTag("alwaysRules", i)}
                  placeholder="Add rule, press Enter..."
                />
              </FormGroup>
              <FormGroup label="Things the persona should never do">
                <TagInput
                  tags={data.neverRules}
                  onAdd={(v) => addTag("neverRules", v)}
                  onRemove={(i) => removeTag("neverRules", i)}
                  placeholder="Add constraint, press Enter..."
                  variant="danger"
                />
              </FormGroup>
              <FormGroup
                label={
                  <>
                    Memory &amp; context preferences{" "}
                    <span className="text-dim font-normal">(optional)</span>
                  </>
                }
              >
                <div
                  className="grid grid-cols-2 gap-2.5"
                  role="group"
                  aria-label="Memory preferences"
                >
                  {memoryOptions.map(([val, icon, label, sub]) => (
                    <OptionChip
                      key={val}
                      icon={icon}
                      label={label}
                      sub={sub}
                      selected={data.memoryPrefs.includes(val)}
                      onClick={() => toggleMemoryPref(val)}
                      multi
                    />
                  ))}
                </div>
              </FormGroup>
              <StepNav onBack={() => goToStep(4)} onNext={() => goToStep(6)} />
            </div>
          )}

          {/* STEP 6: Review */}
          {step === 6 && (
            <div className="animate-fade-slide">
              <StepHeader
                count="Step 6 of 6"
                title={
                  <>
                    Review and
                    <br />
                    generate.
                  </>
                }
                sub="Everything looks good? Hit generate to build your production-ready persona and prompt."
              />
              <div className="flex flex-col gap-3.5 mb-8">
                {[
                  [
                    "Persona",
                    data.name || "—",
                    categoryIcons[data.category] || "✦",
                    1,
                  ],
                  ["Category", data.category || "—", "🗂", 1],
                  ["Goal", data.goal || "—", "🎯", 2],
                  ["Skill level", data.level || "—", "📊", 2],
                  ["Tone", data.tone || "—", "💬", 3],
                  ["Teaching", data.teaching || "—", "🎓", 4],
                ].map(([label, val, icon, editStep]) => (
                  <div
                    key={label}
                    className="flex items-start gap-3.5 card p-3.5"
                  >
                    <span className="text-lg flex-shrink-0">{icon}</span>
                    <div>
                      <div className="text-[10px] uppercase tracking-wide text-dim font-semibold mb-1">
                        {label}
                      </div>
                      <div className="text-[13px] text-muted">{val}</div>
                    </div>
                    <button
                      onClick={() => goToStep(editStep)}
                      className="ml-auto text-[11px] text-dim bg-transparent border-none cursor-pointer px-2 py-1 rounded-md hover:text-muted transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
              <FormGroup
                label={
                  <>
                    Anything else to add?{" "}
                    <span className="text-dim font-normal">(optional)</span>
                  </>
                }
              >
                <textarea
                  className="form-input resize-y min-h-[100px]"
                  rows={3}
                  placeholder="Any context, edge cases, or special instructions..."
                  value={data.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </FormGroup>
              <div className="flex items-center justify-between pt-8 mt-2 border-t border-border">
                <button
                  onClick={() => goToStep(5)}
                  className="flex items-center gap-1.5 text-sm font-medium text-dim bg-transparent border border-border px-5 py-2.5 rounded-[9px] cursor-pointer hover:text-muted hover:border-borderH transition-all"
                >
                  ← Back
                </button>
                <button
                  onClick={handleGenerate}
                  className="flex items-center gap-2 text-sm font-medium text-white border-none px-7 py-3 rounded-[9px] cursor-pointer transition-all hover:-translate-y-px"
                  style={{
                    background: "linear-gradient(135deg,var(--purple),#5B9EE0)",
                    boxShadow: "0 4px 20px rgba(124,111,224,0.4)",
                  }}
                  aria-label="Generate persona and prompt"
                >
                  ⚡ Generate Persona
                </button>
              </div>
            </div>
          )}
        </main>

        {/* PREVIEW SIDEBAR */}
        <aside
          className="hidden lg:block bg-surface border-l border-border p-8 px-6 overflow-y-auto sticky top-[60px] h-[calc(100vh-60px)]"
          aria-label="Live persona preview"
        >
          <div className="font-display text-[13px] font-semibold text-dim uppercase tracking-wide mb-5">
            Live Preview
          </div>

          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{
                background: "linear-gradient(135deg,var(--purple),var(--teal))",
              }}
            >
              {categoryIcons[data.category] || "✦"}
            </div>
            <div>
              <div className="font-display text-[15px] font-semibold">
                {data.name || "Unnamed Persona"}
              </div>
              <div className="text-xs text-dim mt-0.5">
                {data.category
                  ? `${data.category.charAt(0).toUpperCase() + data.category.slice(1)} persona`
                  : "Define a category to continue"}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-5">
            <PreviewAttr
              label="Goal"
              value={
                data.goal
                  ? data.goal.substring(0, 60) +
                    (data.goal.length > 60 ? "…" : "")
                  : "Not set yet"
              }
            />
            <PreviewAttr
              label="Skill level"
              value={
                data.level
                  ? data.level.charAt(0).toUpperCase() + data.level.slice(1)
                  : "Not set"
              }
            />
            <PreviewAttr
              label="Tone"
              value={
                data.tone
                  ? data.tone.charAt(0).toUpperCase() + data.tone.slice(1)
                  : "Not set"
              }
            />
            <PreviewAttr
              label="Teaching"
              value={
                data.teaching
                  ? {
                      project: "Project-based",
                      conceptual: "Conceptual-first",
                      challenge: "Challenge-based",
                      adaptive: "Adaptive",
                    }[data.teaching]
                  : "Not set"
              }
            />
          </div>

          <div className="card p-4 mb-4">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-wide text-dim font-semibold mb-2.5">
              <span>Prompt Preview</span>
              <span className="font-normal normal-case tracking-normal text-[10px]">
                auto-generated
              </span>
            </div>
            <div
              className={`text-xs leading-relaxed whitespace-pre-wrap ${promptPreview() ? "text-muted" : "text-dim italic"}`}
            >
              {promptPreview() ||
                "Your answers will shape the prompt here as you go."}
            </div>
          </div>

          <div
            className="flex flex-col gap-1.5"
            role="list"
            aria-label="Completed steps"
          >
            {stepLabels.slice(0, 5).map((label, i) => {
              const n = i + 1;
              const done = n < step;
              return (
                <div
                  key={label}
                  className={`flex items-center gap-2 text-xs ${done ? "text-muted" : "text-dim"}`}
                  role="listitem"
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] flex-shrink-0 border border-border"
                    style={
                      done
                        ? {
                            background: "rgba(45,212,168,0.15)",
                            borderColor: "rgba(45,212,168,0.3)",
                            color: "var(--teal)",
                          }
                        : undefined
                    }
                  >
                    {done ? "✓" : ""}
                  </div>
                  {label}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}

function StepHeader({ count, title, sub }) {
  return (
    <div className="mb-9">
      <div className="text-[11px] font-semibold text-dim uppercase tracking-wide mb-2">
        {count}
      </div>
      <h1 className="font-display text-[26px] font-bold tracking-tight mb-2">
        {title}
      </h1>
      <p className="text-sm text-muted leading-relaxed">{sub}</p>
    </div>
  );
}

function FormGroup({ label, hint, children }) {
  return (
    <div className="mb-7">
      <label className="text-[13px] font-medium text-muted mb-2.5 block">
        {label}
      </label>
      {children}
      {hint && <div className="text-xs text-dim mt-1">{hint}</div>}
    </div>
  );
}

function StepNav({ onBack, onNext }) {
  return (
    <div className="flex items-center justify-between pt-8 mt-2 border-t border-border">
      {onBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-dim bg-transparent border border-border px-5 py-2.5 rounded-[9px] cursor-pointer hover:text-muted hover:border-borderH transition-all"
        >
          ← Back
        </button>
      ) : (
        <div />
      )}
      <button
        onClick={onNext}
        className="flex items-center gap-2 text-sm font-medium text-white bg-purple border-none px-7 py-3 rounded-[9px] cursor-pointer shadow-purpleGlow hover:bg-purple-b hover:shadow-purpleGlowLg hover:-translate-y-px transition-all"
      >
        Continue →
      </button>
    </div>
  );
}

function SliderField({ labels, value, onChange, ariaLabel }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] text-dim mb-1.5">
        <span>{labels[0].split(" ")[0]}</span>
        <span>{labels[1].split(" ")[0]}</span>
        <span>{labels[2].split(" ")[0]}</span>
        <span>{labels[3].split(" ")[0]}</span>
      </div>
      <input
        type="range"
        min={1}
        max={4}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={ariaLabel}
        className="w-full h-1 rounded-full bg-borderH outline-none cursor-pointer accent-purple"
      />
      <div className="mt-2 inline-block bg-purple/[0.12] border border-purple/20 text-purple-b text-xs font-medium px-2.5 py-0.5 rounded-md">
        {labels[value - 1]}
      </div>
    </div>
  );
}

function PreviewAttr({ label, value }) {
  const empty = value === "Not set yet" || value === "Not set";
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wide text-dim mb-1">
        {label}
      </div>
      <div
        className={`text-[13px] ${empty ? "text-dim italic" : "text-muted"}`}
      >
        {value}
      </div>
    </div>
  );
}
