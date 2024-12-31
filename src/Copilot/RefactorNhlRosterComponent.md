# Copilot Prompt for architecture guidance splitting the NHL component into separate list and detail components

**Prompt:**
@workspace How to split the nhl roster component into roster list and detail for clarity and easier maintenance?

**Reply:**
To split the NHL roster component into separate components for the roster list and the roster detail, you can follow these steps:

- Create a new component for the roster list.
- Create a new component for the roster detail.
- Update the existing NHL roster component to use the new components.

ng generate component nhl/components/roster-list
ng generate component nhl/components/roster-detail
