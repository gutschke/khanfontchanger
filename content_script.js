const TARGET_FONT = 'Roboto';

/**
 * The callback function for our MutationObserver.
 * It's executed whenever a change (a "mutation") is detected in the DOM.
 * @param {MutationRecord[]} mutationsList - A list of mutations that occurred.
 */
const handleDomChanges = (mutationsList) => {
  for (const mutation of mutationsList) {
    // We only care about mutations where new nodes (elements) were added.
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(node => {
        try {
          if (node.nodeType === Node.ELEMENT_NODE &&
              node.tagName.toLowerCase() === 'div' &&
              node.firstChild.tagName.toLowerCase() === 'textarea' &&
              node.parentElement.farthestViewportElement.
                  nodeName.toLowerCase() === 'svg') {
            node.firstChild.style.fontFamily = TARGET_FONT;
          }
        } catch {
        }
      });
    }
  }
};

// --- INITIAL RUN ---
// The observer only catches *new* elements. We need to run the function once
// at the start to catch any elements that are already on the page when the
// script loads.
document.querySelectorAll('textarea').forEach(node => {
  try {
    if (node.parentElement.parentElement.farthestViewportElement. \
            nodeName.toLowerCase() === 'svg') {
      node.style.fontFamily = TARGET_FONT;
    }
  } catch {
  }
});

// --- OBSERVER SETUP ---
// 1. Create the observer instance with our callback function.
const observer = new MutationObserver(handleDomChanges);

// 2. Configure the observer: we want to watch for added child elements in the
//    entire document.
const config = {
  childList: true, // Watch for the addition/removal of child nodes.
  subtree: true    // Watch the target node and all its descendants.
};

// 3. Start observing the entire document body for changes.
observer.observe(document.body, config);
