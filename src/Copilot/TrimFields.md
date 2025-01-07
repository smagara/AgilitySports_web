# Copilot Prompt for architecture guidance handling trimming of all whitespace from input fields

**Prompt:**
@workspace On the detail pages, text fields are not trimmed before storing to the database, what's the best practice for handling this in an angular project?

**Reply:**
To ensure that text fields are trimmed before storing them in the database, you can create a custom directive in Angular that automatically trims the input values. This directive can be applied to all text input fields in your detail pages.

Here is how you can create and use a custom directive for trimming input values:

 - 1. Create a new directive file, e.g., trim.directive.ts [code follows]
- 2. Add the directive to your module, e.g., app.module.ts [code follows]
- 3. Apply the `appTrim` directive to your text input fields in the detail pages: 
<input id="team" pInputText formControlName="team" maxlength="50" appTrim />