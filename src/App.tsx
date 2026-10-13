import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown, Check, ChevronDown, Menu, X, FileText, Mail, Wallet, CircleCheck, Clock3, ShieldCheck, Sparkles, TrendingUp, BarChart3, Users, Database, LockKeyhole, Zap } from "lucide-react";

type Lane = "reporting" | "leads" | "recovery";
type LaneConfig = { id: Lane; number: string; name: string; label: string };
const lanes: LaneConfig[] = [
  { id: "reporting", number: "01", name: "Reporting", label: "Executive-ready reporting" },
  { id: "leads", number: "02", name: "Lead Intake", label: "Every opportunity, handled" },
  { id: "recovery", number: "03", name: "AR Recovery", label: "Follow-ups without friction" },
];
const contact = "mailto:hello@botlane.io?subject=Let's%20talk%20about%20Agent%20Lane";
const icons = { reporting: FileText, leads: Mail, recovery: Wallet };
const demo = {
  reporting: {
    eyebrow: "WEEKLY EXECUTIVE SYNTHESIS", title: "Quarterly growth synthesis",
    description: "A client-ready performance narrative, assembled for review.",
    stats: [["4.21×", "Blended ROAS"], ["$5,570", "Total spend"], ["$42.10", "Cost per acquisition"]],
    updates: ["Performance trends summarized across channels", "Important changes highlighted for stakeholders", "Executive report drafted and ready to review"],
    sources: [["Google Ads", "Campaign data synced"], ["Meta Ads", "Ad performance synced"], ["Analytics", "Conversion signals synced"]],
    deliverable: "Executive performance report",
  },
  leads: {
    eyebrow: "NEW LEAD WORKSPACE", title: "Lead qualification digest",
    description: "Incoming inquiries organized, qualified, and prepared for action.",
    stats: [["28", "New inquiries"], ["8", "High intent"], ["6", "Follow-ups drafted"]],
    updates: ["New inquiries classified by intent and context", "Missing details flagged for your review", "Personalized follow-up messages prepared"],
    sources: [["Website", "New inquiry captured"], ["Inbox", "Responses collected"], ["CRM", "Contact records synced"]],
    deliverable: "Qualified lead follow-ups",
  },
  recovery: {
    eyebrow: "RECEIVABLES WORKSPACE", title: "Collections follow-up queue",
    description: "A thoughtful, approval-gated way to keep invoices moving.",
    stats: [["12", "Open invoices"], ["5", "Follow-ups ready"], ["3", "Replies to review"]],
    updates: ["Outstanding invoices organized by due date", "Customer-appropriate reminders drafted", "Sensitive escalations held for your approval"],
    sources: [["Accounting", "Invoice status synced"], ["Inbox", "Customer replies synced"], ["CRM", "Account history synced"]],
    deliverable: "Payment reminder sequence",
  },
} as const;

function Brand() { return <a href="/" className="brand" aria-label="BotLane home">botlane<span className="brand-dot">.</span></a>; }
function LaneIcon({ lane, size = 16 }: {lane: Lane; size?: number}) { const Icon = icons[lane]; return <Icon size={size} strokeWidth={1.9}/>; }

function Header() {
  const [open, setOpen] = useState(false);
  const [systems, setSystems] = useState(false);
  return <header className="site-header">
    <div className="nav-container">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">
        <div className="nav-drop-wrap">
          <button className="nav-link nav-drop" aria-expanded={systems} onClick={() => setSystems(!systems)}>Systems <ChevronDown size={14} className={systems ? "rotate" : ""}/></button>
          {systems && <div className="dropdown">{lanes.map(l => <a href="#workspace" onClick={() => setSystems(false)} key={l.id}><span className="menu-icon"><LaneIcon lane={l.id}/></span><span><strong>{l.name}</strong><small>{l.label}</small></span></a>)}</div>}
        </div>
        <a className="nav-link" href="#how-it-works">How it works</a>
        <a className="nav-link" href="#systems">The three lanes</a>
        <a className="nav-link" href="#contact">Contact</a>
      </nav>
      <a href={contact} className="nav-cta">Contact us <ArrowRight size={15}/></a>
      <button className="menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#systems" onClick={() => setOpen(false)}>Systems</a><a href="#how-it-works" onClick={() => setOpen(false)}>How it works</a><a href="#workspace" onClick={() => setOpen(false)}>Product preview</a><a href={contact}>Contact us <ArrowRight size={16}/></a></nav>}
  </header>;
}

function Workspace() {
  const [active, setActive] = useState<Lane>("reporting");
  const current = demo[active];
  const reduced = useReducedMotion();
  return <div className="workspace-shell" id="workspace">
    <div className="workspace-toolbar">
      <div className="browser-left"><div className="browser-dots"><i/><i/><i/></div><span>workspace · agent lane</span></div>
      <div className="live-status"><span className="live-pulse"/> INTERACTIVE PREVIEW</div>
    </div>
    <div className="workspace-inner">
      <div className="lane-switcher" role="tablist" aria-label="Explore operational systems">
        {lanes.map(l => <button key={l.id} role="tab" aria-selected={active === l.id} className={"lane-tab " + (active === l.id ? "selected" : "")} onClick={() => setActive(l.id)}><LaneIcon lane={l.id}/><span className="tab-name"><small>LANE {l.number}</small>{l.name}</span></button>)}
      </div>
      <AnimatePresence mode="wait" initial={false}>
      <motion.div key={active} className="workflow-grid" initial={reduced ? false : {opacity:0,y:9}} animate={{opacity:1,y:0}} exit={reduced ? undefined : {opacity:0,y:-7}} transition={{duration:0.23}}>
        <div className="workflow-panel intake-panel">
          <div className="panel-heading"><span className="step-index">01</span><span>Connected inputs</span><span className="panel-indicator"><i/> LIVE</span></div>
          <p className="panel-subline">Your existing tools. One organized flow.</p>
          <div className="sources">{current.sources.map(([name,description],i)=><div className="source" key={name}><div className={"source-mark mark-"+i}>{i===0 ? <Database size={15}/> : i===1 ? <Mail size={15}/> : <BarChart3 size={15}/>}</div><div><strong>{name}</strong><small>{description}</small></div><CircleCheck size={15} className="source-check"/></div>)}</div>
          <div className="connection-note"><Zap size={14}/> No manual copy-paste needed</div>
        </div>
        <div className="flow-connector"><span><ArrowRight size={17}/></span></div>
        <div className="workflow-panel synthesis-panel">
          <div className="panel-heading"><span className="step-index">02</span><span>Agent Lane prepares</span><span className="ai-label"><Sparkles size={12}/> AI ASSISTED</span></div>
          <div className="report-card">
            <div className="report-top"><span className="report-eyebrow">{current.eyebrow}</span><span className="review-label">READY FOR REVIEW</span></div>
            <h3>{current.title}</h3><p>{current.description}</p>
            <div className="stats-grid">{current.stats.map(([value,label])=><div className="stat-tile" key={label}><strong>{value}</strong><small>{label}</small></div>)}</div>
            <ul className="digest-list">{current.updates.map(item=><li key={item}>{item}</li>)}</ul>
          </div>
        </div>
        <div className="flow-connector"><span><ArrowRight size={17}/></span></div>
        <div className="workflow-panel approval-panel">
          <div className="panel-heading"><span className="step-index">03</span><span>Human approval</span><span className="ready-label">READY</span></div>
          <p className="panel-subline">You stay in control of every action.</p>
          <div className="deliverable"><div className="deliverable-icon"><FileText size={21}/></div><div><strong>{current.deliverable}</strong><small>Prepared · Not sent</small></div></div>
          <div className="approval-checks"><span><Check size={16}/> Draft prepared</span><span><Check size={16}/> Waiting for your decision</span><span><LockKeyhole size={16}/> Nothing sent automatically</span></div>
          <div className="demo-approval" aria-label="Illustrative approval button"><Check size={16}/> Approval required</div>
          <div className="simulation-note">Demonstration only · no real actions</div>
        </div>
      </motion.div>
      </AnimatePresence>
    </div>
    <div className="workspace-bottom"><span><span className="bottom-dot"/> A calmer way to run operations.</span><span>THREE LANES. ONE CONTROL POINT.</span></div>
  </div>;
}

function Hero() {
  return <section className="hero" aria-labelledby="hero-heading">
    <div className="ambient ambient-left"/><div className="ambient ambient-right"/>
    <div className="hero-copy">
      <div className="eyebrow"><span className="eyebrow-icon"><span/></span> AGENT LANE <span className="eyebrow-separator">/</span> THREE OPERATIONAL LANES</div>
      <h1 id="hero-heading">Meet your<br className="hero-break"/> newest hire<span className="heading-period">.</span></h1>
      <p className="hero-description">Your operations, without the busywork. Agent Lane drafts client reports, follows up with leads, and helps recover receivables. <strong>Three dedicated lanes. You stay in control.</strong></p>
      <div className="hero-actions"><a className="button-primary" href={contact}>Contact us <ArrowRight size={18}/></a><a className="button-secondary" href="#how-it-works"><span className="play-triangle">▶</span> See how it works</a></div>
      <div className="assurances"><span><span className="assurance-icon red-dot"/> Works with your tools</span><span><ShieldCheck size={17} className="green"/> Human approval first</span><span><Clock3 size={17}/> Managed for you</span></div>
    </div>
    <div className="workspace-perspective"><div className="back-sheet back-sheet-a"/><div className="back-sheet back-sheet-b"/><Workspace/></div>
    <a className="scroll-cue" href="#how-it-works">DISCOVER THE PROCESS <ArrowDown size={14}/></a>
  </section>;
}

function HowItWorks() {
  const steps = [
    { n:"01",title:"Your data comes in", desc:"We connect to the tools your business already uses.", icon:Database },
    { n:"02",title:"Agent Lane does the work",desc:"Your lane prepares reports, responses, and next steps.",icon:Sparkles },
    { n:"03",title:"You approve. It gets done.",desc:"Nothing goes out without the right human decision.",icon:Check }
  ];
  return <section className="how-section" id="how-it-works"><div className="section-intro"><span className="section-kicker">HOW IT WORKS</span><h2>From noise to<br/>approved work.</h2><p>Connected signals. Prepared work. Human approval. That's it.</p></div><div className="process-cards">{steps.map(s=>{const Icon=s.icon;return <article className="process-card" key={s.n}><div className="process-heading"><span>{s.n}</span><Icon size={21}/></div><h3>{s.title}</h3><p>{s.desc}</p></article>})}</div></section>;
}
function Systems() { return <section className="systems-section" id="systems"><div><span className="section-kicker">THREE LANES. NO CLUTTER.</span><h2>Start with what matters.</h2><p>Three focused operational systems. Built to fit the way your team already works.</p></div><div className="mini-lanes">{lanes.map(l=><a href="#workspace" key={l.id} className="mini-lane"><span className="mini-icon"><LaneIcon lane={l.id} size={18}/></span><strong>{l.name}</strong><span>{l.label}</span><ArrowRight size={17}/></a>)}</div></section>; }
function Footer(){return <footer id="contact"><div className="contact-banner"><span className="section-kicker">YOUR NEXT STEP</span><h2>Make room for better work.</h2><p>Tell us what your operations look like. We’ll explore what Agent Lane can handle.</p><a className="button-primary" href={contact}>Let's talk <ArrowRight size={18}/></a></div><div className="footer-row"><Brand/><span>© {new Date().getFullYear()} BotLane. Built for the work that matters.</span><a href={contact}>Contact <ArrowRight size={14}/></a></div></footer>}
export default function App(){return <><Header/><main><Hero/><HowItWorks/><Systems/></main><Footer/></>;}
