import React from 'react'

import { ModelsWrapper, ModelSection } from '../../Model'
import DefaultOverlayContent from '../../components/DefaultOverlayContent'
import UniqueOverlay from '../../components/UniqueOverlay'

import { Container, Spacer } from './styles'

const Dash3: React.FC = () => {
  return (
    <Container>
      <ModelsWrapper>
        <div>
          {[
            'Agendamentos',
            'Colaboradores',
            'Procedimentos',
            'Agenda',
            'Relatórios',
            'Sobre'
          ].map(modelName => (
            <ModelSection
              key={modelName}
              className="back"
              modelName={modelName}
              overlayNode={
                <DefaultOverlayContent
                  label={modelName}
                  description=""
                />
              }
            />
          ))}
        </div>

        <Spacer />

        <UniqueOverlay />
      </ModelsWrapper>
    </Container>
  )
}

export default Dash3
