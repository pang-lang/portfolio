import React, { useState } from 'react';
import { ExternalLink, Github as GithubIcon, X, ArrowRight, Code2, Database, BarChart, Server, Cloud, Blocks, ComputerIcon } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import LogoLoop from '../components/LogoLoop';
import useScrollReveal from '../hooks/useScrollReveal';

const getIconForSkill = (skill) => {
    const s = skill.toLowerCase();
    if (s.includes('sql') || s.includes('hadoop') || s.includes('hive')) return <Database size={32} />;
    if (s.includes('azure') || s.includes('cloud') || s.includes('firebase')) return <Cloud size={32} />;
    if (s.includes('tableau') || s.includes('power bi') || s.includes('matplotlib') || s.includes('seaborn') || s.includes('excel')) return <BarChart size={32} />;
    if (s.includes('git')) return <GithubIcon size={32} />;
    if (s.includes('react') || s.includes('flutter') || s.includes('streamlit') || s.includes('pandas') || s.includes('numpy')) return <Blocks size={32} />;
    if (s.includes('fastapi') || s.includes('django') || s.includes('spark')) return <Server size={32} />;
    return <Code2 size={32} />;
};

const Projects = () => {
    const [activeTab, setActiveTab] = useState('AI/ML');
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedCompetition, setSelectedCompetition] = useState(null);

    const winsRef = useScrollReveal();
    const projectsRef = useScrollReveal();
    const githubRef = useScrollReveal();
    const skillsRef = useScrollReveal();
    const certsRef = useScrollReveal();

    const competitions = [
        {
            title: 'Chin Hin AI Hackathon', award: '3rd Place', date: 'Mar 2026', icon: '🥉',
            relatedProjectTitle: '',
            photos: ['/assets/chinhin/1.webp', '/assets/chinhin/2.webp', '/assets/chinhin/3.webp', '/assets/chinhin/4.webp']
        },
        {
            title: 'Cursor x Anthropic Hackathon Malaysia', award: '2nd Place - Best Use of TiDB', date: 'Dec 2025', icon: '🥈',
            relatedProjectTitle: 'FinanceAssist',
            photos: ['/assets/cursor/1.webp', '/assets/cursor/2.webp', '/assets/cursor/3.webp', '/assets/cursor/4.webp']
        },
        {
            title: 'UKM Data Challenge 4.0', award: 'Consolation Award', date: 'May 2025', icon: '🏅',
            relatedProjectTitle: 'Public Transport Ridership in Klang Valley',
            photos: ['/assets/data challenge/1.webp', '/assets/data challenge/2.webp', '/assets/data challenge/3.webp', '/assets/data challenge/4.webp']
        },
        {
            title: 'USM Varsity Hackathon', award: 'Consolation Award', date: 'Apr 2025', icon: '🏅',
            relatedProjectTitle: 'MediMind',
            photos: ['/assets/vhack/1.webp', '/assets/vhack/2.webp', '/assets/vhack/3.webp', '/assets/vhack/4.webp', '/assets/vhack/5.webp','/assets/vhack/6.webp','/assets/vhack/7.webp']
        },
        {
            title: 'Dell Hack2Hire Program', award: '3rd Place Award', date: 'Jan 2025', icon: '🥉',
            relatedProjectTitle: 'Graduate Matching Platform',
            photos: ['/assets/dellH2H/1.webp', '/assets/dellH2H/2.webp', '/assets/dellH2H/3.webp', '/assets/dellH2H/4.webp']
        },
        {
            title: 'UMDAC Datathon', award: 'Top 10 Finalist', date: 'Dec 2024', icon: '🏅',
            relatedProjectTitle: 'Cryptocurrency Market Analysis',
            photos: ['/assets/umdac/1.webp', '/assets/umdac/2.webp', '/assets/umdac/3.webp', '/assets/umdac/4.webp', '/assets/umdac/5.webp']
        },
    ];

    const projectsData = [
        {
            category: 'AI/ML',
            title: 'Multimodal Radiology VQA System',
            image: '/assets/projects/radiology-vqa.webp',
            tag: 'AI/ML',
            shortDesc: 'Lightweight multimodal AI system combining computer vision and NLP to answer clinical questions from radiology images in real time.',
            points: [
                'Designed a dual-head architecture integrating MobileNetV3 (vision) and DistilBERT (text), achieving 69.4% accuracy with 1.9× parameter reduction.',
                'Built a medical-safe data augmentation and answer normalization pipeline, cutting unknown token rate to under 1%.',
                'Deployed a production Streamlit app delivering real-time inference under 20ms across 2,248 Q&A pairs.'
            ],
            links: [
                { label: 'GitHub', url: 'https://github.com/pang-lang/datascienceproject', icon: <GithubIcon size={16} /> },
                { label: 'Live App', url: 'https://dsp-rad.streamlit.app', icon: <ExternalLink size={16} /> },
            ],
            techStack: 'Python, Streamlit, Hugging face, numpy, scikit-learn, matplotlib, seaborn, pandas, spacy, pytorch'
        },
        {
            category: 'AI/ML',
            title: 'FinanceAssist',
            image: '/assets/projects/FinanceAssist.webp',
            tag: 'AI/ML',
            shortDesc: 'AI-powered personal finance assistant to help users track, analyze, and understand their financial behavior.',
            points: [
                'Built a multi-feature finance tracker covering manual entry, speech-to-text input, auto-categorization, subscription alerts, and receipt OCR with bill splitting via WhatsApp.',
                'Integrated a RAG chatbot for personalized financial insights and plain-language spending summaries.',
                'Awarded 2nd Place & Best Use of TiDB at the Cursor × Anthropic Hackathon.'
            ],
            links: [
                { label: 'GitHub', url: 'https://github.com/pang-lang/financeassistance', icon: <GithubIcon size={16} /> },
                { label: 'DevPost', url: 'https://devpost.com/software/finger', icon: <ComputerIcon size={16} /> },
            ],
            techStack: 'React, TailwindCSS, Taggun OCR, TiDB, FastAPI'
        },
        {
            category: 'AI/ML',
            title: 'AI Financial Analytics',
            image: '/assets/projects/DM.webp',
            tag: 'AI/ML',
            shortDesc: 'Combined machine learning and LLMs to enhance financial data analysis and credit risk prediction.',
            points: [
                'Integrated a quantized Mistral-7B LLM to auto-generate plain-English interpretations of EDA outputs.',
                'Built a logistic regression model with feature engineering achieving 91% accuracy and 0.96 ROC-AUC for credit default prediction.'
            ],
            links: [
                { label: 'GitHub', url: 'https://github.com/Wrynaft/FinancialDataMining', icon: <GithubIcon size={16} /> },
            ],
            techStack: 'Python, Pandas, NumPy, Scikit-learn, Hugging face, Mistral, Matplotlib, Seaborn'
        },
        {
            category: 'Data Analytics & Visualization',
            title: 'Malaysia Crime Analytics Dashboard',
            image: '/assets/projects/crime.webp',
            tag: 'Data Analytics',
            shortDesc: 'Interactive Tableau dashboard analyzing crime patterns across Malaysia through multi-dimensional data storytelling.',
            points: [
                'Explored 8 years of crime data across all states, segmented by population density, crime category, and socioeconomic factors.',
                'Built an interactive Tableau dashboard with filters and drill-downs to help users identify high-risk areas.'
            ],
            links: [
                { label: 'Tableau', url: 'https://public.tableau.com/app/profile/daphne.pl/viz/DataVisAssignment_17672457397310/Story1', icon: <ExternalLink size={16} /> }
            ],
            techStack: 'Tableau'
        },
        {
            category: 'Data Analytics & Visualization',
            title: 'E-commerce BI Dashboard — MestiLaku',
            image: '/assets/projects/BAI.webp',
            tag: 'Business Intelligence',
            shortDesc: 'Led the design of a full BI solution for an e-commerce company, from data modeling to interactive dashboards.',
            points: [
                'Led a team of 5 to design a data warehouse schema and ETL pipeline, then built a Power BI dashboard tracking sales performance, customer behavior, and product insights.',
                'Surfaced metrics on redemption rates and spending patterns segmented by age, income category, and household profile.'
            ],
            links: [],
            techStack: 'Power BI'
        },
        {
            category: 'Data Systems & Engineering',
            title: 'Oracle Database Design',
            image: '/assets/projects/oracle.webp',
            tag: 'Database',
            shortDesc: 'Designed and implemented a normalized relational database system based on real-world business requirements.',
            points: [
                'Led a team of 5 through full-cycle database design — from stakeholder interviews and ERD modeling to 3NF normalization and Oracle SQL implementation.',
                'Built and validated queries covering DML, DDL, joins, aggregations, and nested queries against real-world use cases.'
            ],
            links: [],
            techStack: 'SQL, Oracle Apex'
        },
        {
            category: 'Data Systems & Engineering',
            title: 'Hadoop vs Spark Performance Analysis',
            tag: 'Big Data',
            image: '/assets/projects/spark-hadoop.webp',
            shortDesc: 'Compared distributed data processing frameworks by benchmarking performance across large-scale operations.',
            points: [
                'Implemented identical MapReduce workloads in both Hadoop and Apache Spark, measuring execution time and CPU utilization.',
                'Visualized performance trade-offs between Hadoop\'s batch processing and Spark\'s in-memory computation across multiple operation types.'
            ],
            links: [
                { label: 'GitHub', url: 'https://github.com/Wrynaft/Hadoop-Spark-Comparison', icon: <GithubIcon size={16} /> }
            ],
            techStack: 'Apache Hadoop, Spark, HDFS, Linux'
        },
        {
            category: 'Others',
            title: 'Cryptocurrency Market Analysis',
            image: '/assets/projects/404_Found.webp',
            tag: 'Data Science',
            shortDesc: 'Modeled cryptocurrency market behavior to improve forecasting and anomaly detection.',
            points: [
                'Analyzed price movement drivers using XGBoost and Random Forest across 5 years of market data (2020–2025).',
                'Built models for trend forecasting and anomaly detection, placing Top 10 Finalist in the datathon.'
            ],
            links: [
                { label: 'GitHub', url: 'https://github.com/pang-lang/404Found', icon: <GithubIcon size={16} /> }
            ],
            techStack: 'Scikit-learn, Python, Pandas, NumPy, Matplotlib, Seaborn'
        },
        {
            category: 'Others',
            title: 'MediMind',
            tag: 'Hackathon',
            image: '/assets/projects/MediMind.webp',
            shortDesc: 'AI-powered healthcare assistant for patient engagement and healthcare management.',
            points: [
                'Built features for appointment management, medication reminders, and speech-to-text summaries.',
                'Implemented an AI chatbot and emergency support system for health queries and mental health crisis assistance, earning a Consolation Award at USM Varsity Hackathon 2025.'
            ],
            links: [
                { label: 'GitHub', url: 'https://github.com/Xuannn28/vhack2025', icon: <GithubIcon size={16} /> }
            ],
            techStack: 'Expo, React, TailwindCSS, Python, Flask, Firestore, Google Cloud Speech API, Hugging Face, Gemini API, Javascript, ExpressJS'
        },
        {
            category: 'Others',
            title: 'Energy Risk & Efficiency Analytics',
            tag: 'Analytics',
            image: '/assets/projects/Energy.webp',
            shortDesc: 'Data-driven dashboard to evaluate power plant efficiency and energy supply risk.',
            points: [
                'Built efficiency ranking models to identify top and underperforming power plants across regional and operational dimensions.',
                'Deployed a live interactive Streamlit dashboard integrating financial and operational KPIs to support energy risk planning.'
            ],
            links: [
                { label: 'GitHub', url: 'https://github.com/pang-lang/RiskStorm', icon: <GithubIcon size={16} /> },
                { label: 'Streamlit', url: 'https://teamfullhouse-riskstorm.streamlit.app', icon: <ExternalLink size={16} /> }
            ],
            techStack: 'Streamlit, Python, Pandas, NumPy, Matplotlib, Seaborn'
        },
        {
            category: 'Others',
            title: 'Employment Forecasting — MDIT',
            image: '/assets/projects/MDIT.webp',
            tag: 'Time Series',
            shortDesc: 'Forecasted sector-level employment trends using time series and machine learning models.',
            points: [
                'Benchmarked SARIMAX, ARIMA, Prophet, and XGBoost over a 12-month holdout; SARIMAX achieved best performance at 0.74% median MAPE.',
                'Ranked industries by projected employment trajectory to support workforce strategy and policy planning.'
            ],
            links: [
                { label: 'Link', url: 'https://drive.google.com/drive/u/1/folders/13PrVzQwo_9B5q1c6uM5c0eB9SqtU5MK6', icon: <ExternalLink size={16} /> }
            ],
            techStack: 'Python, Pandas, NumPy, Statsmodels, Prophet, XGBoost, Matplotlib'
        },
        {
            category: 'Others',
            title: 'Graduate Matching Platform',
            image: '/assets/projects/Dell.webp',
            tag: 'Hackathon',
            shortDesc: 'Platform bridging graduates and employers through curriculum-to-job skill matching.',
            points: [
                'Built a keyword extraction system to map academic curricula to job requirements, improving skill-gap visibility for students.',
                'Awarded 3rd Place at the Dell Hack2Hire Program.'
            ],
            links: [
                { label: 'GitHub', url: 'https://github.com/pang-lang/dellH2H', icon: <GithubIcon size={16} /> }
            ],
            techStack: 'Streamlit'
        },
        {
            category: 'Others',
            title: 'Seamless Employee App Experience',
            image: '/assets/projects/BC5.webp',
            tag: 'AI',
            shortDesc: 'A smoother, smarter employee app designed to streamline internal workflows and improve user experience.',
            points: [
                'Redesigned employee journey to reduce friction and improve usability across internal processes.',
                'Focused on simplifying workflows to enhance efficiency and user satisfaction.'
            ],
            links: [
                { label: 'Frontend App (Live)', url: 'https://lemon-desert-0513c1210.1.azurestaticapps.net/' },
                { label: 'Backend (GitHub)', url: 'https://github.com/yccccc12/chinhin-employee-app' }
            ],
            techStack: 'AI, Microsoft Azure, Microsoft Foundry, Full Stack'
        },
        {
            category: 'Others',
            title: 'AI Customer Success Guardian',
            image: '/assets/projects/BC6.webp',
            tag: 'AI',
            shortDesc: 'An AI-powered customer support system that automates issue resolution, integrates technician job workflows, and provides admin analytics for end-to-end service management.',
            points: [
                'Built an end-to-end AI workflow that understands customer queries, checks warranty, and automatically generates service tickets.',
                'Developed a technician workflow system covering job assignment, status tracking, and completion.',
                'Implemented an admin dashboard with analytics for monitoring service performance and operations.'
            ],
            links: [
                { label: 'Customer Portal (Live)', url: 'https://thankful-dune-0f7efd410.2.azurestaticapps.net/' },
                { label: 'Technician Portal (Live)', url: 'https://brave-mud-09fc45f10.1.azurestaticapps.net' },
                { label: 'Backend (GitHub)', url: 'https://github.com/yccccc12/chinhin-customer-sales-support' },
                { label: 'Frontend – Customer (GitHub)', url: 'https://github.com/liona8/CustomerSalesSupportApp-Frontend' },
                { label: 'Frontend – Technician (GitHub)', url: 'https://github.com/pang-lang/technicianportal' }
            ],
            techStack: 'AI, Microsoft Azure, Microsoft Foundry, Automation, Full Stack'
        }
    ];

    const tabs = ['AI/ML', 'Data Analytics & Visualization', 'Data Systems & Engineering', 'Others'];

    const skillsData = [
        'Python', 'Java', 'SQL', 'R',
        'Scikit-Learn', 'TensorFlow', 'Pandas', 'NumPy', 'Keras',
        'Apache Hadoop', 'Apache Spark', 'Apache Hive', 'Github', 'Git',
        'Tableau', 'Power BI', 'Excel', 'matplotlib', 'Seaborn',
        'FastAPI', 'Streamlit', 'React', 'Django', 'Flutter', 'Firebase',
        'Microsoft Azure'
    ];

    const filteredProjects = projectsData.filter(project => project.category === activeTab);

    // Cross-navigation from competition to specific project
    const handleViewRelatedProject = (projectTitle) => {
        const project = projectsData.find(p => p.title === projectTitle);
        if (project) {
            setSelectedCompetition(null);
            setActiveTab(project.category);
            // Brief timeout ensures React flushes the modal closure properly before unmounting/mounting issues
            setTimeout(() => setSelectedProject(project), 50);
        }
    };

    return (
        <div className="projects-page">
            {/* Competitions Section */}
            <section ref={winsRef} className="reveal" style={{ marginBottom: '6rem' }}>
                <h2 className="section-title-projects"><strong>Wins</strong></h2>
                <div className="competitions-grid">
                    {competitions.map((comp, idx) => (
                        <div
                            key={idx}
                            className="competition-card"
                            onClick={() => setSelectedCompetition(comp)}
                        >
                            <div className="comp-icon">{comp.icon}</div>
                            <h3 className="comp-title">{comp.title}</h3>
                            <div className="comp-award">{comp.award}</div>
                            <div className="comp-date">{comp.date}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section ref={projectsRef} className="reveal" style={{ marginBottom: '6rem' }}>
                <h2 className="section-title-projects"> <strong>Projects</strong></h2>

                {/* Tabs */}
                <div className="projects-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab(tab);
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Project Cards (Horizontal Scroll Grid) */}
                <div className="projects-grid">
                    {filteredProjects.map((project, idx) => (
                        <div
                            key={idx}
                            className="project-card"
                            onClick={() => setSelectedProject(project)}
                        >
                            {project.image
                                ? <img src={project.image} alt={project.title} className="project-image-placeholder" style={{ objectFit: 'cover' }} />
                                : <div className="project-image-placeholder" style={{
                                    background: `linear-gradient(135deg, hsl(${(idx * 50) % 360}, 70%, 90%), hsl(${((idx + 2) * 50) % 360}, 70%, 80%))`
                                }}></div>
                            }
                            <div className="project-content">
                                <div className="project-title">{project.title}</div>
                                <div className="project-short-desc">{project.shortDesc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* GitHub Contributions Section */}
            <section ref={githubRef} className="reveal" style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 className="section-title-projects"><strong>GitHub</strong></h2>
                <div style={{ maxWidth: '100%', overflowX: 'auto', padding: '1.5rem', backgroundColor: '#E8EAF6', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <GitHubCalendar
                        username="pang-lang"
                        blockSize={15}
                        blockMargin={5}
                        fontSize={14}
                        theme={{
                            light: ['#ffffffff', '#b3c0e8', '#7a93d8', '#426BC2', '#122C4F'],
                            dark: ['#ffffffff', '#b3c0e8', '#7a93d8', '#426BC2', '#122C4F'],
                        }}
                    />
                </div>
            </section>

            {/* Skills Section */}
            <section ref={skillsRef} className="reveal" style={{ marginBottom: '6rem' }}>
                <h2 className="section-title-projects"><strong>Skills</strong></h2>
                <div style={{ width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <LogoLoop
                        logos={skillsData.slice(0, Math.ceil(skillsData.length / 2)).map((skill) => ({
                            node: (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '1rem', color: 'var(--heading-color)'}}>
                                    {getIconForSkill(skill)}
                                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--heading-color)' }}>{skill}</span>
                                </div>
                            ),
                            title: skill
                        }))}
                        speed={100}
                        direction="left"
                        logoHeight={80}
                        gap={60}
                        hoverSpeed={0}
                        scaleOnHover
                        ariaLabel="Technical skills top"
                    />
                    <LogoLoop
                        logos={skillsData.slice(Math.ceil(skillsData.length / 2)).map((skill) => ({
                            node: (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '1rem', color: 'var(--heading-color)'}}>
                                    {getIconForSkill(skill)}
                                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--heading-color)' }}>{skill}</span>
                                </div>
                            ),
                            title: skill
                        }))}
                        speed={100}
                        direction="right"
                        logoHeight={80}
                        gap={60}
                        hoverSpeed={0}
                        scaleOnHover
                        ariaLabel="Technical skills bottom"
                    />
                </div>
            </section>

            {/* Certifications Section */}
            <section ref={certsRef} className="reveal" style={{ marginBottom: '4rem' }}>
                <h2 className="section-title-projects"><strong>Certifications</strong></h2>
                <div className="certs-grid">
                    {[
                        {
                            title: 'Introduction to Data Analytics in Google Cloud',
                            issuer: 'Google Cloud Skills Boost',
                            date: 'Dec 2025',
                            url: 'https://www.skills.google/public_profiles/207c5e71-a1db-420a-b355-0264cf1467a3/badges/20641949',
                            icon: '☁️'
                        },
                        {
                            title: 'AWS Academy Cloud Foundations',
                            issuer: 'Amazon Web Services (AWS)',
                            date: 'Mar 2025 · Expires Aug 2027',
                            url: 'https://www.credly.com/badges/89cffffa-d42d-46b7-aad4-8400cff68b29/public_url',
                            icon: '🟠'
                        },
                        {
                            title: 'Supervised Machine Learning: Regression and Classification',
                            issuer: 'DeepLearning.AI',
                            date: 'Oct 2024',
                            url: 'https://coursera.org/share/e6b14adea3227df6fd8da6e466e6369f',
                            icon: '🤖'
                        },
                    ].map((cert, i) => (
                        <a
                            key={i}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cert-card"
                        >
                            <span className="cert-icon">{cert.icon}</span>
                            <div className="cert-info">
                                <div className="cert-title">{cert.title}</div>
                                <div className="cert-issuer">{cert.issuer}</div>
                                <div className="cert-date">{cert.date}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* --- Full-Screen Project Details Modal --- */}
            {selectedProject && (
                <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header" style={{ height: '60px' }}>
                            <button
                                className="modal-close"
                                onClick={() => setSelectedProject(null)}
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="modal-tag">{selectedProject.tag}</div>
                            <h3 className="modal-title">{selectedProject.title}</h3>
                            <p className="modal-description">{selectedProject.shortDesc}</p>

                            <div className="modal-details">
                                <ul>
                                    {selectedProject.points.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="modal-footer">
                                <div className="project-tech">
                                    <strong>Tech Stack:</strong> {selectedProject.techStack}
                                </div>
                                {selectedProject.links && selectedProject.links.length > 0 && (
                                    <div className="project-links">
                                        {selectedProject.links.map((link, i) => (
                                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="project-link">
                                                {link.icon} {link.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Full-Screen Competition Details Modal --- */}
            {selectedCompetition && (
                <div className="modal-overlay" onClick={() => setSelectedCompetition(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header" style={{ height: '20px' }}>
                            <button
                                className="modal-close"
                                onClick={() => setSelectedCompetition(null)}
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="modal-tag">{selectedCompetition.date}</div>
                            <h3 className="modal-title">{selectedCompetition.title}</h3>
                            <p className="modal-description" style={{ fontWeight: 800, color: '#13265C' }}>
                                {selectedCompetition.icon} {selectedCompetition.award}
                            </p>

                            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '2rem' }}>Gallery</h4>
                            <div className="comp-gallery-masonry">
                                {selectedCompetition.photos.map((photoSrc, i) => (
                                    <img
                                        key={i}
                                        src={photoSrc}
                                        alt={`Competition Photo ${i + 1}`}
                                        className="comp-gallery-masonry-img"
                                    />
                                ))}
                            </div>

                            {selectedCompetition.relatedProjectTitle && (
                                <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        className="btn-primary"
                                        onClick={() => handleViewRelatedProject(selectedCompetition.relatedProjectTitle)}
                                    >
                                        View Project: {selectedCompetition.relatedProjectTitle} <ArrowRight size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
