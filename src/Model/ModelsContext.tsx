import React, { ReactNode } from 'react'

export interface ProcedureModel {
  modelName: string
  overlayNode: ReactNode
  sectionRef: React.RefObject<HTMLElement>
}

interface ModelsContext {
  wrapperRef: React.RefObject<HTMLElement>
  registeredModels: ProcedureModel[]
  registerModel: (model: ProcedureModel) => void
  unregisterModel: (modelName: string) => void
  getModelByName: (modelName: string) => ProcedureModel | null
}

// Export with default values
export default React.createContext<ModelsContext>({} as ModelsContext)
