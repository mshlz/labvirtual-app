import { HomeOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

export interface RouteItem {
    path: string
    title: string
    icon?: ReactNode
    base?: string
    children?: RouteItem[]
}

export const Routes: RouteItem[] = [
    {
        path: '/',
        title: 'Início',
        icon: <HomeOutlined />,
    }
]
