import {
  LayoutGrid, Palette, Globe, Wrench, MousePointer, Music, Database, Gamepad2, Monitor,
  Type, ScanFace, Maximize2, Atom, FileText, Lock, Settings, Download, HardDrive,
  Binary, Cpu, Infinity, Volume2, Frame, Code, Layers, Clipboard, PenTool,
  Box, Image, Eye, Keyboard, Copy, Sparkles, List, Smartphone, Move, Maximize,
  MonitorDot, AlertTriangle, Compass, Battery, Vibrate, Paintbrush, Pipette,
  ToggleLeft, Bell, Timer, Scan, FileCode, Variable, Cloud, CloudCog, Network,
  Calculator, Search, Plug, Hash, Menu, Ghost, Clock, Terminal, Link, FolderOpen,
  Sun, Braces, FileCode2, ArrowLeftRight, Camera, Wand2, Blend, FileArchive,
  ImagePlus, FileDown, FolderTree, ExternalLink, Ruler, GitCompare, Briefcase,
  BarChart3, Table, BookOpen, Globe2, Radio, Book, Webhook, Nfc, Trophy,
  Flame, Mic, Utensils, Blend as BlendIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  LayoutGrid, Palette, Globe, Wrench, MousePointer, Music, Database, Gamepad2, Monitor,
  Type, ScanFace, Maximize2, Atom, FileText, Lock, Settings, Download, HardDrive,
  Binary, Cpu, Infinity, Volume2, Frame, Code, Layers, Clipboard, PenTool,
  Box, Image, Eye, Keyboard, Copy, Sparkles, List, Smartphone, Move, Maximize,
  MonitorDot, AlertTriangle, Compass, Battery, Vibrate, Paintbrush, Pipette,
  ToggleLeft, Bell, Timer, Scan, FileCode, Variable, Cloud, CloudCog, Network,
  Calculator, Search, Plug, Hash, Menu, Ghost, Clock, Terminal, Link, FolderOpen,
  Sun, Braces, FileCode2, ArrowLeftRight, Camera, Wand2, Blend, FileArchive,
  ImagePlus, FileDown, FolderTree, ExternalLink, Ruler, GitCompare, Briefcase,
  BarChart3, Table, BookOpen, Globe2, Radio, Book, Webhook, Nfc, Trophy,
  Flame, Mic, Utensils,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Box;
}
