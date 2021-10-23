import { ExperimentOutlined, HomeOutlined, ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

export interface RouteItem {
    path: string
    title: string
    icon?: ReactNode
    scope?: 'student' | 'teacher' | 'admin'
    permission?: string
    base?: string
    children?: RouteItem[]
}

export const Routes: RouteItem[] = [
    {
        path: '/home',
        title: 'Início',
        icon: <HomeOutlined />,
    },
    {
        path: '/v2/my-classes',
        title: 'Minhas turmas',
        icon: <HomeOutlined />,
    },
    {
        path: '/v2/class/123',
        title: 'Turma teste',
        icon: <ExperimentOutlined />,
    },
    {
        path: '#',
        title: 'Configurações',
        icon: <SettingOutlined />,
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
        icon: <ProfileOutlined />,
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