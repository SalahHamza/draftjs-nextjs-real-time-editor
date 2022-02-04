export const toolbarOptions = {
 options: ['inline', 'blockType', 'list', 'link', 'history'],
 inline: {
  inDropdown: false,
  className: undefined,
  component: undefined,
  dropdownClassName: undefined,
  options: ['bold', 'underline', 'superscript'],
 },
 blockType: {
  inDropdown: true,
  options: ['Normal', 'H1', 'H2', 'H3', 'H4'],
 },
 list: {
  inDropdown: false,
  options: ['unordered', 'ordered'],
 },
 link: {
  inDropdown: false,
  defaultTargetOption: '_self',
  options: ['link', 'unlink'],
 },
 history: {
  inDropdown: false,
  options: ['undo', 'redo'],
 },
};
