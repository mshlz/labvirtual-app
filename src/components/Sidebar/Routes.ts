interface RouteItem {
    path: string
    title: string
    icon?: string
    scope?: 'student' | 'teacher' | 'admin'
    permission?: string
    base?: string
    children?: RouteItem[]
}

const Routes: RouteItem[] = [
    {
        path: '/home',
        title: 'Início',
        icon: 'fas fa-tachometer-alt',
    },
    {
        path: '#',
        title: 'Configurações',
        icon: 'fas fa-cog',
        children: [
            {
                path: '/profile',
                title: 'Minha Conta',
                icon: 'fas fa-tachometer-alt',
            }
        ]
    },
    {
        path: '#',
        title: 'Gerenciamento',
        icon: 'fas fa-cog',
        base: '/manager',
        children: [
            {
                path: '/institutions',
                title: 'Instituições',
                // icon: 'fas fa-tachometer-alt',
            },
            {
                path: '/disciplines',
                title: 'Disciplinas',
                // icon: 'fas fa-tachometer-alt',
            },
            {
                path: '/subjects',
                title: 'Assuntos',
                // icon: 'fas fa-tachometer-alt',
            },
            {
                path: '/lessons',
                title: 'Conteúdo Teórico',
                // icon: 'fas fa-tachometer-alt',
            },
            {
                path: '/glossary',
                title: 'Glossário',
                // icon: 'fas fa-tachometer-alt',
            },
            {
                path: '/questions',
                title: 'Questões',
                // icon: 'fas fa-tachometer-alt',
            },
        ]
    },
]

export { Routes }