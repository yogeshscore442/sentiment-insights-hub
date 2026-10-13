import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BarChart3, TrendingUp, MessageSquare, Zap, Shield, Globe, AudioLines } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SearchBox from '@/components/SearchBox';
import ChartSection from '@/components/ChartSection';
import type { ProductSearchResult } from '@/services/api';
const features = [
  { icon: BarChart3, title: 'Sentiment analysis', description: 'Positive, negative, and neutral customer opinions.' },
  { icon: TrendingUp, title: 'Trend insights', description: 'A clearer view of sentiment over time.' },
  { icon: MessageSquare, title: 'Review aggregation', description: 'Product reviews from Amazon and Flipkart.' },
  { icon: Zap, title: 'NLP processing', description: 'Designed for TextBlob and VADER sentiment results.' },
  { icon: Shield, title: 'Review collection', description: 'Designed for Selenium-powered scraping.' },
  { icon: Globe, title: 'Multi-platform', description: 'Explore feedback across e-commerce platforms.' },
];
const Home = () => {
  const navigate = useNavigate();
  const handleProductSelect = (product: ProductSearchResult) => navigate('/dashboard', { state: { product } });
  return <div className="page-container">
    <div className="page-heading"><div><div className="eyebrow"><span className="tiny-square" /> CUSTOMER INTELLIGENCE</div><h1>Good decisions start with listening.</h1><p>Your space to understand what customers really think.</p></div><Button variant="outline" onClick={() => navigate('/dashboard')}>View analytics <ArrowUpRight size={16} /></Button></div>
    <section className="product-discovery"><div className="discovery-intro"><span className="section-icon"><AudioLines size={20} /></span><div><h2>What product are we exploring?</h2><p>Customer feedback, brought into focus.</p></div><Badge variant="outline" className="ml-auto hidden sm:flex demo-badge">Sample data</Badge></div><SearchBox onProductSelect={handleProductSelect} /><div className="discovery-sources"><span>AVAILABLE SOURCES</span><span className="source-name">amazon<span className="text-neutral">.</span></span><span className="source-name text-primary">Flipkart</span><span className="ml-auto hidden sm:inline">A clearer picture. Not just a star rating.</span></div></section>
    <div className="section-heading"><div><h2>A pulse on customer sentiment</h2><p>Sample analytics · Apple iPhone 15 Pro Max</p></div><Badge variant="outline" className="demo-badge"><span className="demo-dot" /> Demo preview</Badge></div>
    <ChartSection />
    <section className="capabilities-section"><div className="section-heading"><div><h2>From feedback to perspective</h2><p>One workspace. Every angle of the customer experience.</p></div><Button variant="ghost" onClick={() => navigate('/about')}>About the project <ArrowRight size={16} /></Button></div><div className="capability-grid">{features.map(({ icon: Icon, title, description }) => <div className="capability" key={title}><Icon size={19} className="text-primary" /><h3>{title}</h3><p>{description}</p></div>)}</div></section>
    <div className="page-footer"><span>SentimentAI · Customer intelligence</span><Button variant="link" onClick={() => navigate('/dashboard')}>Explore the full dashboard <ArrowRight size={14} /></Button></div>
  </div>;
};
export default Home;
