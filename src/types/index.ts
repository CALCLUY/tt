export interface Scene {
  id: string;
  text: string;
  duration: number;
  visuals: Visual[];
  selectedVisual?: Visual;
  voiceover?: Voiceover;
  textStyle: TextStyle;
}

export interface Visual {
  id: string;
  type: 'video' | 'image' | 'animation';
  url: string;
  thumbnail: string;
  title: string;
  tags: string[];
  duration?: number;
}

export interface Voiceover {
  id: string;
  type: 'ai' | 'custom';
  voice?: AIVoice;
  audioUrl?: string;
  text: string;
}

export interface AIVoice {
  id: string;
  name: string;
  gender: 'male' | 'female';
  accent: string;
  language: string;
  preview: string;
}

export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  color: string;
  stroke: {
    enabled: boolean;
    color: string;
    width: number;
  };
  shadow: {
    enabled: boolean;
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  };
  animation: string;
  position: 'top' | 'center' | 'bottom';
}

export interface Project {
  id: string;
  name: string;
  script: string;
  scenes: Scene[];
  settings: {
    resolution: '1080p' | '720p' | '4K';
    framerate: number;
    backgroundMusic?: {
      url: string;
      volume: number;
    };
    subtitles: boolean;
  };
}