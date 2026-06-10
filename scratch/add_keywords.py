import glob
import os
import re

keywords_map = {
    "BackendDeveloper": "Node.js, Express.js, Fastify, NestJS, Python, Go, REST API, GraphQL, gRPC, WebSocket, PostgreSQL, MySQL, MongoDB, Redis, Kafka, RabbitMQ, Supabase, Microservices, System Architecture, Database Optimization, SQL Tuning, Indexing, CI/CD, Docker, Kubernetes, AWS, GCP, Nginx, Linux, JWT Authentication, OAuth, Background Jobs, Bull Queue, PM2.",
    "CloudEngineer": "AWS, Google Cloud Platform (GCP), Azure, Terraform, CloudFormation, Kubernetes, Docker, Serverless, Lambda, Cloud Run, IAM, VPC, Load Balancing, CDN, Route53, S3, Cloud Storage, Observability, CloudWatch, Stackdriver, Infrastructure as Code (IaC), High Availability, Disaster Recovery, Cloud Security, FinOps.",
    "DataAnalyst": "SQL, PostgreSQL, BigQuery, Python, Pandas, NumPy, Data Visualization, Tableau, Looker, Power BI, Metabase, Excel, Statistics, A/B Testing, Data Cleaning, EDA, Predictive Analytics, Metrics Tracking, Google Analytics, Data Storytelling.",
    "DataEngineer": "Python, SQL, Apache Airflow, dbt, Apache Spark, Kafka, BigQuery, Snowflake, Redshift, ETL/ELT Pipelines, Data Warehousing, Data Modeling, PostgreSQL, GCP, AWS, Docker, Kubernetes, CI/CD for Data, Data Quality, Distributed Computing.",
    "DataScientist": "Python, SQL, Machine Learning, Deep Learning, Scikit-Learn, TensorFlow, PyTorch, Pandas, NumPy, NLP, LLMs, Computer Vision, Predictive Modeling, Statistics, Time Series Forecasting, A/B Testing, Feature Engineering, Model Deployment, Jupyter, MLOps.",
    "DevOps": "Linux, Bash, Git, GitHub Actions, GitLab CI, Jenkins, Docker, Kubernetes, Terraform, Ansible, AWS, GCP, Prometheus, Grafana, ELK Stack, Datadog, SRE, Chaos Engineering, Zero Trust Security, DevSecOps, Nginx, CI/CD Pipelines, Infrastructure as Code.",
    "FrontendDeveloper": "React, Next.js, Vue.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, SASS/SCSS, Framer Motion, Three.js, WebGL, Responsive Design, UI/UX, State Management, Redux, Zustand, React Query, Webpack, Vite, SSR, SSG, Accessibility (a11y), Web Performance Optimization.",
    "FullstackDeveloper": "React, Next.js, TypeScript, JavaScript, Node.js, Express.js, Fastify, PostgreSQL, Supabase, REST API, GraphQL, WebSocket, Three.js, Framer Motion, Tailwind CSS, Responsive Design, SSR, SSG, RSC, Server Components, JWT Authentication, OAuth, Redis, Docker, GitHub Actions, CI/CD, Vercel, Database Optimization, SQL Query Tuning, Indexing, Database Migration, Row-Level Security (RLS), Supabase Realtime, Edge Functions, Serverless Functions, Background Jobs, Bull Queue, PM2, Nginx, Linux, Full-Stack Architecture, End-to-End Development, Code-Splitting, Lazy Loading, State Management, Component Design.",
    "MobileDeveloper": "React Native, Flutter, Dart, iOS, Android, TypeScript, JavaScript, Mobile UI/UX, State Management, Redux, Provider, Riverpod, REST API, GraphQL, Firebase, SQLite, Push Notifications, App Store Deployment, Play Store Deployment, CI/CD for Mobile (Fastlane), Performance Optimization.",
    "ProductManager": "Product Strategy, Agile, Scrum, Kanban, Jira, Trello, PRD (Product Requirements Document), User Stories, Roadmap Planning, Wireframing, Figma, A/B Testing, Metrics/KPI Tracking, User Research, Stakeholder Management, Go-to-Market Strategy, Data-Driven Decision Making, Cross-functional Leadership.",
    "SystemAdmin": "Linux (Ubuntu/CentOS), Windows Server, Bash/Shell Scripting, Active Directory, Network Administration, TCP/IP, DNS, DHCP, VPN, Firewall, Nginx, Apache, Virtualization (Proxmox, VMware), Docker, Backup & Recovery, Monitoring (Zabbix, Nagios), Security Auditing, Hardware Maintenance, IT Support."
}

titles_map = {
    "BackendDeveloper": "Backend",
    "CloudEngineer": "Cloud",
    "DataAnalyst": "Data Analyst",
    "DataEngineer": "Data Engineer",
    "DataScientist": "Data Scientist",
    "DevOps": "DevOps",
    "FrontendDeveloper": "Frontend",
    "FullstackDeveloper": "Fullstack",
    "MobileDeveloper": "Mobile",
    "ProductManager": "Product Manager",
    "SystemAdmin": "System Administrator"
}

files = glob.glob('/Users/andi/Projects/syarfandi.github.io/public/CV_*.md')
for file in files:
    filename = os.path.basename(file)
    # Extract role from filename, e.g. CV_DataAnalyst_Achmad_Syarfandi_ID.md
    match = re.match(r"CV_([^_]+)_", filename)
    if not match:
        continue
    
    role_key = match.group(1)
    if role_key not in keywords_map:
        continue
        
    is_id = "_ID.md" in filename
    
    with open(file, 'r') as f:
        content = f.read()
        
    if "Expertise Keywords" in content or "Kata Kunci Keahlian" in content:
        print(f"Skipping {filename} - already has keywords")
        continue
        
    role_title = titles_map[role_key]
    keywords = keywords_map[role_key]
    
    if is_id:
        heading = f"## Kata Kunci Keahlian {role_title}\n{keywords}\n\n"
        target_str = "## Peta Jalan Teknis Masa Depan"
    else:
        heading = f"## {role_title} Expertise Keywords\n{keywords}\n\n"
        target_str = "## Future-Ready Technical Roadmap"
        
    if target_str in content:
        content = content.replace(target_str, heading + target_str)
        with open(file, 'w') as f:
            f.write(content)
        print(f"Added keywords to {filename}")
    else:
        print(f"Target string not found in {filename}")

