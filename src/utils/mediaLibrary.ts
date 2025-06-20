import { Visual, AIVoice } from '../types';

export const stockVisuals: Visual[] = [
  {
    id: '1',
    type: 'video',
    url: 'https://images.pexels.com/videos/3843433/pexels-photo-3843433.jpeg',
    thumbnail: 'https://images.pexels.com/videos/3843433/pexels-photo-3843433.jpeg?auto=compress&cs=tinysrgb&w=300',
    title: 'Business Meeting',
    tags: ['business', 'meeting', 'professional', 'office'],
    duration: 15
  },
  {
    id: '2',
    type: 'video',
    url: 'https://images.pexels.com/videos/6774934/pexels-photo-6774934.jpeg',
    thumbnail: 'https://images.pexels.com/videos/6774934/pexels-photo-6774934.jpeg?auto=compress&cs=tinysrgb&w=300',
    title: 'Technology Innovation',
    tags: ['technology', 'innovation', 'digital', 'modern'],
    duration: 20
  },
  {
    id: '3',
    type: 'image',
    url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
    title: 'Creative Workspace',
    tags: ['creative', 'workspace', 'design', 'inspiration']
  },
  {
    id: '4',
    type: 'video',
    url: 'https://images.pexels.com/videos/5726708/pexels-photo-5726708.jpeg',
    thumbnail: 'https://images.pexels.com/videos/5726708/pexels-photo-5726708.jpeg?auto=compress&cs=tinysrgb&w=300',
    title: 'City Lifestyle',
    tags: ['city', 'urban', 'lifestyle', 'modern'],
    duration: 12
  },
  {
    id: '5',
    type: 'image',
    url: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg',
    thumbnail: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=300',
    title: 'Team Collaboration',
    tags: ['team', 'collaboration', 'work', 'together']
  },
  {
    id: '6',
    type: 'video',
    url: 'https://images.pexels.com/videos/3130284/pexels-photo-3130284.jpeg',
    thumbnail: 'https://images.pexels.com/videos/3130284/pexels-photo-3130284.jpeg?auto=compress&cs=tinysrgb&w=300',
    title: 'Nature Landscape',
    tags: ['nature', 'landscape', 'peaceful', 'outdoor'],
    duration: 18
  }
];

export const aiVoices: AIVoice[] = [
  {
    id: 'sarah-us',
    name: 'Sarah',
    gender: 'female',
    accent: 'American',
    language: 'English',
    preview: 'Hello, I\'m Sarah. I can narrate your videos with a clear American accent.'
  },
  {
    id: 'james-uk',
    name: 'James',
    gender: 'male',
    accent: 'British',
    language: 'English',
    preview: 'Good day, I\'m James. I offer a sophisticated British narration style.'
  },
  {
    id: 'maria-es',
    name: 'María',
    gender: 'female',
    accent: 'Spanish',
    language: 'Spanish',
    preview: 'Hola, soy María. Puedo narrar tus videos en español con acento neutro.'
  },
  {
    id: 'david-au',
    name: 'David',
    gender: 'male',
    accent: 'Australian',
    language: 'English',
    preview: 'G\'day, I\'m David. I can provide a friendly Australian voice for your content.'
  },
  {
    id: 'sophie-fr',
    name: 'Sophie',
    gender: 'female',
    accent: 'French',
    language: 'French',
    preview: 'Bonjour, je suis Sophie. Je peux narrer vos vidéos en français.'
  }
];

export function findMatchingVisuals(keywords: string[]): Visual[] {
  return stockVisuals.filter(visual =>
    keywords.some(keyword =>
      visual.tags.some(tag =>
        tag.toLowerCase().includes(keyword.toLowerCase())
      )
    )
  ).slice(0, 6);
}