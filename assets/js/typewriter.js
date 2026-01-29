/**
 * Lightweight Typewriter Effect
 * Adds a typing animation to specified text elements
 */

class Typewriter {
  constructor(element, options = {}) {
    this.element = element;
    this.text = options.text || element.textContent;
    this.speed = options.speed || 50; // milliseconds per character
    this.delay = options.delay || 0; // delay before starting
    this.cursor = options.cursor !== false; // show cursor by default
    this.cursorChar = options.cursorChar || '|';
    this.loop = options.loop || false;
    this.loopDelay = options.loopDelay || 2000;
    this.onComplete = options.onComplete || null;

    this.currentIndex = 0;
    this.isDeleting = false;

    // Store original text and clear element
    this.element.textContent = '';

    // Add cursor if enabled
    if (this.cursor) {
      this.cursorElement = document.createElement('span');
      this.cursorElement.className = 'typewriter-cursor';
      this.cursorElement.textContent = this.cursorChar;
      this.element.appendChild(this.cursorElement);
    }

    // Start typing after delay
    setTimeout(() => this.type(), this.delay);
  }

  type() {
    if (!this.isDeleting && this.currentIndex < this.text.length) {
      // Typing forward
      const currentText = this.text.substring(0, this.currentIndex + 1);

      if (this.cursor) {
        this.element.childNodes[0]?.remove(); // Remove old text node if exists
        this.element.insertBefore(
          document.createTextNode(currentText),
          this.cursorElement
        );
      } else {
        this.element.textContent = currentText;
      }

      this.currentIndex++;
      setTimeout(() => this.type(), this.speed);
    } else if (this.isDeleting && this.currentIndex > 0) {
      // Deleting backward
      const currentText = this.text.substring(0, this.currentIndex - 1);

      if (this.cursor) {
        this.element.childNodes[0]?.remove();
        this.element.insertBefore(
          document.createTextNode(currentText),
          this.cursorElement
        );
      } else {
        this.element.textContent = currentText;
      }

      this.currentIndex--;
      setTimeout(() => this.type(), this.speed / 2); // Delete faster
    } else if (!this.isDeleting && this.currentIndex === this.text.length) {
      // Finished typing
      if (this.onComplete) {
        this.onComplete();
      }

      if (this.loop) {
        this.isDeleting = true;
        setTimeout(() => this.type(), this.loopDelay);
      }
    } else if (this.isDeleting && this.currentIndex === 0) {
      // Finished deleting
      this.isDeleting = false;
      setTimeout(() => this.type(), 500);
    }
  }
}

/**
 * Multi-string Typewriter Effect
 * Cycles through multiple strings with typing animation
 */
class MultiTypewriter {
  constructor(element, options = {}) {
    this.element = element;
    this.strings = options.strings || [element.textContent];
    this.speed = options.speed || 50;
    this.deleteSpeed = options.deleteSpeed || 25;
    this.delay = options.delay || 0;
    this.pauseDelay = options.pauseDelay || 2000; // pause after typing each string
    this.cursor = options.cursor !== false;
    this.cursorChar = options.cursorChar || '|';
    this.loop = options.loop !== false; // loop by default

    this.currentStringIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;

    // Clear element
    this.element.textContent = '';

    // Add cursor
    if (this.cursor) {
      this.cursorElement = document.createElement('span');
      this.cursorElement.className = 'typewriter-cursor';
      this.cursorElement.textContent = this.cursorChar;
      this.element.appendChild(this.cursorElement);
    }

    // Start typing after delay
    setTimeout(() => this.type(), this.delay);
  }

  type() {
    const currentString = this.strings[this.currentStringIndex];

    if (!this.isDeleting && this.currentCharIndex < currentString.length) {
      // Typing forward
      const currentText = currentString.substring(0, this.currentCharIndex + 1);

      if (this.cursor) {
        this.element.childNodes[0]?.remove();
        this.element.insertBefore(
          document.createTextNode(currentText),
          this.cursorElement
        );
      } else {
        this.element.textContent = currentText;
      }

      this.currentCharIndex++;
      setTimeout(() => this.type(), this.speed);
    } else if (this.isDeleting && this.currentCharIndex > 0) {
      // Deleting backward
      const currentText = currentString.substring(0, this.currentCharIndex - 1);

      if (this.cursor) {
        this.element.childNodes[0]?.remove();
        this.element.insertBefore(
          document.createTextNode(currentText),
          this.cursorElement
        );
      } else {
        this.element.textContent = currentText;
      }

      this.currentCharIndex--;
      setTimeout(() => this.type(), this.deleteSpeed);
    } else if (!this.isDeleting && this.currentCharIndex === currentString.length) {
      // Finished typing current string
      if (this.loop || this.currentStringIndex < this.strings.length - 1) {
        this.isDeleting = true;
        setTimeout(() => this.type(), this.pauseDelay);
      }
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      // Finished deleting, move to next string
      this.isDeleting = false;
      this.currentStringIndex = (this.currentStringIndex + 1) % this.strings.length;
      setTimeout(() => this.type(), 500);
    }
  }
}

// Auto-initialize typewriter elements on page load
document.addEventListener('DOMContentLoaded', () => {
  // Single string typewriter
  document.querySelectorAll('[data-typewriter]').forEach(element => {
    const options = {
      text: element.getAttribute('data-typewriter-text') || element.textContent,
      speed: parseInt(element.getAttribute('data-typewriter-speed')) || 50,
      delay: parseInt(element.getAttribute('data-typewriter-delay')) || 0,
      cursor: element.getAttribute('data-typewriter-cursor') !== 'false',
      cursorChar: element.getAttribute('data-typewriter-cursor-char') || '|',
      loop: element.getAttribute('data-typewriter-loop') === 'true',
      loopDelay: parseInt(element.getAttribute('data-typewriter-loop-delay')) || 2000,
    };

    new Typewriter(element, options);
  });

  // Multi-string typewriter
  document.querySelectorAll('[data-multi-typewriter]').forEach(element => {
    const stringsAttr = element.getAttribute('data-multi-typewriter');
    const strings = stringsAttr ? stringsAttr.split('|') : [element.textContent];

    const options = {
      strings: strings,
      speed: parseInt(element.getAttribute('data-typewriter-speed')) || 50,
      deleteSpeed: parseInt(element.getAttribute('data-typewriter-delete-speed')) || 25,
      delay: parseInt(element.getAttribute('data-typewriter-delay')) || 0,
      pauseDelay: parseInt(element.getAttribute('data-typewriter-pause-delay')) || 2000,
      cursor: element.getAttribute('data-typewriter-cursor') !== 'false',
      cursorChar: element.getAttribute('data-typewriter-cursor-char') || '|',
      loop: element.getAttribute('data-typewriter-loop') !== 'false',
    };

    new MultiTypewriter(element, options);
  });
});

// Export for manual initialization if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Typewriter, MultiTypewriter };
}
