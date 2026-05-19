/**
 * Canonical WCAG 2.2 Success Criteria
 * Source: https://www.w3.org/TR/WCAG22/
 * 
 * Used by tests to validate that references and agent outputs
 * only cite real WCAG criteria — never hallucinated ones.
 */

const WCAG_22_CRITERIA = new Set([
  // 1. Perceivable
  '1.1.1',   // Non-text Content
  '1.2.1',   // Audio-only and Video-only (Prerecorded)
  '1.2.2',   // Captions (Prerecorded)
  '1.2.3',   // Audio Description or Media Alternative (Prerecorded)
  '1.2.4',   // Captions (Live)
  '1.2.5',   // Audio Description (Prerecorded)
  '1.2.6',   // Sign Language (Prerecorded)
  '1.2.7',   // Extended Audio Description (Prerecorded)
  '1.2.8',   // Media Alternative (Prerecorded)
  '1.2.9',   // Audio-only (Live)
  '1.3.1',   // Info and Relationships
  '1.3.2',   // Meaningful Sequence
  '1.3.3',   // Sensory Characteristics
  '1.3.4',   // Orientation
  '1.3.5',   // Identify Input Purpose
  '1.3.6',   // Identify Purpose
  '1.4.1',   // Use of Color
  '1.4.2',   // Audio Control
  '1.4.3',   // Contrast (Minimum)
  '1.4.4',   // Resize Text
  '1.4.5',   // Images of Text
  '1.4.6',   // Contrast (Enhanced)
  '1.4.7',   // Low or No Background Audio
  '1.4.8',   // Visual Presentation
  '1.4.9',   // Images of Text (No Exception)
  '1.4.10',  // Reflow
  '1.4.11',  // Non-text Contrast
  '1.4.12',  // Text Spacing
  '1.4.13',  // Content on Hover or Focus

  // 2. Operable
  '2.1.1',   // Keyboard
  '2.1.2',   // No Keyboard Trap
  '2.1.3',   // Keyboard (No Exception)
  '2.1.4',   // Character Key Shortcuts
  '2.2.1',   // Timing Adjustable
  '2.2.2',   // Pause, Stop, Hide
  '2.2.3',   // No Timing
  '2.2.4',   // Interruptions
  '2.2.5',   // Re-authenticating
  '2.2.6',   // Timeouts
  '2.3.1',   // Three Flashes or Below Threshold
  '2.3.2',   // Three Flashes
  '2.3.3',   // Animation from Interactions
  '2.4.1',   // Bypass Blocks
  '2.4.2',   // Page Titled
  '2.4.3',   // Focus Order
  '2.4.4',   // Link Purpose (In Context)
  '2.4.5',   // Multiple Ways
  '2.4.6',   // Headings and Labels
  '2.4.7',   // Focus Visible
  '2.4.8',   // Location
  '2.4.9',   // Link Purpose (Link Only)
  '2.4.10',  // Section Headings
  '2.4.11',  // Focus Not Obscured (Minimum) — NEW in 2.2
  '2.4.12',  // Focus Not Obscured (Enhanced) — NEW in 2.2
  '2.4.13',  // Focus Appearance — NEW in 2.2
  '2.5.1',   // Pointer Gestures
  '2.5.2',   // Pointer Cancellation
  '2.5.3',   // Label in Name
  '2.5.4',   // Motion Actuation
  '2.5.5',   // Target Size (Enhanced)
  '2.5.7',   // Dragging Movements — NEW in 2.2
  '2.5.8',   // Target Size (Minimum) — NEW in 2.2

  // 3. Understandable
  '3.1.1',   // Language of Page
  '3.1.2',   // Language of Parts
  '3.1.3',   // Unusual Words
  '3.1.4',   // Abbreviations
  '3.1.5',   // Reading Level
  '3.1.6',   // Pronunciation
  '3.2.1',   // On Focus
  '3.2.2',   // On Input
  '3.2.3',   // Consistent Navigation
  '3.2.4',   // Consistent Identification
  '3.2.5',   // Change on Request
  '3.2.6',   // Consistent Help — NEW in 2.2
  '3.3.1',   // Error Identification
  '3.3.2',   // Labels or Instructions
  '3.3.3',   // Error Suggestion
  '3.3.4',   // Error Prevention (Legal, Financial, Data)
  '3.3.5',   // Help
  '3.3.6',   // Error Prevention (All)
  '3.3.7',   // Redundant Entry — NEW in 2.2
  '3.3.8',   // Accessible Authentication (Minimum) — NEW in 2.2
  '3.3.9',   // Accessible Authentication (Enhanced) — NEW in 2.2

  // 4. Robust
  '4.1.1',   // Parsing (obsolete in 2.2 but still in spec)
  '4.1.2',   // Name, Role, Value
  '4.1.3',   // Status Messages
]);

/**
 * Check if a WCAG criterion number is valid.
 * @param {string} criterion - e.g., "1.4.3" or "2.5.8"
 * @returns {boolean}
 */
function isValidWCAG(criterion) {
  return WCAG_22_CRITERIA.has(criterion);
}

/**
 * Extract all WCAG criterion numbers from a text string.
 * @param {string} text
 * @returns {string[]} Array of criterion numbers found
 */
function extractWCAGCriteria(text) {
  const regex = /WCAG\s+(\d+\.\d+\.\d+)/g;
  const criteria = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    criteria.push(match[1]);
  }
  return criteria;
}

/**
 * Validate all WCAG criteria in a text string.
 * @param {string} text
 * @returns {{ valid: string[], invalid: string[] }}
 */
function validateWCAGCriteria(text) {
  const found = extractWCAGCriteria(text);
  const valid = [];
  const invalid = [];
  for (const c of found) {
    if (isValidWCAG(c)) {
      valid.push(c);
    } else {
      invalid.push(c);
    }
  }
  return { valid, invalid };
}

module.exports = {
  WCAG_22_CRITERIA,
  isValidWCAG,
  extractWCAGCriteria,
  validateWCAGCriteria
};
