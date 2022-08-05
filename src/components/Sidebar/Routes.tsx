import {
  ExperimentOutlined,
  HomeOutlined,
  ProfileOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons"
import { ReactNode } from "react"

export interface RouteItem {
  path: string
  title: string
  icon?: ReactNode
  scope?: "student" | "teacher" | "admin"
  permission?: string
  base?: string
  children?: RouteItem[]
}

export const Routes: RouteItem[] = [
  {
    path: "/",
    title: "Início",
    icon: <HomeOutlined />,
  },
  {
    path: "/v2/my-classes",
    title: "Minhas turmas",
    icon: <HomeOutlined />,
  },
  {
    path: "/pages/home",
    title: "Ajuda",
    icon: <InfoCircleOutlined />,
  },
  // {
  //     path: '#',
  //     title: 'Configurações',
  //     icon: <SettingOutlined />,
  //     children: [
  //         {
  //             path: '/profile',
  //             title: 'Minha Conta',
  //             icon: 'fas fa-tachometer-alt',
  //         }
  //     ]
  // },
  {
    path: "#",
    title: "Gerenciamento",
    icon: <ProfileOutlined />,
    base: "/manager",
    children: [
      {
        path: "/institutions",
        title: "Instituições",
        // icon: 'fas fa-tachometer-alt',
      },
      {
        path: "/disciplines",
        title: "Disciplinas",
        // icon: 'fas fa-tachometer-alt',
      },
      {
        path: "/subjects",
        title: "Assuntos",
        // icon: 'fas fa-tachometer-alt',
      },

      {
        path: "/lessons",
        title: "Conteúdo Teórico",
        // icon: 'fas fa-tachometer-alt',
      },
      {
        path: "/simulators",
        title: "Simuladores",
        // icon: 'fas fa-tachometer-alt',
      },
      {
        path: "/videos",
        title: "Videos",
        // icon: 'fas fa-tachometer-alt',
      },
      {
        path: "/games",
        title: "Jogos",
        // icon: 'fas fa-tachometer-alt',
      },
      {
        path: "/classes",
        title: "Turmas",
        // icon: 'fas fa-tachometer-alt',
      },
      {
        path: "/glossary",
        title: "Glossário",
        // icon: 'fas fa-tachometer-alt',
      },
      {
        path: "/questions",
        title: "Questões",
        // icon: 'fas fa-tachometer-alt',
      },
      {
        path: "/page-sections",
        title: "Seções de Página",
        // icon: 'fas fa-tachometer-alt',
      },
      {
        path: "/pages",
        title: "Páginas",
        // icon: 'fas fa-tachometer-alt',
      },
    ],
  },
]
