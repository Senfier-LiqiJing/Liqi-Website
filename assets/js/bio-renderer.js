/**
 * Bio Markdown Renderer
 * Converts markdown-style formatting in the bio text to proper HTML
 */

(function() {
  'use strict';

  function renderBioMarkdown() {
    const bioContainer = document.querySelector('.bio-text');
    if (!bioContainer) {
      console.warn('Bio container not found');
      return;
    }

    // Get the text content
    let content = bioContainer.textContent || bioContainer.innerText;

    // Split by double newlines to create paragraphs
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim());

    // Create HTML for each paragraph with bold text support
    const htmlParagraphs = paragraphs.map(para => {
      // Replace **text** with <strong>text</strong>
      const withBold = para.trim().replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
      return `<p>${withBold}</p>`;
    });

    // Replace the content
    bioContainer.innerHTML = htmlParagraphs.join('');

    // Add a class to indicate rendering is complete
    bioContainer.classList.add('bio-rendered');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBioMarkdown);
  } else {
    renderBioMarkdown();
  }
})();
