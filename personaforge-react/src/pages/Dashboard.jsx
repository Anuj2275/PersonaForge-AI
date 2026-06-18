import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import PersonaCard from "../components/ui/PersonaCard";
import { personas, templates } from "../data/mockData";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/authApi";
import { getPersonas } from "../api/personaApi";

const stats = [
  { label: "Total Personas", value: "8", delta: "↑ 3 this month", up: true },
  {
    label: "Avg Prompt Score",
    value: "8.6",
    color: "var(--teal)",
    delta: "↑ +0.4 from last batch",
    up: true,
  },
  {
    label: "Prompt Versions",
    value: "24",
    delta: "Across all personas",
    up: false,
  },
  { label: "Times Used", value: "142", delta: "↑ 18 this week", up: true },
];

const activity = [
  {
    icon: "✦",
    bg: "rgba(124,111,224,0.12)",
    title: "React Mentor updated to v3",
    sub: "Prompt score improved: 8.7 → 9.1",
    time: "2d ago",
  },
  {
    icon: "📋",
    bg: "rgba(45,212,168,0.1)",
    title: "System Design Coach prompt copied",
    sub: "Used in Claude",
    time: "3d ago",
  },
  {
    icon: "✦",
    bg: "rgba(224,136,111,0.12)",
    title: "DSA Mentor created",
    sub: "Scored 8.8 / 10 on first pass",
    time: "5d ago",
  },
  {
    icon: "💡",
    bg: "rgba(111,212,224,0.12)",
    title: "3 suggestions applied to English Mentor",
    sub: "Added learning style, memory rules",
    time: "1w ago",
  },
  {
    icon: "🔀",
    bg: "rgba(180,224,111,0.08)",
    title: "Spring Boot Mentor · v1 created",
    sub: "From blank · Interview flow completed",
    time: "3w ago",
  },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const activePersonas = personas.filter((p) => !p.archived).slice(0, 5);
  // const quickTemplates = templates.slice(0, 5);
  const quickTemplates = [];

  const loadData = async () => {
    try {
      console.log("TOKEN:", localStorage.getItem("token"));
      const userResponse = await getCurrentUser();

      const personaResponse = await getPersonas();

      setUser(userResponse.data);
      setPersonas(personaResponse.data.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  console.log(user);
  console.log(personas);

  return (
    <AppShell title="Dashboard">
      <div className="p-7 pb-12">
        {/* Stats */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-7"
          role="region"
          aria-label="Summary statistics"
        >
          {stats.map((s) => (
            <div key={s.label} className="card p-5">
              <div className="text-[11px] text-dim font-medium uppercase tracking-wide mb-2.5">
                {s.label}
              </div>
              <div
                className="font-display text-[28px] font-bold leading-none mb-1.5"
                style={{ color: s.color }}
              >
                {s.value}
              </div>
              <div
                className={`text-xs flex items-center gap-1 ${s.up ? "text-teal" : "text-dim"}`}
              >
                {s.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Personas */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-[15px] font-semibold">
            My Personas
          </h2>
          <button
            onClick={() => navigate("/personas")}
            className="text-xs text-dim bg-transparent border-none cursor-pointer hover:text-muted transition-colors"
          >
            View all →
          </button>
        </div>
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-7"
          role="list"
          aria-label="Saved personas"
        >
          {activePersonas.map((p) => (
            <PersonaCard key={p.id} persona={p} />
          ))}
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate("/persona/new")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/persona/new")}
            className="card border-dashed flex flex-col items-center justify-center gap-2.5 min-h-[160px] text-dim bg-purple/[0.03] hover:border-purple/35 hover:text-purple-b cursor-pointer transition-colors"
            aria-label="Create a new persona"
          >
            <div className="text-2xl">+</div>
            <div className="text-[13px] font-medium">Create new persona</div>
            <div className="text-xs text-dim">2 remaining on free plan</div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-2 gap-3.5">
          {/* Activity */}
          <section className="card p-5" aria-label="Recent activity">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-[15px] font-semibold">
                Recent Activity
              </h2>
              <button className="text-xs text-dim bg-transparent border-none cursor-pointer hover:text-muted transition-colors">
                Clear all
              </button>
            </div>
            <div role="list">
              {activity.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2.5 border-b border-border last:border-0"
                  role="listitem"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: a.bg }}
                    aria-hidden="true"
                  >
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] text-textc whitespace-nowrap overflow-hidden text-ellipsis">
                      {a.title}
                    </div>
                    <div className="text-[11px] text-dim mt-0.5">{a.sub}</div>
                  </div>
                  <div className="text-[11px] text-dim whitespace-nowrap">
                    {a.time}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Templates */}
          <section className="card p-5" aria-label="Quick-start templates">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-[15px] font-semibold">
                Quick Templates
              </h2>
              <button
                onClick={() => navigate("/templates")}
                className="text-xs text-dim bg-transparent border-none cursor-pointer hover:text-muted transition-colors"
              >
                Browse all →
              </button>
            </div>
            <div className="flex flex-col gap-2.5" role="list">
              {quickTemplates.map((t) => (
                <div
                  key={t.id}
                  role="listitem"
                  tabIndex={0}
                  onClick={() => navigate("/persona/new")}
                  onKeyDown={(e) =>
                    e.key === "Enter" && navigate("/persona/new")
                  }
                  className="flex items-center gap-3 p-3 bg-card2 border border-border rounded-[10px] cursor-pointer hover:border-purple/30 transition-colors"
                  aria-label={`Use ${t.name} template`}
                >
                  <span className="text-xl flex-shrink-0" aria-hidden="true">
                    {t.icon}
                  </span>
                  <div>
                    <div className="text-[13px] font-medium">{t.name}</div>
                    <div className="text-[11px] text-dim">{t.cat}</div>
                  </div>
                  <span
                    className="ml-auto text-dim text-[13px]"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
