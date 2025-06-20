import React, { useState } from 'react';
import { FileText, Wand2, Edit3 } from 'lucide-react';
import { parseScriptIntoScenes } from '../utils/sceneParser';

interface ScriptInputProps {
  onNext: (script: string, scenes: string[]) => void;
}

export default function ScriptInput({ onNext }: ScriptInputProps) {
  const [script, setScript] = useState('');
  const [scenes, setScenes] = useState<string[]>([]);
  const [autoMode, setAutoMode] = useState(true);

  const handleScriptChange = (value: string) => {
    setScript(value);
    if (autoMode && value.trim()) {
      const parsedScenes = parseScriptIntoScenes(value);
      setScenes(parsedScenes);
    }
  };

  const handleSceneEdit = (index: number, value: string) => {
    const newScenes = [...scenes];
    newScenes[index] = value;
    setScenes(newScenes);
  };

  const addScene = () => {
    setScenes([...scenes, '']);
  };

  const removeScene = (index: number) => {
    setScenes(scenes.filter((_, i) => i !== index));
  };

  const canProceed = script.trim() && scenes.length > 0 && scenes.every(scene => scene.trim());

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Script Input</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Start by entering your script. We'll automatically divide it into scenes, or you can customize them manually.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Your Script
          </label>
          <textarea
            value={script}
            onChange={(e) => handleScriptChange(e.target.value)}
            placeholder="Paste or type your script here. We'll automatically break it into scenes for better video flow..."
            className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 resize-none text-gray-800 placeholder-gray-400"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-500">
              {script.length} characters
            </span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setAutoMode(!autoMode)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  autoMode 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Wand2 className="w-4 h-4" />
                <span className="text-sm font-medium">Auto-divide scenes</span>
              </button>
            </div>
          </div>
        </div>

        {scenes.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Scenes ({scenes.length})
              </h3>
              <button
                onClick={addScene}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">Add Scene</span>
              </button>
            </div>

            <div className="space-y-4">
              {scenes.map((scene, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Scene {index + 1}
                    </span>
                    {scenes.length > 1 && (
                      <button
                        onClick={() => removeScene(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <textarea
                    value={scene}
                    onChange={(e) => handleSceneEdit(index, e.target.value)}
                    placeholder="Enter scene content..."
                    className="w-full h-20 p-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all resize-none text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <button
            onClick={() => onNext(script, scenes)}
            disabled={!canProceed}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
              canProceed
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue to Visuals
          </button>
        </div>
      </div>
    </div>
  );
}