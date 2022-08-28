import { faStar } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Card, Layout, Menu, Space, Typography } from "antd"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useApp } from "../../context/AppContext"
import { HelpPageService } from "../../services/HelpPageService"
import { getInitials } from "../../utils/getInitials"
import { RouteItem, Routes } from "./Routes"
const { Sider } = Layout
const { SubMenu } = Menu

interface IPublicPageSidebarProps {
  collapsed: boolean
  onCollapse: (...args) => void
}

export const PublicPageSidebar = (props: IPublicPageSidebarProps) => {
  const router = useRouter()
  const [customRoutes, setCustomRoutes] = useState<RouteItem[]>([])

  useEffect(() => {
    loadPagesInfo()
  }, [])

  const loadPagesInfo = async () => {
    const result = await HelpPageService.getRouterInfo()
    const routes: RouteItem[] = []

    result.sections.forEach((section) => {
      const _pages = result.pages.filter((v) => v.section == section._id)
      const route: RouteItem = {
        path: "#",
        title: section.name,
        children: _pages.map((v) => ({
          path: `/pages/${v.slug}`,
          title: v.name,
        })),
      }
      routes.push(route)
    })

    setCustomRoutes(routes)
  }

  const handleSidebarClick = (data) => {
    router.push(data.key)
  }

  return (
    <Sider
      breakpoint={"lg"}
      collapsedWidth={0}
      collapsible
      collapsed={props.collapsed}
      onCollapse={props.onCollapse}
      trigger={null}
      theme={"light"}
      width={"250px"}
    >
      <Menu theme="light" mode="inline" onClick={handleSidebarClick}>
        {Routes.concat(customRoutes || []).map((route, idx) => {
          if (route.children) {
            return (
              <SubMenu
                key={idx}
                icon={route.icon && route.icon}
                title={route.title}
              >
                {route.children.map((subRoute) => (
                  <Menu.Item key={(route.base ?? "").concat(subRoute.path)}>
                    {subRoute.title}
                  </Menu.Item>
                ))}
              </SubMenu>
            )
          }

          return (
            <Menu.Item key={route.path} icon={route.icon && route.icon}>
              {route.title}
            </Menu.Item>
          )
        })}
      </Menu>
    </Sider>
  )
}
