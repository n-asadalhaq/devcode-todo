/**
 * List of selector used by Cypress to test. The selector should be stored
 * on `data-cy` property.
 *
 * base url source: https://ivan-todo-devrank.netlify.app/
 * path sources: '/', '/detail/:id'
 * 
 * script to query available selectors from the example site:
 *
 * ```js
  const cySels = Array.from(document.querySelectorAll('[data-cy]'))
		.map(el => el.dataset.cy)
  	.filter((sel, idx, arr) => arr.indexOf(sel) === idx) // deduplicates
   	.reduce((acc, item) => ({ ...acc, [item]: item }), {})  // transform into object
 * ```
 */

export const cySelectors = {
  'header-background': 'header-background',
  'header-title': 'header-title',
  'activity-title': 'activity-title',
  'activity-add-button': 'activity-add-button',
  'activity-item': 'activity-item',
  'activity-item-title': 'activity-item-title',
  'activity-item-date': 'activity-item-date',
  'activity-item-delete-button': 'activity-item-delete-button',
  'modal-delete': 'modal-delete',
  'modal-information': 'modal-information',
  'modal-add': 'modal-add',
  'modal-add-name-input': 'modal-add-name-input',
  'modal-add-priority-dropdown': 'modal-add-priority-dropdown',
  'modal-add-save-button': 'modal-add-save-button',
  'modal-delete-cancel-button': 'modal-delete-cancel-button',
  'modal-delete-confirm-button': 'modal-delete-confirm-button',
  'todo-back-button': 'todo-back-button',
  'todo-title': 'todo-title',
  'todo-title-edit-button': 'todo-title-edit-button',
  'todo-sort-button': 'todo-sort-button',
  'todo-add-button': 'todo-add-button',
  'todo-empty-state': 'todo-empty-state',
  'todo-item-delete-button': 'todo-item-delete-button',
  'todo-item-checkbox': 'todo-item-checkbox',
};
