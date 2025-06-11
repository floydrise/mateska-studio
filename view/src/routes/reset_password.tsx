import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reset_password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/reset_password"!</div>
}
