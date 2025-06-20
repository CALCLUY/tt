import React, { useState } from 'react';
import { Type, Palette, Move, Download, Play } from 'lucide-react';
import { Scene, TextStyle } from '../types';

interface TextStylingProps {
  scenes: Scene[];
  onScenesUpdate: (scenes: Scene[]) => void;
  onBack: () => void;
}

export default function TextStyling({ scenes, onScenesUpdate, onBack }: TextStylingProps) {
  const [activeScene, setActiveScene] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const fontOptions = [
    'Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Poppins', 'Nunito'
  ];

  const animationOptions = [
    { id: 'none', name: 'None' },
    { id: 'fade', name: 'Fade In' },
    { id: 'slide', name: 'Slide Up' },
    { id: 'zoom', name: 'Zoom In' },
    { id: 'typewriter', name: 'Typewriter' }
  ];

  const currentScene = scenes[activeScene];

  const updateTextStyle = (updates: Partial<TextStyle>) => {
    const updatedScenes = scenes.map((scene, index) =>
      index === activeScene
        ? {
            ...scene,
            textStyle: { ...scene.textStyle, ...updates }
          }
        : scene
    );
    onScenesUpdate(updatedScenes);
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsExporting(false);
    
    // Create download link
    const blob = new Blob(['Video export complete'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-video.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
          <Type className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Text Styling & Export</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Customize text appearance and animations, then export your video in high quality.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Scene Navigation */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Scenes</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {scenes.map((scene, index) => (
              <button
                key={index}
                onClick={() => setActiveScene(index)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  activeScene === index
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">Scene {index + 1}</span>
                  <Type className="w-3 h-3 opacity-75" />
                </div>
                <p className="text-xs opacity-75 line-clamp-2">
                  {scene.text.substring(0, 50)}...
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Text Styling Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Text Style</h3>
          
          <div className="space-y-4">
            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
              <select
                value={currentScene?.textStyle.fontFamily || 'Inter'}
                onChange={(e) => updateTextStyle({ fontFamily: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                {fontOptions.map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
              <input
                type="range"
                min="24"
                max="72"
                value={currentScene?.textStyle.fontSize || 36}
                onChange={(e) => updateTextStyle({ fontSize: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-500 mt-1">
                {currentScene?.textStyle.fontSize || 36}px
              </div>
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <input
                type="color"
                value={currentScene?.textStyle.color || '#ffffff'}
                onChange={(e) => updateTextStyle({ color: e.target.value })}
                className="w-full h-10 rounded-lg border border-gray-200"
              />
            </div>

            {/* Text Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <div className="grid grid-cols-3 gap-2">
                {['top', 'center', 'bottom'].map(position => (
                  <button
                    key={position}
                    onClick={() => updateTextStyle({ position: position as any })}
                    className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                      currentScene?.textStyle.position === position
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {position.charAt(0).toUpperCase() + position.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Animation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Animation</label>
              <select
                value={currentScene?.textStyle.animation || 'fade'}
                onChange={(e) => updateTextStyle({ animation: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                {animationOptions.map(animation => (
                  <option key={animation.id} value={animation.id}>{animation.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Text Effects */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Text Effects</h3>
          
          <div className="space-y-4">
            {/* Stroke */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Stroke</label>
                <input
                  type="checkbox"
                  checked={currentScene?.textStyle.stroke.enabled || false}
                  onChange={(e) => updateTextStyle({
                    stroke: { ...currentScene.textStyle.stroke, enabled: e.target.checked }
                  })}
                  className="rounded"
                />
              </div>
              {currentScene?.textStyle.stroke.enabled && (
                <div className="space-y-2">
                  <input
                    type="color"
                    value={currentScene.textStyle.stroke.color}
                    onChange={(e) => updateTextStyle({
                      stroke: { ...currentScene.textStyle.stroke, color: e.target.value }
                    })}
                    className="w-full h-8 rounded border border-gray-200"
                  />
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={currentScene.textStyle.stroke.width}
                    onChange={(e) => updateTextStyle({
                      stroke: { ...currentScene.textStyle.stroke, width: parseInt(e.target.value) }
                    })}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Shadow */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Shadow</label>
                <input
                  type="checkbox"
                  checked={currentScene?.textStyle.shadow.enabled || false}
                  onChange={(e) => updateTextStyle({
                    shadow: { ...currentScene.textStyle.shadow, enabled: e.target.checked }
                  })}
                  className="rounded"
                />
              </div>
              {currentScene?.textStyle.shadow.enabled && (
                <div className="space-y-2">
                  <input
                    type="color"
                    value={currentScene.textStyle.shadow.color}
                    onChange={(e) => updateTextStyle({
                      shadow: { ...currentScene.textStyle.shadow, color: e.target.value }
                    })}
                    className="w-full h-8 rounded border border-gray-200"
                  />
                  <label className="text-xs text-gray-600">Blur</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={currentScene.textStyle.shadow.blur}
                    onChange={(e) => updateTextStyle({
                      shadow: { ...currentScene.textStyle.shadow, blur: parseInt(e.target.value) }
                    })}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview & Export */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Preview & Export</h3>
          
          {/* Mock Preview */}
          <div className="bg-black rounded-lg p-4 mb-6 relative h-40 flex items-center justify-center">
            {currentScene?.selectedVisual && (
              <img
                src={currentScene.selectedVisual.thumbnail}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-60"
              />
            )}
            <div className="relative z-10 text-center">
              <p
                style={{
                  fontFamily: currentScene?.textStyle.fontFamily || 'Inter',
                  fontSize: `${(currentScene?.textStyle.fontSize || 36) / 2}px`,
                  color: currentScene?.textStyle.color || '#ffffff',
                  textShadow: currentScene?.textStyle.shadow.enabled 
                    ? `${currentScene.textStyle.shadow.offsetX}px ${currentScene.textStyle.shadow.offsetY}px ${currentScene.textStyle.shadow.blur}px ${currentScene.textStyle.shadow.color}`
                    : 'none',
                  textStroke: currentScene?.textStyle.stroke.enabled 
                    ? `${currentScene.textStyle.stroke.width}px ${currentScene.textStyle.stroke.color}`
                    : 'none'
                }}
                className="max-w-full px-2"
              >
                {currentScene?.text.substring(0, 60)}...
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Preview Video</span>
            </button>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Export Settings</h4>
              <div className="space-y-2">
                <select className="w-full p-2 border border-gray-200 rounded text-sm">
                  <option>1080p HD</option>
                  <option>720p</option>
                  <option>4K Ultra HD</option>
                </select>
                <select className="w-full p-2 border border-gray-200 rounded text-sm">
                  <option>30 FPS</option>
                  <option>24 FPS</option>
                  <option>60 FPS</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className={`w-full flex items-center justify-center space-x-2 py-3 font-semibold rounded-lg transition-all duration-200 ${
                isExporting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Exporting...' : 'Export Video'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-start">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
        >
          Back to Voiceover
        </button>
      </div>
    </div>
  );
}