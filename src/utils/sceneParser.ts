export function parseScriptIntoScenes(script: string): string[] {
  // Split by common scene delimiters
  const scenes = script
    .split(/\n\s*\n|\.\s*\n|;\s*\n/)
    .map(scene => scene.trim())
    .filter(scene => scene.length > 0);
  
  // If no natural breaks found, split by sentences
  if (scenes.length === 1 && script.length > 200) {
    return script
      .split(/[.!?]+\s+/)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0)
      .map(sentence => sentence.endsWith('.') || sentence.endsWith('!') || sentence.endsWith('?') ? sentence : sentence + '.');
  }
  
  return scenes;
}

export function generateKeywords(text: string): string[] {
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from',
    'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'shall'
  ]);
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word))
    .slice(0, 5);
}