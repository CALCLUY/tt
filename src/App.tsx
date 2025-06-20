import React, { useState } from 'react';
import { Video, Sparkles, Zap } from 'lucide-react';
import ScriptInput from './components/ScriptInput';
import VisualEditor from './components/VisualEditor';
import VoiceoverOptions from './components/VoiceoverOptions';
import TextStyling from './components/TextStyling';
import { Scene, TextStyle } from './types';

type Step = 'landing' | 'script' | 'visuals' | 'voiceover' | 'styling';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const [script, setScript] = useState('');
  const [scenes, setScenes] = useState<Scene[]>([]);

  const handleScriptNext = (scriptText: string, sceneTexts: string[]) => {
    setScript(scriptText);
    const newScenes: Scene[] = sceneTexts.map((text, index) => ({
      id: `scene-${index}`,
      text,
      duration: 5,
      visuals: [],
      textStyle: {
        fontFamily: 'Inter',
        fontSize: 36,
        color: '#ffffff',
        stroke: {
          enabled: false,
          color: '#000000',
          width: 2
        },
        shadow: {
          enabled: true,
          color: '#000000',
          blur: 4,
          offsetX: 2,
          offsetY: 2
        },
        animation: 'fade',
        position: 'center'
      }
    }));
    setScenes(newScenes);
    setCurrentStep('visuals');
  };

  const steps = [
    { id: 'script', title: 'Script', completed: script !== '' },
    { id: 'visuals', title: 'Visuals', completed: scenes.every(s => s.selectedVisual) },
    { id: 'voiceover', title: 'Voiceover', completed: scenes.every(s => s.voiceover) },
    { id: 'styling', title: 'Style & Export', completed: false }
  ];

  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-8 shadow-xl">
              <Video className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Script to Video Creator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Transform your written scripts into engaging videos with AI-powered visuals, professional voiceovers, 
              and stunning text animations. Create production-ready content in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Scene Division</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically break your script into optimized scenes or manually control the flow. 
                Our AI identifies natural breakpoints for better video pacing.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
                <Video className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Rich Media Library</h3>
              <p className="text-gray-600 leading-relaxed">
                Access thousands of high-quality stock videos, images, and animations. 
                Smart matching pairs visuals with your content automatically.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Voiceover</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from realistic AI voices in multiple languages and accents, 
                or upload your own narration with perfect audio sync.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentStep('script')}
              className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg rounded-2xl hover:from-purple-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <Video className="w-6 h-6 mr-3" />
              Start Creating Video
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Script to Video</h1>
            </div>
            
            {/* Progress Steps */}
            <div className="hidden md:flex items-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${
                    step.completed ? 'text-green-600' : 
                    currentStep === step.id ? 'text-purple-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      step.completed ? 'bg-green-100 border-green-600' :
                      currentStep === step.id ? 'bg-purple-100 border-purple-600' : 'border-gray-300'
                    }`}>
                      {step.completed ? '✓' : index + 1}
                    </div>
                    <span className="font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-px mx-4 ${
                      step.completed ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'script' && (
          <ScriptInput onNext={handleScriptNext} />
        )}
        
        {currentStep === 'visuals' && (
          <VisualEditor
            scenes={scenes}
            onScenesUpdate={setScenes}
            onNext={() => setCurrentStep('voiceover')}
            onBack={() => setCurrentStep('script')}
          />
        )}
        
        {currentStep === 'voiceover' && (
          <VoiceoverOptions
            scenes={scenes}
            onScenesUpdate={setScenes}
            onNext={() => setCurrentStep('styling')}
            onBack={() => setCurrentStep('visuals')}
          />
        )}
        
        {currentStep === 'styling' && (
          <TextStyling
            scenes={scenes}
            onScenesUpdate={setScenes}
            onBack={() => setCurrentStep('voiceover')}
          />
        )}
      </main>
    </div>
  );
}

export default App;