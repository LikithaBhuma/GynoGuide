import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen, ChevronDown, ChevronUp, ArrowRight,
  Heart, Zap, GraduationCap, Microscope
} from 'lucide-react'
import './LearnPage.css'

const modules = [
  {
    id: 'anatomy',
    icon: '🫀',
    title: 'Female Reproductive Anatomy',
    level: 'Beginner',
    color: 'rose',
    description: 'Foundational knowledge of female reproductive structures.',
    topics: [
      {
        title: 'The Uterus',
        content: `The uterus (womb) is a hollow, muscular organ located in the pelvis between the bladder and rectum. It's shaped like an inverted pear and has three layers:\n\n**Perimetrium** — outer serous layer\n**Myometrium** — thick muscular middle layer responsible for uterine contractions during labor\n**Endometrium** — inner mucosal layer that thickens and sheds monthly during menstruation\n\nThe uterus is divided anatomically into the fundus (top), corpus (body), and cervix (lower narrow portion connecting to the vagina). The average uterus measures 7–8 cm in length and 4–5 cm in width in a reproductive-age woman.`,
      },
      {
        title: 'The Ovaries',
        content: `The ovaries are two almond-shaped glandular organs (~3–5 cm) on either side of the uterus. They serve two primary functions:\n\n**Gametogenesis** — producing and releasing eggs (oocytes) through the process of oogenesis\n**Steroidogenesis** — producing sex hormones: estrogen (primarily estradiol), progesterone, and small amounts of androgens\n\nAt birth, a female has ~1–2 million primordial follicles. By puberty, only ~300,000 remain. During a lifetime, only ~400 follicles mature fully to release an egg (ovulation).`,
      },
      {
        title: 'The Fallopian Tubes',
        content: `The fallopian tubes (uterine tubes) are ~10–12 cm long muscular channels connecting the ovaries to the uterus. They have four segments:\n\n1. **Infundibulum** — funnel-shaped end with fimbriae that sweep the egg toward the tube\n2. **Ampulla** — widest segment; site where fertilization typically occurs\n3. **Isthmus** — narrow segment adjacent to uterus\n4. **Intramural/Interstitial** — segment within the uterine wall\n\nThe tube's epithelial lining has ciliated cells that move the egg, and secretory cells that nourish the egg and sperm.`,
      },
    ],
  },
  {
    id: 'cycle',
    icon: '🔄',
    title: 'Menstrual Cycle & Hormones',
    level: 'Beginner',
    color: 'teal',
    description: 'Understanding the monthly hormonal cycle and its phases.',
    topics: [
      {
        title: 'The Four Phases',
        content: `The menstrual cycle averages 28 days (range: 21–35 days) and is regulated by hormonal interactions between the hypothalamus, pituitary gland, and ovaries (HPO axis).\n\n**Phase 1 — Menstruation (Days 1–5):** Shedding of the endometrial lining due to declining progesterone. Average blood loss: 30–80 mL.\n\n**Phase 2 — Follicular Phase (Days 1–13):** FSH stimulates follicle growth; rising estrogen thickens the endometrium and triggers LH surge.\n\n**Phase 3 — Ovulation (Day ~14):** LH surge triggers release of the mature oocyte. The fertile window spans 5 days before to 1 day after ovulation.\n\n**Phase 4 — Luteal Phase (Days 15–28):** Corpus luteum produces progesterone to maintain endometrium. If no implantation, corpus luteum degenerates and the cycle restarts.`,
      },
      {
        title: 'Key Hormones',
        content: `**GnRH (Gonadotropin-Releasing Hormone)** — Pulsatile release from hypothalamus; regulates FSH and LH release\n\n**FSH (Follicle-Stimulating Hormone)** — Stimulates ovarian follicle development and estrogen production\n\n**LH (Luteinizing Hormone)** — Triggers ovulation; stimulates corpus luteum formation and progesterone production\n\n**Estradiol (E2)** — Primary estrogen; thickens endometrium, influences cervical mucus, bone density, libido\n\n**Progesterone** — Post-ovulation; maintains endometrium for implantation, raises basal body temperature, reduces uterine contractions\n\n**Inhibin B** — Ovarian peptide; provides negative feedback on FSH (marker of ovarian reserve)`,
      },
    ],
  },
  {
    id: 'fertility',
    icon: '🌱',
    title: 'Fertility & Conception',
    level: 'Intermediate',
    color: 'amber',
    description: 'From ovulation tracking to ART — understanding fertility.',
    topics: [
      {
        title: 'Factors Affecting Fertility',
        content: `Female fertility depends on multiple factors:\n\n**Age** — The most significant factor. Fertility begins declining in the late 20s and accelerates after 35. Egg quality and quantity decrease with age.\n\n**Ovarian reserve** — Measured by AMH (Anti-Müllerian Hormone), antral follicle count (AFC), and FSH/E2 on cycle day 3\n\n**Tubal patency** — Open fallopian tubes assessed by hysterosalpingography (HSG) or laparoscopy\n\n**Uterine anatomy** — Fibroids, polyps, adhesions (Asherman's syndrome), or congenital anomalies affect implantation\n\n**Hormonal disorders** — PCOS, thyroid disorders, hyperprolactinemia, and premature ovarian insufficiency all impair fertility\n\n**Lifestyle factors** — Smoking reduces ovarian reserve; extreme weight (BMI <18.5 or >30) disrupts ovulation; chronic stress affects HPO axis`,
      },
      {
        title: 'Assisted Reproductive Technologies (ART)',
        content: `**IUI (Intrauterine Insemination)** — Washed sperm placed directly into uterus around ovulation. Success rate: 10–20% per cycle. Used for mild male factor, cervical factor, or unexplained infertility.\n\n**IVF (In Vitro Fertilization)** — Ovarian stimulation → egg retrieval → fertilization in lab → embryo transfer. Success rate: 40–50% per cycle in women under 35 (own eggs).\n\n**ICSI (Intracytoplasmic Sperm Injection)** — Single sperm injected directly into egg. Used for severe male factor infertility.\n\n**PGT-A (Preimplantation Genetic Testing)** — Tests embryos for chromosomal abnormalities before transfer, improving implantation rates and reducing miscarriage in older women.\n\n**Egg freezing (oocyte cryopreservation)** — Preserves fertility through vitrification. Optimal before age 35.`,
      },
    ],
  },
  {
    id: 'prevention',
    icon: '🛡️',
    title: 'Preventive Gynecological Care',
    level: 'Beginner',
    color: 'plum',
    description: 'Screening schedules, vaccines, and wellness checkups.',
    topics: [
      {
        title: 'Screening Guidelines',
        content: `**Pap Smear (Cervical Cytology):**\n- Ages 21–29: Every 3 years\n- Ages 30–65: Every 3 years (Pap alone) or every 5 years (Pap + HPV co-test)\n- Over 65: Discontinue if adequate prior screening\n\n**HPV Testing:** Co-test with Pap smear for ages 30–65; preferred over Pap alone for ages 25+\n\n**Breast Cancer Screening:**\n- Average risk: Annual mammography from age 40–45 (ACOG), age 50–74 biannually (USPSTF); discuss with physician\n- BRCA carriers: MRI + mammogram from age 25–30\n\n**Ovarian Cancer:** No proven screening test for average-risk women; CA-125 + transvaginal ultrasound for high-risk (BRCA, Lynch syndrome)\n\n**STI Screening:** Annual chlamydia/gonorrhea for sexually active women under 25; HIV, syphilis, hepatitis B per risk assessment`,
      },
      {
        title: 'Vaccines for Women\'s Health',
        content: `**HPV Vaccine (Gardasil 9):**\n- Recommended: Ages 11–12 (ideally before sexual debut)\n- Catch-up: Up to age 26 (all women); ages 27–45 with shared clinical decision-making\n- Protects against HPV types causing ~90% of cervical cancers and genital warts\n\n**Hepatitis B vaccine:**\n- If unvaccinated, recommended for all adults up to age 59; ages 60+ based on risk\n\n**Influenza vaccine:**\n- Especially important in pregnancy (flu vaccine safe in all trimesters; live vaccine contraindicated)\n\n**Tdap:**\n- Each pregnancy between 27–36 weeks to protect newborn from pertussis\n\n**COVID-19:**\n- Recommended and safe in pregnancy; reduces risk of preterm birth and maternal ICU admission`,
      },
    ],
  },
]

function TopicAccordion({ topic }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`topic-accordion ${open ? 'topic-accordion--open' : ''}`}>
      <button className="topic-accordion__header" onClick={() => setOpen(v => !v)}>
        <span>{topic.title}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <div className="topic-accordion__body fade-in">
          {topic.content.split('\n\n').map((para, i) => (
            <p key={i} dangerouslySetInnerHTML={{
              __html: para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
            }} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function LearnPage() {
  const [activeModule, setActiveModule] = useState(null)

  return (
    <div className="learn-page">
      <div className="page-hero">
        <div className="container">
          <span className="section-label">Knowledge Hub</span>
          <h1>Learn Gynecology</h1>
          <p>Structured, evidence-based learning from anatomy and physiology to advanced reproductive medicine — written for everyone.</p>

          <div className="learn-levels">
            <div className="level-badge level-badge--beginner"><GraduationCap size={14} />Beginner</div>
            <div className="level-badge level-badge--intermediate"><Zap size={14} />Intermediate</div>
            <div className="level-badge level-badge--advanced"><Microscope size={14} />Advanced</div>
          </div>
        </div>
      </div>

      <div className="container learn-body">
        <div className="modules-grid">
          {modules.map(mod => (
            <div key={mod.id} className={`module-card module-card--${mod.color}`}>
              <div className="module-card__top">
                <span className="module-card__emoji">{mod.icon}</span>
                <span className={`level-badge level-badge--${mod.level.toLowerCase()}`}>
                  {mod.level}
                </span>
              </div>
              <h3>{mod.title}</h3>
              <p>{mod.description}</p>
              <div className="module-topics">
                {mod.topics.map(topic => (
                  <TopicAccordion key={topic.title} topic={topic} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="learn-quicklinks">
          <h2>Continue learning</h2>
          <div className="quicklinks-grid">
            <Link to="/diseases" className="quicklink-card">
              <BookOpen size={20} />
              <div>
                <strong>Conditions Library</strong>
                <p>Deep-dive into specific gynecological conditions</p>
              </div>
              <ArrowRight size={16} />
            </Link>
            <Link to="/videos" className="quicklink-card">
              <Heart size={20} />
              <div>
                <strong>Video Library</strong>
                <p>Visual explanations from medical educators</p>
              </div>
              <ArrowRight size={16} />
            </Link>
            <Link to="/chat" className="quicklink-card">
              <Zap size={20} />
              <div>
                <strong>Ask AI</strong>
                <p>Get answers to specific questions instantly</p>
              </div>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
