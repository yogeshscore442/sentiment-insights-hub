import {
  Code2,
  Database,
  Server,
  Layout,
  BarChart3,
  Cloud,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const techStack = {
  frontend: [
    { name: 'React.js', description: 'UI Library' },
    { name: 'TypeScript', description: 'Type Safety' },
    { name: 'Tailwind CSS', description: 'Styling' },
    { name: 'Recharts', description: 'Data Visualization' },
    { name: 'React Router', description: 'Navigation' },
    { name: 'Axios', description: 'HTTP Client' },
  ],
  backend: [
    { name: 'Python Flask', description: 'API Server' },
    { name: 'Selenium', description: 'Web Scraping' },
    { name: 'BeautifulSoup', description: 'HTML Parsing' },
    { name: 'TextBlob', description: 'Sentiment Analysis' },
    { name: 'VADER', description: 'Sentiment Scoring' },
  ],
  database: [
    { name: 'MongoDB', description: 'Primary Database' },
    { name: 'PostgreSQL', description: 'Alternative DB' },
    { name: 'Redis', description: 'Caching Layer' },
  ],
  deployment: [
    { name: 'Vercel', description: 'Frontend Hosting' },
    { name: 'Docker', description: 'Containerization' },
    { name: 'Nginx', description: 'Reverse Proxy' },
  ],
};

const About = () => {
  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-4 gradient-hero border-0">Academic Project</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Product Sentiment Analyzer
          </h1>
          <p className="text-lg text-muted-foreground">
            A comprehensive review analysis platform that leverages Natural Language Processing
            to extract actionable insights from e-commerce product reviews.
          </p>
        </div>

        {/* Project Overview */}
        <Card className="mb-8 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This project is designed to help users understand customer sentiment for products
              sold on major Indian e-commerce platforms - Amazon and Flipkart. By aggregating
              and analyzing thousands of reviews, we provide:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-positive font-bold">•</span>
                <span>Real-time sentiment classification (positive, negative, neutral)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Trend analysis to track sentiment changes over time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-chart-5 font-bold">•</span>
                <span>Word frequency analysis to identify common themes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral font-bold">•</span>
                <span>Interactive dashboard with filtering and sorting capabilities</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {/* Frontend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Layout className="h-5 w-5 text-primary" />
                Frontend Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techStack.frontend.map((tech) => (
                  <Badge key={tech.name} variant="secondary" className="py-1.5">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Backend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Server className="h-5 w-5 text-positive" />
                Backend & NLP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techStack.backend.map((tech) => (
                  <Badge key={tech.name} variant="secondary" className="py-1.5">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Database */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Database className="h-5 w-5 text-neutral" />
                Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techStack.database.map((tech) => (
                  <Badge key={tech.name} variant="secondary" className="py-1.5">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deployment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Cloud className="h-5 w-5 text-chart-5" />
                Deployment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techStack.deployment.map((tech) => (
                  <Badge key={tech.name} variant="secondary" className="py-1.5">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Architecture */}
        <Card className="mb-8 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              System Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground">
{`┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React.js)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Navbar  │  │ SearchBox│  │  Charts  │  │   ReviewTable    │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Axios HTTP
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Flask API)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Scraper    │  │  Sentiment   │  │    REST Endpoints    │  │
│  │  (Selenium)  │  │  (TextBlob)  │  │    /api/reviews      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB/PostgreSQL)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Products   │  │   Reviews    │  │  Sentiment Scores    │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Contact & Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="text-sm font-medium">GitHub Repository</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <a
                href="mailto:contact@example.com"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm font-medium">Contact</span>
              </a>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-12 max-w-4xl mx-auto" />

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Product Sentiment Analyzer. Final Year Project.</p>
          <p className="mt-1">Built with React, TypeScript, and ❤️</p>
        </div>
      </div>
    </div>
  );
};

export default About;