export interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  dates: string;
  project: string;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  featured: boolean;
  technologies: string[];
  github: string | null;
  dashboard: string | null;
  bullets: string[];
  screenshots: { src: string; alt: string }[];
  story?: {
    hook: string; intro: string; scope: string; why: string; evidence: string; source: string;
    chapters: { label: string; title: string; text: string; nodes: string[] }[];
  };
}

export interface SkillGroup { name: string; skills: string[] }

// All editorial text, links, asset references and displayed metrics live here.
// null means a link has not been supplied. Never render null as href="#".
// public/ is omitted from URL paths. Resolve these paths with assetUrl().
export const portfolio = {
  projectLab: {
    eyebrow: 'THE PROJECT LAB', title: 'Three builds. Pick a workstation.',
    intro: 'Each screen opens a project. Take a look at the pipeline, the decisions behind it and the code.',
    selectLabel: 'Choose a project workstation',
    selectedLabel: 'Open below', openLabel: 'Explore project', readLabel: 'Read selected project', viewingLabel: 'Now viewing:',
    caption: 'Animated data flow is illustrative. Project results and limitations are explained below.',
    stations: [
      { id: 'dataops-investigator', name: 'DataOps Investigator', description: 'Pipelines, lineage and AI incident investigation' },
      { id: 'people-analytics', name: 'People Analytics AI Copilot', description: 'Governed tools and explainable workforce metrics' },
      { id: 'retailpulse', name: 'RetailPulse', description: 'Clean data, SQL models and retail analytics' },
    ],
  },
  visual: { pause: "Pause background motion", resume: "Resume background motion", themes: ["#39FF14", "#C69CFF", "#72BCFF"] },
  investigator: {
  "eyebrow": "FEATURED PROJECT",
  "title": "Why is the revenue dashboard still showing yesterday?",
  "intro": "A dbt test fails, a few models get skipped, and the dashboard keeps showing old numbers. Finding what broke and what it affected can take hours. I built DataOps Investigator to help with that first hour of digging.",
  "name": "DataOps Investigator",
  "subtitle": "Tracing pipeline failures from the first alert to the affected dashboard.",
  "scope": "Personal project · Synthetic e-commerce data · Not a production system",
  "prompt": "Follow a failure through the system",
  "demoLabel": "Example walkthrough using synthetic data.",
  "next": "Follow the next clue",
  "reset": "Replay the case",
  "evidenceLabel": "What the system does",
  "lessonLabel": "What took the most work",
  "lesson": "I spent most of the time making the investigator check its claims against stored records. Getting a readable answer was easier than getting it to admit when it lacked evidence.",
  "resultsLabel": "How it did on the test cases",
  "metrics": [
    {
      "value": "35",
      "label": "Failure cases evaluated"
    },
    {
      "value": "29-31 / 35",
      "label": "Correct root causes across three runs"
    },
    {
      "value": "100%",
      "label": "Valid citations in the latest run"
    }
  ],
  "resultNote": "Repository-reported results from 35 synthetic development cases also used for tuning, not a held-out evaluation or production guarantee. The latest run found 29 of 35 root causes; 100% citation validity describes that run only.",
  "githubLabel": "Code, tests and screenshots",
  "detailLabel": "Architecture, implementation & original results",
  "stackLabel": "How the data moves",
  "stack": [
    "PostgreSQL",
    "Batch + Debezium / Kafka",
    "Spark + Delta Lake",
    "dbt models",
    "Airflow"
  ],
  "chapters": [
    {
      "label": "Something feels off",
      "title": "The pipeline failed, but the dashboard stayed up.",
      "text": "I built a synthetic commerce platform where I could introduce failures and trace the damage. A failed test can leave downstream models skipped while a dashboard continues to show stale data.",
      "quip": "The chart has excellent composure for something that is wrong.",
      "nodes": [
        "dbt test fails",
        "Models skipped",
        "Dashboard stale"
      ],
      "status": "A quiet failure",
      "evidence": "Collectors gather metadata from dbt, Airflow, Spark, Kafka and the loaders so the investigation starts with recorded facts."
    },
    {
      "label": "Trace the failure",
      "title": "Trace the alerts back to the same failure.",
      "text": "The rule engine uses lineage to group related failures into one incident. It follows downstream dependencies to show the affected tables and dashboards, so an engineer can see where to start.",
      "quip": "One broken table was already enough work.",
      "nodes": [
        "Collected failures",
        "Lineage + rule engine",
        "One incident + impact"
      ],
      "status": "Follow the lineage",
      "evidence": "Metadata collectors, dbt-manifest lineage and reconciliation signals connect failed tests, skipped models and downstream impact."
    },
    {
      "label": "Check the evidence",
      "title": "Every explanation needs a source.",
      "text": "The investigator is read-only and limited to 11 allowlisted, parameterized tools. Hybrid pgvector and full-text retrieval brings in runbooks. A validator rejects uncited or ungrounded claims; when evidence is missing, the investigator must abstain.",
      "quip": "A confident guess is still a guess. It just wears a nicer jacket.",
      "nodes": [
        "Stored evidence",
        "11 approved tools",
        "Cited explanation"
      ],
      "status": "Evidence before confidence",
      "evidence": "Every claim must point back to a real stored record. The investigator explains the likely cause; it does not get unrestricted database or recovery access."
    },
    {
      "label": "Keep a human in charge",
      "title": "Review the recovery before running it.",
      "text": "Rebuilds and backfills need approval from a named person. Each action has a dry run, an audit trail and checks after recovery. The investigator itself has read-only access.",
      "quip": "I gave the AI queries. I kept the repair button with a human.",
      "nodes": [
        "Proposed recovery",
        "Named human approval",
        "Audit + verification"
      ],
      "status": "Approval before action",
      "evidence": "Recovery is a separate, human-approved workflow. The read-only AI investigator cannot execute a fix on its own."
    }
  ]
},
  lab: {
  "heading": "Problems I worked on",
  "sourceLabel": "Technical reference",
  "intro": "At AT&T and IBM, I worked on support search, service-history pipelines and cloud cost reporting. Pick a role to see the work.",
  "eyebrow": "EXPERIENCE",
  "play": "Show me how it works",
  "pause": "Pause walkthrough",
  "reset": "Start again",
  "stepLabel": "Explore the process",
  "problemLabel": "What was going wrong",
  "buildLabel": "How I approached it",
  "impactLabel": "What changed",
  "tradeoffLabel": "Why these tools",
  "tradeoffNote": "These comparisons explain the technical trade-offs. They do not describe a formal vendor evaluation.",
  "usedLabel": "Why this fits",
  "alternativeLabel": "When the alternative makes sense",
  "detailsLabel": "View the original experience details",
  "sceneLabel": "A stylized young inventor works at a holographic computer while data moves through the selected process.",
  "illustrationLabel": "Illustrated workflow • actual outcomes below",
  "fallback": "The lab is in low-power mode. Every step is explained below.",
  "missions": [
    {
      "id": "att-ai-data-engineer",
      "title": "Finding the right support procedure",
      "quip": "8,500 guides. Finding the right one still took too long.",
      "problem": "Support staff needed the right procedure for a specific piece of equipment. They also needed to know it was current. With 8,500 approved guides and incident summaries to search, looking up a reference took a median of 7 minutes in the pilot.",
      "built": "I built ingestion with Python and ADF, added equipment metadata, and connected retrieval through Azure AI Search. Version filters and citation checks kept outdated procedures out of answers. I added incremental indexing, release evaluations and Terraform configurations for development and test.",
      "impact": [
        {
          "value": "7 → 4 min",
          "label": "Median reference lookup in a 35-person pilot"
        },
        {
          "value": "69% → 86%",
          "label": "Top-five hit rate on 180 reviewed questions"
        },
        {
          "value": "11% → 3%",
          "label": "Responses citing superseded procedures"
        }
      ],
      "stages": [
        {
          "label": "Gather",
          "tool": "Python + Azure Data Factory",
          "text": "Bring 8,500 approved guides and incident summaries into the ingestion pipeline.",
          "joke": "First rule: no mystery documents."
        },
        {
          "label": "Give context",
          "tool": "Chunking + equipment metadata",
          "text": "Split content into useful retrieval units and attach equipment-model context so the search can distinguish similar procedures.",
          "joke": "Router manuals are not interchangeable. Who knew?"
        },
        {
          "label": "Find evidence",
          "tool": "Azure AI Search + Azure OpenAI",
          "text": "Retrieve relevant guidance for the support assistant, then use active-version filters and citation checks to keep responses grounded.",
          "joke": "Please include the manual, not just the confidence."
        },
        {
          "label": "Keep it current",
          "tool": "Fingerprints + evaluation + Terraform",
          "text": "Track versions and deletions, process 82% fewer documents than full daily reindexing, and make approved updates searchable within 2 hours.",
          "joke": "Yesterday’s procedure has left the chat."
        }
      ],
      "tools": [
        {
          "name": "Azure AI Search",
          "alternative": "Keyword-only or vector-only search",
          "why": "Equipment codes need exact matching; support questions also need semantic relevance. A combined retrieval approach suits both needs.",
          "when": "Keyword-only can be enough for exact identifier lookup. Vector-only can help meaning-based discovery, but exact codes and versions still need explicit handling.",
          "source": "https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview"
        },
        {
          "name": "Incremental indexing",
          "alternative": "Full daily reindexing",
          "why": "Fingerprints and version tracking let the pipeline focus on changed content, with explicit deletion propagation. The documented result was 82% fewer documents processed.",
          "when": "A full rebuild remains useful for small corpora, recovery, or changes to the chunking/index schema. Incremental loading adds state-management complexity."
        },
        {
          "name": "Terraform",
          "alternative": "Manual portal configuration",
          "why": "Version-controlled infrastructure describes the intended resources consistently across development and test.",
          "when": "Manual configuration can be faster for a short exploration. Repeated environments benefit from reviewable infrastructure code; Terraform also requires state and change management."
        }
      ]
    },
    {
      "id": "att-data-engineer-intern",
      "title": "Putting service histories back together",
      "quip": "The appointment, work order and diagnostic record needed to agree.",
      "problem": "Daily reporting depended on appointment, work-order and diagnostic data from different systems. Duplicates, missing links and late corrections made service histories unreliable. The team needed connected records for repeat-visit analysis before the 7 a.m. reporting cutoff.",
      "built": "I used PySpark in the existing Databricks platform to standardize records and Delta MERGE to apply late corrections. I extended ADF with freshness checks, reconciliation and restart-safe processing. With a data scientist, I prepared 24 point-in-time features, then built reporting tables for the scheduling pilot. The data scientist owned the model.",
      "impact": [
        {
          "value": "89% → 97%",
          "label": "Visit-to-repair-ticket linkage"
        },
        {
          "value": "92% → 99%",
          "label": "On-time completion across six workflows"
        },
        {
          "value": "2 days → 3 hr",
          "label": "Dataset preparation per training iteration"
        }
      ],
      "stages": [
        {
          "label": "Connect the clues",
          "tool": "Azure Databricks + PySpark",
          "text": "Standardize approximately 600,000 monthly appointment, work-order and diagnostic records into service-history tables.",
          "joke": "Same appointment. Three systems. Classic."
        },
        {
          "label": "Repair the history",
          "tool": "Deduplication + Delta MERGE",
          "text": "Standardize completion codes, connect visits to repair tickets, and merge late-arriving corrections without treating every update as a new visit.",
          "joke": "Duplicate records do not count as extra productivity."
        },
        {
          "label": "Beat the cutoff",
          "tool": "ADF freshness + reconciliation checks",
          "text": "Add freshness checks, source reconciliation and restart-safe processing so daily reporting is ready before the 7 a.m. cutoff.",
          "joke": "Late data does not get to move the 7 a.m. deadline."
        },
        {
          "label": "Support decisions",
          "tool": "Point-in-time features + Power BI",
          "text": "Prepare 24 features with a data scientist and reporting for an eight-week, approximately 4,000-appointment pilot. The data scientist owned the model.",
          "joke": "No peeking into the future. That is data leakage."
        }
      ],
      "tools": [
        {
          "name": "PySpark on Databricks",
          "alternative": "Single-machine pandas",
          "why": "The existing Databricks environment fit repeatable joins and transformations feeding Delta tables. Reusing that platform mattered more than adding another tool.",
          "when": "Pandas can be simpler for small, in-memory work. 600,000 monthly records alone does not prove Spark was necessary; platform fit and workflow requirements matter."
        },
        {
          "name": "Delta MERGE",
          "alternative": "Append-only tables or full replacement",
          "why": "Service histories needed both new rows and corrections to existing rows. MERGE supports inserts and updates, paired with upstream deduplication.",
          "when": "Append-only works for immutable events. Full replacement can be simpler for small snapshots, but reprocesses unchanged data.",
          "source": "https://learn.microsoft.com/en-us/azure/databricks/delta/merge"
        },
        {
          "name": "Azure Data Factory",
          "alternative": "A new Airflow deployment",
          "why": "Extending the existing ADF workflows kept source checks and restart-safe processing in the orchestration path already used by the team.",
          "when": "Airflow can fit Python-led orchestration across heterogeneous systems. Migrating a working workflow would introduce operational work without a documented need here."
        }
      ]
    },
    {
      "id": "ibm-data-engineer",
      "title": "Finding waste in the AWS bill",
      "quip": "The servers were idle. The billing department was not.",
      "problem": "The AWS bill showed the spend, but connecting charges to the right owners and resource usage took more work. Ownership changed over time, and billing corrections had to be included without double-counting. The team needed reliable daily cost reporting and evidence for cleanup decisions.",
      "built": "I used Python and AWS Glue to prepare billing and inventory data in S3, then loaded it into Snowflake. dbt and SQL models matched charges to ownership history. Joining utilization data helped identify idle instances and unattached storage for owners to review. Airflow ran the workflow, and reconciliation checks helped verify the savings across three billing cycles.",
      "impact": [
        {
          "value": "$9K / month",
          "label": "Savings verified over three billing cycles"
        },
        {
          "value": "81% → 96%",
          "label": "Spend attributed to accountable owners"
        },
        {
          "value": "105 → 62 min",
          "label": "Daily processing time;  41% faster"
        }
      ],
      "stages": [
        {
          "label": "Follow the money",
          "tool": "Python + AWS Glue + S3",
          "text": "Standardize billing and inventory data in S3, then load curated files through Snowflake external stages and COPY INTO.",
          "joke": "Step one: replace spreadsheet archaeology."
        },
        {
          "label": "Find the owner",
          "tool": "dbt + Snowflake SQL",
          "text": "Model effective-dated ownership so spending maps to accountable cost centers across approximately $180,000 in monthly AWS usage.",
          "joke": "“Someone’s server” is not a cost center."
        },
        {
          "label": "Spot the waste",
          "tool": "Billing + utilization joins",
          "text": "Identify idle development instances and unattached storage. Resource owners approve cleanup; the pipeline does not delete resources automatically.",
          "joke": "A sleeping instance can still send an invoice."
        },
        {
          "label": "Prove the savings",
          "tool": "Airflow + incremental loads + checks",
          "text": "Coordinate ingestion, loading, transformations and validation. Verify savings across billing cycles and reduce dataset sign-off from 3 business days to 1.",
          "joke": "Savings are only real when the next bill agrees."
        }
      ],
      "tools": [
        {
          "name": "Snowflake + dbt",
          "alternative": "Python-only reporting scripts",
          "why": "SQL models suited billing joins and ownership history. dbt organized transformations and tests so reporting logic and validation were reviewable together.",
          "when": "Python is useful for irregular parsing and non-SQL analysis; and was used for ingestion here. A small one-off report may not need a warehouse modeling layer."
        },
        {
          "name": "S3 stages + COPY INTO",
          "alternative": "Row-by-row database inserts",
          "why": "The pipeline already produced curated files in S3. Bulk file loading fit that handoff into Snowflake.",
          "when": "Row inserts can suit tiny transactional writes. More continuous ingestion may justify a different loading pattern; it was not required by this daily reporting story.",
          "source": "https://docs.snowflake.com/en/user-guide/data-load-s3-copy"
        },
        {
          "name": "Apache Airflow",
          "alternative": "Independent cron jobs",
          "why": "Ingestion, loading, transformations and checks had ordered dependencies. DAGs make those relationships explicit in a coordinated workflow.",
          "when": "Cron is lightweight for one independent task. Airflow brings operational overhead that is more worthwhile as dependencies and recovery needs grow.",
          "source": "https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/"
        }
      ]
    }
  ]
},
  identity: {
    name: 'Abhai Sai Nikhil Pothuraju',
    shortName: 'Abhai Sai Nikhil Pothuraju',
    title: 'AI Data Engineer | RAG | Azure | Databricks | PySpark | SQL',
    location: 'Chicago, IL;  Open to Relocation / Remote',
    email: 'Abhaipothuraju@gmail.com',
    linkedin: 'https://www.linkedin.com/in/abhai-sai-nikhil-pothuraju-8144583a6/',
    github: 'https://github.com/nikhilx23',
    photo: '/profile.jpg',
    photoAlt: 'Portrait of Abhai Sai Nikhil Pothuraju',
    resume: '/resume.pdf',
  },
  navigation: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    headlineFirst: 'Abhai Sai Nikhil Pothuraju',
    headlineAccent: 'AI Data Engineer',
    portraitCaption: 'AI Data Engineer',
    scrollLabel: 'Explore my work',
    welcome: "Hi, I'm Abhai Sai Nikhil Pothuraju. Welcome to my corner of the internet.",
    description: 'AI Data Engineer building reliable pipelines, lakehouses and RAG retrieval systems.',
    projectsLabel: 'View Projects',
    resumeLabel: 'Download Resume',
    contactLabel: "Let's Connect",
  },
  about: {
    heading: 'About',
    summary: 'AI Data Engineer with 3 years of data engineering experience across AT&T and IBM, building cloud ETL/ELT pipelines, lakehouse tables, and data warehouses with Python, SQL, Azure Databricks, PySpark, Delta Lake, Snowflake, dbt, and Apache Airflow. Delivered measurable outcomes in performance (41% faster daily processing), cost ($9K/month in verified AWS savings), and data reliability (99% on-time delivery before reporting cutoffs). Builds AI data infrastructure, including RAG ingestion and retrieval pipelines on Azure AI Search and Azure OpenAI that raised top-five retrieval hit rate from 69% to 86%. Experienced in incremental loading, data quality validation, infrastructure as code (Terraform), and CI/CD with GitHub Actions.',
    shortSummary: 'AI Data Engineer with 3 years of data engineering experience across AT&T and IBM, building cloud ETL/ELT pipelines, lakehouse tables, and data warehouses. Builds AI data infrastructure, including RAG ingestion and retrieval pipelines on Azure AI Search and Azure OpenAI.',
    stats: [
      { value: 3, prefix: '', suffix: '', label: 'years experience', accessibleLabel: '3 years experience' },
      { value: 41, prefix: '', suffix: '%', label: 'faster processing', accessibleLabel: '41% faster processing' },
      { value: 9, prefix: '$', suffix: 'K', label: '/month saved', accessibleLabel: '$9K/month saved' },
      { value: 86, prefix: '', suffix: '%', label: 'retrieval hit rate', accessibleLabel: '86% retrieval hit rate' },
    ],
  },
  experience: [
    {
      id: 'att-ai-data-engineer',
      company: 'AT&T', title: 'AI Data Engineer', location: 'Chicago, IL',
      dates: 'May 2026 - Present', project: 'Network Support Knowledge Retrieval (RAG)',
      bullets: [
        'Built Python and Azure Data Factory ingestion pipelines for 8,500 approved troubleshooting guides and incident summaries, powering an Azure OpenAI assistant that cut median reference lookup time from 7 to 4 minutes in a 35-person pilot.',
        'Raised top-five retrieval hit rate from 69% to 86% on 180 SME-reviewed questions by refining document chunking, adding equipment-model metadata, and tuning retrieval in Azure AI Search.',
        'Implemented document fingerprints, version tracking, and deletion propagation for incremental indexing, making approved updates searchable within 2 hours while processing 82% fewer documents than full daily reindexing.',
        'Reduced responses citing superseded procedures from 11% to 3% by adding active-version filters and citation checks.',
        'Integrated automated retrieval evaluations into the release workflow, gating index and retrieval changes against the SME-reviewed question set before deployment.',
        'Provisioned Azure AI Search and supporting storage with Terraform, maintaining version-controlled infrastructure-as-code configurations for repeatable deployments across development and test environments.',
      ],
    },
    {
      id: 'att-data-engineer-intern',
      company: 'AT&T', title: 'Data Engineer Intern', location: 'Remote',
      dates: 'May 2025 - May 2026', project: 'Repeat Service Visit Analytics',
      bullets: [
        'Developed PySpark transformations in Azure Databricks to consolidate approximately 600,000 monthly appointment, work-order, and diagnostic records into Delta Lake service-history tables for daily field-operations reporting.',
        'Improved visit-to-repair-ticket linkage from 89% to 97% by implementing deduplication, completion-code standardization, and Delta MERGE logic for late-arriving updates.',
        'Raised on-time completion before the 7 a.m. reporting cutoff from 92% to 99% across six workflows by extending Azure Data Factory pipelines with freshness checks, source reconciliation, and restart-safe processing.',
        'Partnered with a data scientist to build 24 point-in-time features that excluded information unavailable at prediction time, preventing data leakage and cutting dataset preparation from 2 days to 3 hours per training iteration.',
        'Prepared daily risk-score reporting tables and a Power BI scorecard for an eight-week scheduling pilot covering approximately 4,000 appointments, supporting reviews of appointment risk and repeat-visit outcomes.',
      ],
    },
    {
      id: 'ibm-data-engineer',
      company: 'IBM', title: 'Data Engineer', location: 'Hyderabad, India',
      dates: 'Jan 2023 - Aug 2024', project: 'Internal Infrastructure Cost and Usage Analytics',
      bullets: [
        'Built Python and AWS Glue pipelines to standardize billing and inventory data in Amazon S3 and load curated datasets into Snowflake via external stages and COPY INTO, replacing manual preparation for daily cost reporting.',
        'Developed dbt and Snowflake SQL models for billing and effective-dated cost-center ownership, increasing spend attributable to accountable owners from 81% to 96% across approximately $180,000 in monthly AWS usage.',
        'Joined billing and utilization data to identify idle development instances and unattached storage, supporting owner-approved cleanup that reduced spend by approximately $9,000 per month, verified across three consecutive billing cycles.',
        'Cut daily processing time from 105 to 62 minutes (41%) using incremental extraction, partitioned Parquet, and Snowflake MERGE operations that incorporated new charges and billing corrections without duplicating records.',
        'Orchestrated AWS Glue ingestion, Snowflake loading, dbt transformations, and validation in Apache Airflow DAGs.',
        'Added dbt tests and SQL reconciliation checks for billing totals, duplicate charges, and ownership mappings, reducing monthly dataset sign-off from 3 business days to 1.',
      ],
    },
  ] satisfies Experience[],
  projects: [
    {
      id: 'dataops-investigator', name: 'DataOps Investigator - AI Data Reliability Platform', featured: true,
      technologies: ['Python', 'Kafka', 'Spark', 'dbt', 'Airflow', 'PostgreSQL', 'Claude API'],
      github: 'https://github.com/nikhilx23/dataops-investigator', dashboard: null,
      bullets: [
        'Built a synthetic e-commerce data platform with batch and CDC ingestion (Debezium, Kafka), a Spark and Delta Lake lakehouse, dbt dimensional models with SCD2 history, and Airflow orchestration.',
        'Developed metadata collectors, dbt-manifest lineage, and a rule-based incident engine that correlates failed tests, skipped models, and reconciliation mismatches into one incident with downstream dashboard impact.',
        'Built a read-only LLM investigator with 11 allowlisted, parameterized tools and hybrid pgvector and full-text runbook retrieval; a validator rejects uncited or ungrounded claims and forces abstention when evidence is insufficient.',
        'Evaluated on 35 failure cases with Claude Haiku: correct root cause in 29-31 cases across three runs, 100% valid citations in the final run, and zero forbidden actions.',
        'Added human-approved recovery actions with dry runs, audit logs, and post-recovery verification, served through FastAPI, Streamlit, and Prometheus/Grafana with GitHub Actions CI.',
      ],
      screenshots: [
        { src: '/projects/dataops-1.png', alt: 'DataOps Investigator;  screenshot 1' },
        { src: '/projects/dataops-2.png', alt: 'DataOps Investigator;  screenshot 2' },
      ],
    },
{
  "id": "people-analytics",
  "name": "People Analytics AI Copilot",
  "featured": false,
  "technologies": [
    "Python",
    "FastAPI",
    "PostgreSQL",
    "MCP tools",
    "RBAC",
    "Streamlit"
  ],
  "github": "https://github.com/nikhilx23/People-analytics-ai-copilot",
  "dashboard": null,
  "screenshots": [],
  "bullets": [
    "Versioned analytical methods keep formulas, inputs and intermediate values inspectable instead of asking the language model to invent the arithmetic.",
    "Role-based access scopes managers to their department; PII screening, SQL restrictions and audit logs constrain the question-to-answer path.",
    "Repository-reported evaluation: 203 of 204 generated questions answered correctly through the rule-based path, plus 41 adversarial cases handled safely. These are test-suite results, not a blanket security guarantee."
  ],
  "story": {
    "hook": "Workforce questions, with access checks built in.",
    "intro": "I built this copilot to answer workforce questions using defined calculations and role-based access. Users can check how a metric was calculated, and managers only get data within their permitted scope.",
    "scope": "Personal project • 520 fictional employees • Live LLM and Azure integrations not verified in the repository",
    "chapters": [
      {
        "label": "Ask a question",
        "title": "Check what the user is allowed to see.",
        "text": "The request passes through PII screening and role checks. A manager gets their department's view, not a surprise backstage pass to the entire company.",
        "nodes": [
          "Question",
          "PII + role checks",
          "Allowed scope"
        ]
      },
      {
        "label": "Do the maths",
        "title": "Keep the calculations in tested tools.",
        "text": "FastAPI routes questions to predefined analytics tools with versioned formulas. Python calculates the metrics; the optional LLM helps choose tools. I would rather debug a formula than argue with a chatbot about division.",
        "nodes": [
          "Intent routing",
          "Governed tool",
          "Calculated metric"
        ]
      },
      {
        "label": "Check the answer",
        "title": "Let the user check the calculation.",
        "text": "Explanations expose the method, version, inputs and intermediate values. I added reference-based evaluations and adversarial cases to check the answers and access restrictions.",
        "nodes": [
          "Result",
          "Method + evidence",
          "Audit record"
        ]
      }
    ],
    "why": "Why this stack? FastAPI exposes controlled tools, PostgreSQL holds structured workforce data, and Python owns the calculations. Free-form LLM arithmetic would make repeatability and auditing harder; unrestricted SQL would make access control harder.",
    "evidence": "203/204 questions correct in the reported rule-based evaluation. Real LLM calls were not exercised.",
    "source": "https://github.com/nikhilx23/People-analytics-ai-copilot#readme"
  }
},
{
  "id": "retailpulse",
  "name": "RetailPulse;  Retail Data & Analytics Platform",
  "featured": false,
  "technologies": [
    "Python",
    "SQL",
    "SQLite",
    "RFM + K-Means",
    "Holt-Winters",
    "Power BI model"
  ],
  "github": "https://github.com/nikhilx23/retailpulse",
  "dashboard": "https://github.com/nikhilx23/retailpulse-dashboard",
  "screenshots": [],
  "bullets": [
    "Cleaned inconsistent dates, duplicate records, category labels and price anomalies; preserved returns as negative revenue rather than quietly deleting inconvenient rows.",
    "Built relational SQL analysis, RFM and K-Means customer segmentation, and a Holt-Winters forecast compared with a naive baseline.",
    "Delivered an HTML dashboard, Excel analysis, and Power BI star-schema CSV exports with a DAX build guide. The repository does not contain a finished Power BI .pbix report."
  ],
  "story": {
    "hook": "The dashboard started with a messy set of retail files.",
    "intro": "I built RetailPulse around the work that comes before a useful dashboard: fixing inconsistent records, checking joins and defining the reporting model. From there, I added customer segmentation and demand forecasting.",
    "scope": "Personal project • Synthetic retail data • Forecast results are dataset-specific",
    "chapters": [
      {
        "label": "Clean the chaos",
        "title": "First, stop counting the same sale twice.",
        "text": "Python standardizes dates and categories, resolves duplicates and checks relationships. Returns stay in the data as negative revenue. Deleting them would be a bold new accounting strategy. Also a bad one.",
        "nodes": [
          "Messy records",
          "Validation + cleaning",
          "Consistent tables"
        ]
      },
      {
        "label": "Build the model",
        "title": "Build tables that reporting can reuse.",
        "text": "SQLite and SQL turn the cleaned records into repeatable sales, customer and product analysis. Star-schema exports provide a shared structure for BI work instead of rebuilding the logic inside every chart.",
        "nodes": [
          "Clean tables",
          "SQL transformations",
          "BI-ready model"
        ]
      },
      {
        "label": "Find the pattern",
        "title": "Who comes back? What might sell next?",
        "text": "RFM and K-Means group purchasing behaviour; Holt-Winters forecasts demand against a naive baseline. The reported three-month holdout reached 8.5% MAPE versus 37.9% for the baseline. That comparison uses synthetic data, so I treat it as a modelling exercise.",
        "nodes": [
          "Customer + sales history",
          "Segments + forecast",
          "Dashboard + findings"
        ]
      }
    ],
    "why": "Why this stack? Python handles messy records and statistical modelling; SQL makes joins and metric logic inspectable. SQLite is sufficient for this local dataset. A distributed Spark cluster would add operational work without an established scale requirement.",
    "evidence": "8.5% forecast MAPE versus 37.9% naive baseline on a three-month synthetic holdout; not a real retailer's measured business impact.",
    "source": "https://github.com/nikhilx23/retailpulse/blob/main/docs/statistical_findings.md"
  }
},
  ] satisfies Project[],
  skills: [
    { name: 'Programming & APIs', skills: ['Python', 'SQL', 'FastAPI', 'REST APIs'] },
    { name: 'Data Platforms', skills: ['Snowflake', 'Azure Databricks', 'Apache Spark (PySpark)', 'Delta Lake', 'dbt', 'PostgreSQL'] },
    { name: 'Streaming & CDC', skills: ['Apache Kafka', 'Debezium', 'Spark Structured Streaming'] },
    { name: 'Cloud - Azure', skills: ['Azure Data Factory', 'Azure Databricks', 'Azure AI Search', 'Azure OpenAI'] },
    { name: 'Cloud - AWS', skills: ['Amazon S3', 'AWS Glue'] },
    { name: 'Data Engineering', skills: ['ETL/ELT', 'Data Modeling', 'Star Schema', 'Data Warehousing', 'Lakehouse', 'Incremental Loading', 'Delta MERGE', 'Late-Arriving Data', 'Deduplication', 'Data Quality Validation', 'Source Reconciliation', 'Data Lineage'] },
    { name: 'Orchestration & DevOps', skills: ['Apache Airflow', 'Terraform', 'Docker', 'GitHub Actions', 'dbt Tests', 'Prometheus', 'Grafana'] },
    { name: 'AI & ML Data', skills: ['RAG', 'Hybrid Search', 'pgvector', 'Vector Indexing', 'Retrieval Evaluation', 'LLM Tool Use and Evaluation', 'Point-in-Time Feature Engineering'] },
    { name: 'BI & Analytics', skills: ['Power BI', 'Streamlit', 'Dashboarding'] },
    { name: 'Security & Governance', skills: ['RBAC', 'Version Tracking', 'Citation Validation', 'Audit Logging'] },
  ] satisfies SkillGroup[],
  education: [{
    school: 'University of Illinois Springfield',
    degree: 'Master of Science in Computer Science',
    location: 'Springfield, IL', dates: 'Aug 2024 - May 2026',
  }],
  contact: {
    heading: "Let's Connect",
    closing: "Thanks for taking a look. If my work fits your team, get in touch.",
    emailLabel: 'Email', linkedinLabel: 'LinkedIn', githubLabel: 'GitHub',
  },
  labels: {
    pauseBackground: 'Pause background motion',
    resumeBackground: 'Resume background motion',
    projectJourney: 'Explore the build', projectDetails: 'Under the hood', projectEvidence: 'Evidence and limits', projectSource: 'Read the source notes', dashboardSource: 'Dashboard source',
    technologies: 'Technologies',
    cloudFallback: 'Explore the complete grouped skills list below.',
    cloudControls: 'Skills cloud controls',
    pauseRotation: 'Pause rotation',
    resumeRotation: 'Resume rotation',
    rotateLeft: 'Rotate skills left',
    rotateRight: 'Rotate skills right',
    rotateUp: 'Rotate skills up',
    rotateDown: 'Rotate skills down',
    navigation: 'Main navigation',
    portraitFallback: 'Abhai Sai Nikhil Pothuraju; portrait not yet supplied',
    phasePlaceholder: 'This section will be added in the next portfolio phases.',
    experience: 'Experience', projects: 'Projects', skills: 'Skills', education: 'Education',
    featured: 'Featured', github: 'GitHub', dashboard: 'Dashboard',
    unavailableLink: 'Link not provided', unavailableResume: 'Resume not yet available',
    unavailableScreenshot: 'Screenshot coming soon', skipToContent: 'Skip to content',
    openMenu: 'Open navigation', closeMenu: 'Close navigation',
    skillInstructions: 'Drag to explore skills. The complete grouped list is below.',
    backToTop: 'Back to top', copyright: 'Abhai Sai Nikhil Pothuraju',
  },
  seo: {
    title: 'Abhai Sai Nikhil Pothuraju | AI Data Engineer',
    description: 'Abhai Sai Nikhil Pothuraju is an AI Data Engineer based in Chicago, building reliable pipelines, lakehouses and RAG retrieval systems with Azure, Databricks, PySpark, Snowflake and SQL.',
    // Set after choosing the real production URL. Never invent a canonical URL.
    siteUrl: null as string | null,
    ogImage: '/og-image.png',
    ogImageAlt: 'Abhai Sai Nikhil Pothuraju; AI Data Engineer. Azure, Databricks, PySpark, Snowflake and SQL.',
  },
};

export type Portfolio = typeof portfolio;
