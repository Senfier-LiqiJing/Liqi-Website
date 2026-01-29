/**
 * Bio Markdown Renderer - Standalone version
 * This file is loaded from the static directory
 */
(function() {
  'use strict';

  function renderBioMarkdown() {
    const bioContainer = document.querySelector('.bio-text');
    if (!bioContainer) {
      console.log('Bio container not found');
      return;
    }

    console.log('Found bio container, rendering markdown...');

    // Get the HTML content (preserves newlines better than textContent)
    let content = bioContainer.innerHTML;

    // First, replace **text** with <strong>text</strong>
    content = content.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');

    // Split by newlines (single or double) to create paragraphs
    // This handles both \n and actual line breaks in HTML
    const lines = content.split(/\n+/).map(line => line.trim()).filter(line => line.length > 0);

    // Group consecutive lines that don't have a blank line between them
    const paragraphs = [];
    let currentPara = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if this is a new paragraph (you can adjust this logic)
      // For now, we'll treat each significant line as a new paragraph
      if (line.length > 0) {
        if (currentPara.length > 0) {
          paragraphs.push(currentPara);
        }
        currentPara = line;
      }
    }

    // Add the last paragraph
    if (currentPara.length > 0) {
      paragraphs.push(currentPara);
    }

    // Create HTML for paragraphs
    const htmlParagraphs = paragraphs.map(para => {
      return `<p style="margin-bottom: 1.5rem; line-height: 1.75;">${para}</p>`;
    });

    // Replace the content
    bioContainer.innerHTML = htmlParagraphs.join('');

    // Add a class to indicate rendering is complete
    bioContainer.classList.add('bio-rendered');

    console.log(`✓ Bio markdown rendered with ${paragraphs.length} paragraphs`);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBioMarkdown);
  } else {
    renderBioMarkdown();
  }
})();
