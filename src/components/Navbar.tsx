import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, ArrowUpRight, BarChart3, Bell, ChevronDown, CircleHelp, Command, Home, Layers3, Menu, PanelLeftClose, PanelLeftOpen, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Overview', icon: Home },
  { href: '/dashboard', label: 'Review analytics', icon: BarChart3 },
  { href: '/about', label: 'About the project', icon: Layers3 },
];
interface NavbarProps { collapsed: boolean; onCollapse: () => void; }
const Navbar = ({ collapsed, onCollapse }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const openSearch = () => {
    if (location.pathname === '/about') navigate('/');
    window.setTimeout(() => document.querySelector<HTMLInputElement>('[data-product-search]')?.focus(), 100);
  };
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [location.pathname]);
  useEffect(() => { setIsOpen(false); }, [location.pathname]);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    {isOpen && <div className="sidebar-backdrop" onClick={() => setIsOpen(false)} />}
    <aside className={cn('workspace-sidebar', isOpen && 'mobile-open')} aria-label="Main navigation">
      <Link to="/" className="brand-lockup" aria-label="SentimentAI home"><span className="brand-mark"><Activity size={21} strokeWidth={2.5} /></span><span className="sidebar-label brand-name">sentiment<span className="text-primary">ai</span><span className="brand-caption">CUSTOMER INTELLIGENCE</span></span></Link>
      <Button variant="ghost" size="icon" className="mobile-close" aria-label="Close navigation" onClick={() => setIsOpen(false)}><X /></Button>
      <div className="workspace-switch"><span className="workspace-avatar">S</span><div className="sidebar-label"><p className="text-sm font-semibold">Demo workspace</p><p className="text-xs text-muted-foreground">Product research</p></div><ChevronDown className="sidebar-label ml-auto h-4 w-4 text-muted-foreground" /></div>
      <div className="sidebar-section sidebar-label">WORKSPACE</div>
      <nav className="space-y-1 px-3">{navLinks.map(({ href, label, icon: Icon }) => <Button asChild key={href} variant="ghost" className={cn('sidebar-link', location.pathname === href && 'sidebar-link-active')}><Link to={href} aria-current={location.pathname === href ? 'page' : undefined} title={collapsed ? label : undefined}><Icon size={18} /><span className="sidebar-label">{label}</span>{location.pathname === href && <span className="nav-active-dot sidebar-label" />}</Link></Button>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-note sidebar-label"><span className="text-primary"><Activity size={18} /></span><p className="font-semibold text-sm mt-3">Every review has a story.</p><p className="text-xs text-muted-foreground mt-2 leading-relaxed">Bring customer opinions into focus, one product at a time.</p><Button asChild variant="link" className="p-0 h-8 text-xs mt-2"><Link to="/dashboard">Explore analytics <ArrowUpRight size={14} /></Link></Button></div><Button asChild variant="ghost" className="sidebar-link"><Link to="/about" title="Help & project information"><CircleHelp size={18} /><span className="sidebar-label">Help & resources</span></Link></Button><Button variant="ghost" className="sidebar-link collapse-control" onClick={onCollapse} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}<span className="sidebar-label">Collapse sidebar</span></Button><div className="sidebar-footer sidebar-label"><span className="demo-dot" /> Demo environment <span className="ml-auto">v1.0</span></div></div>
    </aside>
    <header className="workspace-topbar"><div className="flex items-center gap-3 min-w-0"><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}><Menu /></Button><span className="text-muted-foreground text-xs hidden sm:inline">Workspace</span><span className="text-border hidden sm:inline">/</span><span className="text-sm font-medium truncate">{navLinks.find(link => link.href === location.pathname)?.label || 'Workspace'}</span></div><div className="flex items-center gap-2"><Button variant="ghost" className="topbar-search" onClick={openSearch} aria-label="Search products"><Search size={16} /><span className="hidden md:inline">Search products...</span><kbd className="hidden md:flex"><Command size={10} /> K</kbd></Button><span className="topbar-divider" /><Popover><PopoverTrigger asChild><Button variant="ghost" size="icon" aria-label="Notifications"><Bell size={18} /></Button></PopoverTrigger><PopoverContent align="end" className="w-72"><p className="font-semibold text-sm">Notifications</p><p className="text-sm text-muted-foreground mt-2">No notifications in this demo workspace.</p></PopoverContent></Popover><Button asChild variant="ghost" size="icon" aria-label="Help"><Link to="/about"><CircleHelp size={18} /></Link></Button><Popover><PopoverTrigger asChild><Button variant="ghost" size="icon" className="profile-avatar" aria-label="Workspace details">S</Button></PopoverTrigger><PopoverContent align="end"><p className="font-semibold">Demo workspace</p><p className="text-sm text-muted-foreground mt-2">Sample product reviews. No account is connected.</p></PopoverContent></Popover></div></header>
  </>;
};
export default Navbar;
