export interface Route {
  path: string
  name?: string
  component: () => Component
}
