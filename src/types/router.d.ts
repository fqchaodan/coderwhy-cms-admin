export interface Route {
  path: string
  name?: string
  component: () => Component
}

export interface BreadCrumb {
  name: string
  path: string
}
