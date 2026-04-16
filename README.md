README — Todo Card Project (Stage 0 + Stage 1a)

Live URL
Stage 0 and Stage 1a (Advanced Todo Card): https://albandavid494.github.io/Testable-Todo-Item-Card-Component/

GitHub Repo
https://github.com/AlbanDavid494/Testable-Todo-Item-Card-Component.git

Overview
This project contains a Todo Card implementation for:

Stage 0: a baseline, testid-stable Todo Card

Stage 1a: an interactive, stateful “Advanced Todo Card” with:

edit mode
priority/status control
expand/collapse for the description
dynamic due-time + overdue indicator
improved accessibility and keyboard behavior

What changed from Stage 0 → Stage 1a:
1) Editing mode
Added an Edit button that switches the card into an edit form.
Edit form includes:
Title input
Description textarea
Priority dropdown
Due date input
Added Save and Cancel:
Save persists changes to the card
Cancel restores the previous values (discarding unsaved edits)
Focus behavior:
(If implemented) focus is moved into the form and optionally trapped while editing
focus returns to the Edit button after closing edit mode

2) Status transitions + strict synchronization
Status is now user-controlled via a status dropdown/segmented control.
Synchronization rules are enforced:
Checking the checkbox sets status to Done
Setting status to Done checks the checkbox
Unchecking after Done resets status to Pending
The checkbox, status text/display, and status control always match visually.

3) Priority indicator improvements
Added a priority indicator that visually changes for:
Low
Medium
High
The indicator is updated immediately when priority changes.

4) Expand / Collapse for description
Description becomes collapsible when it exceeds a chosen length threshold.
Added:
Expand/collapse toggle button
Collapsible section container
Accessibility:
toggle uses aria-expanded and aria-controls
collapsible element has a matching id
toggle is keyboard accessible

5) Time management enhancements (granular + overdue)
Due-time display now updates periodically (every 30–60 seconds).
The UI shows granular relative time such as:
Due in 3 hours
Due in 2 days
Due in 45 minutes
Overdue by 1 hour
Added an Overdue indicator:
explicit “Overdue” label/text
red visual accent (or similar)
When status becomes Done:
time updates stop
the due-time display is replaced with “Completed”
New design decisions
State model: The card maintains internal state for title, description, priority, status, and dueDate, and uses a temporary “draft” state while editing.
Single-card architecture: All features are implemented within the single Todo Card component (no multi-page app structure).
Accessibility-first controls:
semantic elements where possible
ARIA attributes for expandable sections
aria-live="polite" for time updates (if you implemented live announcements)
Any known limitations
(Adjust these based on your actual implementation.)

The due-time formatting is approximate due to periodic update intervals (30–60s tick).
If focus trapping was not implemented, keyboard focus may follow normal tab order while in edit mode (still keyboard reachable, but not “trapped”).
Expand/collapse threshold is fixed (based on character count or measured length), not dynamically computed from layout height.
Accessibility notes

Keyboard navigation: Tab order supports the expected flow, including:
checkbox
status control
expand/collapse toggle
edit and delete controls
save/cancel when in edit mode

Edit mode UX:
inputs include associated labels (<label for="...">)
Save/Cancel are reachable by keyboard
focus returns to the edit button when the form closes (if implemented)
Expandable description:
toggle