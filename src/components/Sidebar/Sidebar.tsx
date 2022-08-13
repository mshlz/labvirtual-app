import { faStar } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Card, Layout, Menu, Space, Typography } from "antd"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { useApp } from "../../context/AppContext"
import { getInitials } from "../../utils/getInitials"
import { RouteItem, Routes } from "./Routes"
const { Sider } = Layout
const { SubMenu } = Menu

const assembleMenu = (route: RouteItem, basePath: string = "") => {
  const routeKey = basePath.concat(route.path)
  if (route.children) {
    return (
      <SubMenu icon={route.icon && route.icon} title={route.title}>
        {route.children.map((subRoute) => assembleMenu(subRoute, routeKey))}
      </SubMenu>
    )
  }

  return (
    <Menu.Item key={routeKey} icon={route.icon && route.icon}>
      <Link href={routeKey}>{route.title}</Link>
    </Menu.Item>
  )
}

export const Sidebar = (props) => {
  const router = useRouter()
  const { disciplines, user } = useApp()
  const disciplinesRoutes = (disciplines || []).map<RouteItem>((v) => {
    return {
      path: "",
      title: v.name,
      icon: <FontAwesomeIcon icon={faStar} />,
      children: (v.subjects || []).map((s) => ({
        path: "/content/subject/" + s._id,
        title: s.name,
      })),
    }
  })

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
      <Card
        hoverable
        onClick={() => router.push("/profile")}
        style={{ margin: "16px", backgroundColor: "#919eab1f" }}
        bodyStyle={{ padding: "16px" }}
      >
        <Space>
          <Avatar icon={getInitials(user.name, true)} />
          <Typography.Text strong>{user.name}</Typography.Text>
        </Space>
      </Card>
      <Menu theme="light" mode="inline">
        {Routes.concat(disciplinesRoutes).map((route, idx) =>
          assembleMenu(route)
        )}
      </Menu>
    </Sider>
  )
}
