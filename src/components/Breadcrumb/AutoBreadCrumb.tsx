import { Breadcrumb } from "antd"
import { NextRouter, useRouter } from "next/router"
import Link from "next/link"
import { useEffect, useState } from "react"

interface IBreadcrumbItem {
  name: string
  href?: string
  key?: string
}

// Admin
const adminTranslationMap: {
  [key: string]: (router: NextRouter) => IBreadcrumbItem
} = {
  manager: (router) => ({
    name: "Administração",
  }),
  create: (router) => ({
    name: "Criar novo",
  }),
  update: (router) => ({
    name: "Atualizar",
  }),

  disciplines: (router) => ({
    name: "Disciplinas",
    href: "/manager/disciplines",
  }),
  subjects: (router) => ({
    name: "Assuntos",
    href: "/manager/subjects",
  }),
  lessons: (router) => ({
    name: "Conteúdos Teórico",
    href: "/manager/lessons",
  }),
  glossary: (router) => ({
    name: "Glossário",
    href: "/manager/glossary",
  }),
  questions: (router) => ({
    name: "Questões",
    href: "/manager/questions",
  }),
}

const translationMap: {
  [key: string]: (router: NextRouter) => IBreadcrumbItem
} = {
  class: (router) => ({
    name: "Minhas Turmas",
    href: "/v2/my-classes",
  }),
  "[classId]": (router) => ({
    name: "Turma",
    href: "/v2/class/" + router.query.classId,
  }),
  activity: (router) => ({
    name: "Atividades",
    href: router.asPath.split("activity")[0] + "#activities",
  }),
  "[activityId]": (router) => ({
    name: "Atividade",
  }),
  activities: (router) => ({
    name: "Atividades",
  }),
  people: (router) => ({
    name: "Pessoas",
  }),
  "my-activities": (router) => ({
    name: "Minhas atividades",
  }),
}

const skipParts = (value) =>
  !(["", "v2"].includes(value) /*|| /^\[.+\]$/.test(value)*/)

export const AutoBreadcrumb = () => {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState([])

  useEffect(() => {
    const isAdmin = router.pathname.startsWith("/manager")
    const items = router.pathname
      .split("/")
      .filter(skipParts)
      .map((i) => ({
        ...(isAdmin ? adminTranslationMap[i] : translationMap[i])?.call(
          this,
          router
        ),
        key: i,
      }))

    setBreadcrumbs(items)
  }, [router])

  const generateParts = (items: IBreadcrumbItem[]) => {
    return items.map((item) => (
      <Breadcrumb.Item key={item.key || item.name}>
        {item.href ? <Link href={item.href}>{item.name}</Link> : item.name}
      </Breadcrumb.Item>
    ))
  }

  return (
    <Breadcrumb style={{ margin: "24px", marginBottom: 0 }}>
      {breadcrumbs.map((item) => (
        <Breadcrumb.Item key={item.key || item.name}>
          {item.href ? <Link href={item.href}>{item.name}</Link> : item.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}
