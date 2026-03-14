import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Image as ImageIcon, 
  Check, 
  Copy, 
  GripVertical,
  X
} from 'lucide-react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface WorkItem {
  filename: string;
  category: string;
  title?: string;
}

interface ManageWorkProps {
  onClose: () => void;
  currentManifest: WorkItem[];
}

interface SortableItemProps {
  key?: string;
  id: string;
  item: WorkItem;
  onUpdate: (updates: Partial<WorkItem>) => void;
  onRemove: () => void;
}

function SortableItem({ id, item, onUpdate, onRemove }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className="relative group bg-[#2b2b2c] overflow-hidden flex flex-col"
    >
      {/* Drag Handle Overlay */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-2 left-2 z-20 p-1.5 bg-black/60 rounded-lg text-white/40 hover:text-white cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical size={16} />
      </div>

      {/* Delete Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-2 right-2 z-20 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 size={16} />
      </button>

      {/* Image Container - Matches Visitor Style */}
      <div className="aspect-[3/4] overflow-hidden bg-[#2b2b2c] relative">
        <img 
          src={`./images/${item.filename}`} 
          alt={item.filename}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Title Overlay - Matches Visitor Style */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
          {item.title && (
            <div className="w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-[10px] text-white font-medium truncate uppercase tracking-wider">{item.title}</p>
            </div>
          )}
        </div>
      </div>

      {/* Details Area - Minimal for Manager */}
      <div className="p-2 space-y-2 bg-[#1e1e1f] border-t border-[#383838]">
        <select 
          value={item.category}
          onChange={(e) => onUpdate({ category: e.target.value })}
          className="w-full bg-black/40 border border-white/5 rounded px-2 py-1 text-[10px] text-white/70 focus:outline-none focus:border-[#a3e635]/50 transition-all"
        >
          <option value="Engineering">Engineering</option>
          <option value="Creative">Creative</option>
          <option value="Management">Management</option>
        </select>
        <input 
          type="text"
          value={item.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Title..."
          className="w-full bg-black/40 border border-white/5 rounded px-2 py-1 text-[10px] text-white/70 focus:outline-none focus:border-[#a3e635]/50 transition-all"
        />
      </div>
    </div>
  );
}

export default function ManageWork({ onClose, currentManifest }: ManageWorkProps) {
  // Scan for all images in the public/images folder
  const imageModules = import.meta.glob('../../public/images/*.webp', { eager: true });
  const allImageFiles = Object.keys(imageModules).map(path => path.split('/').pop() || '');

  const [items, setItems] = useState<WorkItem[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    // Filter out items from manifest that no longer exist on disk
    const existingManifestItems = currentManifest.filter(item => allImageFiles.includes(item.filename));
    const existingFilenames = new Set(existingManifestItems.map(i => i.filename));
    
    // Find files on disk that are NOT in the manifest
    const newFiles = allImageFiles.filter(f => !existingFilenames.has(f));
    
    const newItems = newFiles.map(f => ({
      filename: f,
      category: 'Engineering', // Default category
      title: f.split('.')[0] // Default title
    }));

    setItems([...existingManifestItems, ...newItems]);
  }, [currentManifest, allImageFiles.join(',')]); // Use joined string for stable dependency check

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.filename === active.id);
        const newIndex = items.findIndex((i) => i.filename === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateItem = (index: number, updates: Partial<WorkItem>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    if (confirm('Remove from manifest?')) {
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
    <div className="fixed inset-0 bg-black/98 z-[100] overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 md:p-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 sticky top-0 bg-black/98 py-6 z-20 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
              <ImageIcon size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Portfolio Grid Manager</h1>
              <p className="text-white/40 text-sm">Drag to reorder. Click to edit details.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={generateJSON}
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-all active:scale-95"
            >
              {copySuccess ? <Check size={18} /> : <Copy size={18} />}
              {copySuccess ? 'Copied!' : 'Copy JSON'}
            </button>
            <button
              onClick={onClose}
              className="p-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Grid Area */}
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={items.map(i => i.filename)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1 md:gap-2">
              {items.map((item, index) => (
                <SortableItem 
                  key={item.filename}
                  id={item.filename}
                  item={item}
                  onUpdate={(updates) => updateItem(index, updates)}
                  onRemove={() => removeItem(index)}
                />
              ))}
              
              {/* Empty State */}
              {items.length === 0 && (
                <div className="col-span-full py-32 text-center border-2 border-dashed border-white/5 rounded-3xl">
                  <ImageIcon className="mx-auto mb-4 text-white/10" size={48} />
                  <p className="text-white/30">No images found in <code className="text-white/50">public/images/</code></p>
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>

        {/* Footer Instructions */}
        <div className="mt-20 p-8 bg-white/5 rounded-3xl border border-white/10 text-center max-w-2xl mx-auto">
          <h2 className="text-white font-bold mb-4">How to save your changes</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            1. Reorder your grid by dragging the handles.<br/>
            2. Assign categories and titles to each item.<br/>
            3. Click <span className="text-emerald-400 font-bold">"Copy JSON"</span> above.<br/>
            4. Paste the content into <code className="bg-black px-2 py-1 rounded text-emerald-400">src/data/work.json</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
