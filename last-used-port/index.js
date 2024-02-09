window._origPopulatePortsMenu = window._origPopulatePortsMenu || populatePortsMenu

window._selectLastPort = () => {
  const lastPort = localStorage.getItem('lastPort') || ''
  if ($(`#portUSB option[value="${lastPort}"]`).length) {
    $("#portUSB").data("select").val(lastPort);
  }
}

window.populatePortsMenu = () => {
  const laststatus = window['laststatus']
  let prevValue
  if (!laststatus?.comms.interfaces.networkDevices.length) {
    const lastIP = localStorage.getItem('lastip')
    if (lastIP && laststatus) {
      prevValue = laststatus.comms.interfaces.networkDevices
      laststatus.comms.interfaces.networkDevices = [{
        ip: lastIP,
        type: 'last known',
        banner: ''
      }]
    } 
  }
  _origPopulatePortsMenu()
  if (!laststatus?.comms.interfaces.activePort) {
    window._selectLastPort()
  }
  if (prevValue) {
    laststatus.comms.interfaces.networkDevices = prevValue
  }
}

window._origSetConnectBar = window._origSetConnectBar || setConnectBar

window.setConnectBar = (val, status) => {
  _origSetConnectBar(val, status)
  if (val !== 0 && status.comms.interfaces.activePort) {
    localStorage.setItem('lastPort', status.comms.interfaces.activePort)
  }
}
