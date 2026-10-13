import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, CheckCheck, ChevronRight, CircleCheck, Clock3, FileText, LockKeyhole, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import "./ControlSection.css";

type Step = 0 | 1 | 2;
const steps = ["Review", "Approve", "Deliver"] as const;

export default function ControlSection() {
  const [step, setStep] = useState<Step>(0);
  const reduceMotion = useReducedMotion();
  const next = () => setStep(value => (value < 2 ? (value + 1) as Step : 0));
  return (
    <section className="control-section" id="human-control" aria-labelledby="control-heading">
      <div className="control-glow control-glow-one" aria-hidden="true" />
      <div className="control-glow control-glow-two" aria-hidden="true" />
      <div className="control-layout">
        <div className="control-copy">
          <div className="control-overline"><span className="control-overline-dot" /> THE HUMAN-IN-CONTROL MODEL</div>
          <h2 id="control-heading">The work is automated.<br/><em>The decision is yours.</em></h2>
          <p>Lane handles the repetitive work behind the scenes. You get a clear, reviewable draft before anything goes out. No black box. No surprise actions.</p>
          <div className="control-values">
            <div><span className="control-value-icon"><ShieldCheck size={19}/></span><span><strong>Nothing ships without approval</strong><small>A human decision stays in the loop.</small></span></div>
            <div><span className="control-value-icon"><LockKeyhole size={19}/></span><span><strong>Your systems stay yours</strong><small>Designed around the tools you already use.</small></span></div>
            <div><span className="control-value-icon"><Clock3 size={19}/></span><span><strong>A visible record of every step</strong><small>Know what was prepared and what was approved.</small></span></div>
          </div>
          <a href="#workspace" className="control-explore">Explore the three lanes <ArrowRight size={16}/></a>
        </div>
        <div className="control-demo">
          <div className="control-window">
            <div className="control-window-bar"><div className="control-window-brand"><span className="control-window-logo">b.</span><span>LANE / APPROVAL CENTER</span></div><span className="control-demo-label"><span/> LIVE DEMO</span></div>
            <div className="control-progress" aria-label="Demo workflow progress">{steps.map((label,index)=><div key={label} className={index === step ? "control-progress-step active" : index < step ? "control-progress-step complete" : "control-progress-step"}><span>{index < step ? <Check size={13}/> : String(index + 1).padStart(2,"0")}</span>{label}{index < 2 && <ChevronRight size={15} className="control-progress-arrow"/>}</div>)}</div>
            <AnimatePresence mode="wait">
              <motion.div key={step} className="control-preview" initial={reduceMotion ? false : {opacity:0,y:8}} animate={{opacity:1,y:0}} exit={reduceMotion ? undefined : {opacity:0,y:-8}} transition={{duration:.24}}>
                {step === 0 && <><div className="control-doc-top"><span className="control-doc-icon"><FileText size={20}/></span><span className="control-doc-type">LANE 01 · CLIENT REPORTING</span><span className="control-doc-state">DRAFT READY</span></div><h3>Weekly executive summary</h3><p>Acme Studio · Prepared by Agent Lane</p><div className="control-report-stats"><div><small>CAMPAIGN REACH</small><strong>128.4k</strong><span>Illustrative metric</span></div><div><small>LEADS CAPTURED</small><strong>246</strong><span>Illustrative metric</span></div><div><small>CONVERSION RATE</small><strong>3.8%</strong><span>Illustrative metric</span></div></div><div className="control-preview-note"><Sparkles size={15}/> The draft is ready. Review before releasing.</div></>}
                {step === 1 && <><div className="control-center-icon"><ShieldCheck size={30}/></div><h3>Ready for your approval.</h3><p>Your reviewed draft is waiting. Nothing has been delivered.</p><div className="control-review-list"><span><Check size={16}/> Data summarized</span><span><Check size={16}/> Output prepared</span><span><LockKeyhole size={16}/> Delivery held for approval</span></div></>}
                {step === 2 && <><div className="control-center-icon success"><CheckCheck size={32}/></div><h3>Approval recorded.</h3><p>Demo completed. In a real workspace, delivery would follow your authorization.</p><div className="control-review-list"><span><CircleCheck size={16}/> Review completed</span><span><CircleCheck size={16}/> Approval recorded</span><span><LockKeyhole size={16}/> No external messages sent in this demo</span></div></>}
              </motion.div>
            </AnimatePresence>
            <div className="control-actions"><span className="control-demo-note"><LockKeyhole size={13}/> INTERACTIVE SIMULATION · NO LIVE ACTIONS</span><button onClick={next} type="button" className="control-next">{step === 0 ? "Mark reviewed" : step === 1 ? "Approve draft" : "Try again"} {step === 2 ? <RotateCcw size={16}/> : <ArrowRight size={16}/>}</button></div>
          </div>
          <div className="control-under-caption"><span className="control-caption-line"/><span>PREPARED BY LANE. AUTHORIZED BY YOU.</span><span className="control-caption-line"/></div>
        </div>
      </div>
    </section>
  );
}
