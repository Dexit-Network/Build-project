/* eslint-disable no-unused-expressions */
import { AppContext } from 'libs/remix-ui/app/src/lib/remix-app/context/context'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react' // eslint-disable-line
import DragBar from '../dragbar/dragbar'
import RemixUIPanelPlugin from '../plugins/panel-plugin'
import { PluginRecord } from '../types'
import './main-panel.css'

const RemixUIMainPanel = () => {
  const appContext = useContext(AppContext)
  const [plugins, setPlugins] = useState<PluginRecord[]>([])
  const editorRef = useRef<HTMLDivElement>(null)
  const mainPanelRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const refs = [tabsRef, editorRef, mainPanelRef, terminalRef]

  const renderPanels = () => {
    if (appContext) {
      const pluginPanels: PluginRecord[] = []
      Object.values(appContext.layout.panels).map((panel: any) => {
        pluginPanels.push({
          profile: panel.plugin.profile,
          active: panel.active,
          view: panel.plugin.profile.name === 'tabs' ? panel.plugin.renderTabsbar() : panel.plugin.render(),
          class: panel.plugin.profile.name + '-wrap ' + (panel.minimized ? 'minimized' : ''),
          minimized: panel.minimized
        })
      })
      setPlugins(pluginPanels)
    }
  }

  useEffect(() => {
    renderPanels()
    appContext.layout.event.on('change', () => {
      renderPanels()
    })
  }, [])

  return (
    <div className="mainview">
      {Object.values(plugins).map((pluginRecord, i) => {
        return (
          <React.Fragment key={`mainView${i}`}>
            {(pluginRecord.profile.name === 'terminal') ? <DragBar key='dragbar-terminal' hidden={pluginRecord.minimized || false} setHideStatus={() => {}} refObject={terminalRef}></DragBar> : null}
            <RemixUIPanelPlugin
              ref={refs[i]}
              key={pluginRecord.profile.name}
              pluginRecord={pluginRecord}
            />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default RemixUIMainPanel
