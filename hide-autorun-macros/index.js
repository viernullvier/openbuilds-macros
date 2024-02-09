window._origPMB = window._origPMB || populateMacroButtons
const toggleBtn = $(`<label><input type="checkbox" id="toggleHidden" onchange="autorunMacros.toggle($('#toggleHidden').prop('checked'))"/> Show all</label>`);
window.populateMacroButtons = () => {
  window._origPMB()
  window.autorunMacros = $(':contains("js:autorun")').parents('.macrobtn').add($('#macros .command-button.rounded'))

  $("#macros").append(toggleBtn)
  autorunMacros.toggle($('#toggleHidden').prop('checked'))

}

setTimeout(populateMacroButtons, 100)
