import { render as baseRender, type RenderOptions, type RenderResult } from '@testing-library/react'

export function render(ui: React.ReactNode, options?: RenderOptions): RenderResult {
  return baseRender(ui, options)
}
