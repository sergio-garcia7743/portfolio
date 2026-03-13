import React, { useState, useEffect } from 'react';
import { Save, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Check, Copy } from 'lucide-react';

interface WorkItem {
  filename: string;
  category: string;
  title?: string;
}

interface ManageWorkProps {
  onClose: () => void;
  currentManifest: WorkItem[];
}

export default function ManageWork({ onClose, currentManifest }: ManageWorkProps) {
  // Scan for all images in the public/images folder
  const imageModules = import.meta.glob('../../public/images/*.webp', { eager: true });
  const allImageFiles = Object.keys(imageModules).map(path => path.split('/').pop() || '');

  const [items, setItems] = useState<WorkItem[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Merge current manifest with newly detected files
    const manifestFilenames = new Set(currentManifest.map(i => i.filename));
    const newFiles = allImageFiles.filter(f => !manifestFilenames.has(f));
    
    const newItems = newFiles.map(f => ({
      filename: f,
      category: 'Engineering', // Default category
      title: f.split('.')[0] // Default title
    }));

    setItems([...currentManifest, ...newItems]);
  }, [currentManifest]);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    setItems(newItems);
  };

  const updateItem = (index: number, updates: Partial<WorkItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    if (confirm('Are you sure you want to remove this from the manifest? (The file will still exist in your folder)')) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const generateJSON = () => {
    const json = JSON.stringify(items, null, 2);
    navigator.clipboard.writeText(json);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-[100] overflow-y-auto p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sticky top-0 bg-black/95 py-4 z-10 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Work Manifest Manager</h1>
            <p className="text-white/60">Organize your portfolio images graphically.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={generateJSON}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-medium transition-all"
            >
              {copySuccess ? <Check size={20} /> : <Copy size={20} />}
              {copySuccess ? 'Copied!' : 'Copy Manifest JSON'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all"
            >
              Close
            </button>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Instructions</h2>
          <ol className="list-decimal list-inside text-white/70 space-y-2">
            <li>Upload your images to the <code className="bg-white/10 px-2 py-0.5 rounded text-emerald-400">public/images/</code> folder.</li>
            <li>Use this tool to reorder them and assign categories.</li>
            <li>Click <span className="text-emerald-400 font-bold">"Copy Manifest JSON"</span>.</li>
            <li>Open <code className="bg-white/10 px-2 py-0.5 rounded text-emerald-400">src/data/work.json</code> in your editor.</li>
            <li>Paste the JSON and save. Your site will update instantly!</li>
          </ol>
        </div>

        <div className="grid gap-4">
          {items.map((item, index) => (
            <div 
              key={item.filename}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 group hover:border-white/30 transition-all"
            >
              <div className="relative w-32 h-32 flex-shrink-0 bg-black rounded-lg overflow-hidden border border-white/10">
                <img 
                  src={`./images/${item.filename}`} 
                  alt={item.filename}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-1">Filename</label>
                  <div className="text-white font-mono text-sm truncate">{item.filename}</div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-1">Category</label>
                  <select 
                    value={item.category}
                    onChange={(e) => updateItem(index, { category: e.target.value })}
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 transition-all"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Creative">Creative</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-white/40 mb-1">Display Title (Optional)</label>
                  <input 
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => updateItem(index, { title: e.target.value })}
                    placeholder="Enter a title for this piece..."
                    className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex md:flex-col gap-2">
                <button 
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-20 transition-all"
                  title="Move Up"
                >
                  <ArrowUp size={20} />
                </button>
                <button 
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === items.length - 1}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-20 transition-all"
                  title="Move Down"
                >
                  <ArrowDown size={20} />
                </button>
                <button 
                  onClick={() => removeItem(index)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                  title="Remove from Manifest"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/20">
            <ImageIcon className="mx-auto mb-4 text-white/20" size={48} />
            <p className="text-white/40">No images detected in <code className="text-white/60">public/images/</code></p>
          </div>
        )}
      </div>
    </div>
  );
}
