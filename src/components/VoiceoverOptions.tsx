import React, { useState } from 'react';
import { Mic, Upload, Play, Pause, Volume2 } from 'lucide-react';
import { Scene, AIVoice } from '../types';
import { aiVoices } from '../utils/mediaLibrary';

interface VoiceoverOptionsProps {
  scenes: Scene[];
  onScenesUpdate: (scenes: Scene[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function VoiceoverOptions({ scenes, onScenesUpdate, onNext, onBack }: VoiceoverOptionsProps) {
  const [activeScene, setActiveScene] = useState(0);
  const [voiceMode, setVoiceMode] = useState<'ai' | 'custom'>('ai');
  const [selectedVoice, setSelectedVoice] = useState<AIVoice>(aiVoices[0]);
  const [playingPreview, setPlayingPreview] = useState<string | null>(null);

  const handleVoiceSelection = (voice: AIVoice) => {
    setSelectedVoice(voice);
    const updatedScenes = scenes.map((scene, index) =>
      index === activeScene
        ? {
            ...scene,
            voiceover: {
              id: `${voice.id}-${index}`,
              type: 'ai' as const,
              voice: voice,
              text: scene.text
            }
          }
        : scene
    );
    onScenesUpdate(updatedScenes);
  };

  const handleCustomUpload = () => {
    // Simulate file upload
    const updatedScenes = scenes.map((scene, index) =>
      index === activeScene
        ? {
            ...scene,
            voiceover: {
              id: `custom-${index}`,
              type: 'custom' as const,
              audioUrl: 'https://example.com/audio.mp3',
              text: scene.text
            }
          }
        : scene
    );
    onScenesUpdate(updatedScenes);
  };

  const playPreview = (voiceId: string) => {
    setPlayingPreview(voiceId);
    // Simulate audio playback
    setTimeout(() => setPlayingPreview(null), 3000);
  };

  const currentScene = scenes[activeScene];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4">
          <Mic className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Voiceover Configuration</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose AI-generated voices or upload your own narration for each scene.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scene Navigation */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Scenes</h3>
          <div className="space-y-3">
            {scenes.map((scene, index) => (
              <button
                key={index}
                onClick={() => setActiveScene(index)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                  activeScene === index
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Scene {index + 1}</span>
                  {scene.voiceover && (
                    <div className="flex items-center space-x-1 text-xs opacity-75">
                      <Mic className="w-3 h-3" />
                      <span>{scene.voiceover.type === 'ai' ? 'AI Voice' : 'Custom'}</span>
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

        {/* Voice Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => setVoiceMode('ai')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                voiceMode === 'ai'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              AI Voices
            </button>
            <button
              onClick={() => setVoiceMode('custom')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                voiceMode === 'custom'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Custom Audio
            </button>
          </div>

          {voiceMode === 'ai' ? (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {aiVoices.map((voice) => (
                <div
                  key={voice.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    currentScene?.voiceover?.voice?.id === voice.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleVoiceSelection(voice)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{voice.name}</h4>
                      <p className="text-sm text-gray-600">
                        {voice.gender} • {voice.accent} • {voice.language}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playPreview(voice.id);
                      }}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {playingPreview === voice.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    "{voice.preview}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload Custom Audio</h4>
                <p className="text-gray-600 mb-4">
                  Upload your own narration for Scene {activeScene + 1}
                </p>
                <button
                  onClick={handleCustomUpload}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                >
                  Choose File
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Scene Preview */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Scene Preview</h3>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Scene {activeScene + 1}</h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {currentScene?.text}
            </p>
            
            {currentScene?.voiceover && (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    Voice: {currentScene.voiceover.type === 'ai' 
                      ? currentScene.voiceover.voice?.name 
                      : 'Custom Audio'
                    }
                  </span>
                  <button className="flex items-center space-x-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-sm">Preview</span>
                  </button>
                </div>
                
                {currentScene.voiceover.type === 'ai' && currentScene.voiceover.voice && (
                  <p className="text-xs text-gray-500">
                    {currentScene.voiceover.voice.gender} • {currentScene.voiceover.voice.accent}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Audio Settings</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Speed</span>
                <select className="px-3 py-1 border border-gray-200 rounded text-sm">
                  <option>Normal</option>
                  <option>Slow</option>
                  <option>Fast</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tone</span>
                <select className="px-3 py-1 border border-gray-200 rounded text-sm">
                  <option>Natural</option>
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Energetic</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
        >
          Back to Visuals
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Style Text & Export
        </button>
      </div>
    </div>
  );
}