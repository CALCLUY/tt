import React, { useState, useEffect } from 'react';
import { Image, Video, Sparkles, Upload, Search } from 'lucide-react';
import { Visual, Scene } from '../types';
import { stockVisuals, findMatchingVisuals } from '../utils/mediaLibrary';
import { generateKeywords } from '../utils/sceneParser';

interface VisualEditorProps {
  scenes: Scene[];
  onScenesUpdate: (scenes: Scene[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function VisualEditor({ scenes, onScenesUpdate, onNext, onBack }: VisualEditorProps) {
  const [activeScene, setActiveScene] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableVisuals, setAvailableVisuals] = useState<Visual[]>(stockVisuals);

  useEffect(() => {
    // Auto-match visuals for each scene
    const updatedScenes = scenes.map(scene => {
      const keywords = generateKeywords(scene.text);
      const matchingVisuals = findMatchingVisuals(keywords);
      return {
        ...scene,
        visuals: matchingVisuals,
        selectedVisual: matchingVisuals[0] || stockVisuals[0]
      };
    });
    onScenesUpdate(updatedScenes);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      const filtered = stockVisuals.filter(visual =>
        visual.title.toLowerCase().includes(term.toLowerCase()) ||
        visual.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
      );
      setAvailableVisuals(filtered);
    } else {
      setAvailableVisuals(stockVisuals);
    }
  };

  const selectVisual = (visual: Visual) => {
    const updatedScenes = scenes.map((scene, index) =>
      index === activeScene ? { ...scene, selectedVisual: visual } : scene
    );
    onScenesUpdate(updatedScenes);
  };

  const currentScene = scenes[activeScene];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
          <Image className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Visual Selection</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the perfect visuals for each scene. We've automatically matched content based on your script.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scene Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Scenes</h3>
          <div className="space-y-3">
            {scenes.map((scene, index) => (
              <button
                key={index}
                onClick={() => setActiveScene(index)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                  activeScene === index
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Scene {index + 1}</span>
                  {scene.selectedVisual && (
                    <div className="flex items-center space-x-1 text-xs opacity-75">
                      {scene.selectedVisual.type === 'video' ? (
                        <Video className="w-3 h-3" />
                      ) : (
                        <Image className="w-3 h-3" />
                      )}
                      <span>Selected</span>
                    </div>
                  )}
                </div>
                <p className="text-sm opacity-75 line-clamp-2">
                  {scene.text}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Current Scene Preview */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Scene</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Scene {activeScene + 1}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {currentScene?.text}
            </p>
          </div>
          
          {currentScene?.selectedVisual && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Selected Visual</h4>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={currentScene.selectedVisual.thumbnail}
                  alt={currentScene.selectedVisual.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    currentScene.selectedVisual.type === 'video'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {currentScene.selectedVisual.type === 'video' ? 'Video' : 'Image'}
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {currentScene.selectedVisual.title}
              </p>
            </div>
          )}
        </div>

        {/* Media Library */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Media Library</h3>
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Upload</span>
            </button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search media library..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {availableVisuals.map((visual) => (
              <button
                key={visual.id}
                onClick={() => selectVisual(visual)}
                className={`relative rounded-lg overflow-hidden group transition-all duration-200 ${
                  currentScene?.selectedVisual?.id === visual.id
                    ? 'ring-2 ring-purple-500 ring-offset-2'
                    : 'hover:scale-105'
                }`}
              >
                <img
                  src={visual.thumbnail}
                  alt={visual.title}
                  className="w-full h-20 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                <div className="absolute top-1 right-1">
                  <span className={`px-1 py-0.5 text-xs font-medium rounded ${
                    visual.type === 'video'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {visual.type === 'video' ? <Video className="w-3 h-3" /> : <Image className="w-3 h-3" />}
                  </span>
                </div>
                {currentScene?.selectedVisual?.id === visual.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
        >
          Back to Script
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Configure Voiceover
        </button>
      </div>
    </div>
  );
}