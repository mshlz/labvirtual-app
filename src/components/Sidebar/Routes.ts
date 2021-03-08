interface RouteItem {
    path: string
    icon: string
    scope?: 'student' | 'teacher' | 'admin'
    permission?: string
    children?: RouteItem[]
}

const Routes: RouteItem[] = [
    {
        path: '/home',
        icon: 'fas fa-tachometer-alt',
    }
]

export { Routes }