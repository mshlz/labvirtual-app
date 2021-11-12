import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Card, Layout, Menu, Space, Typography } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useApp } from "../../context/AppContext";
import { RouteItem, Routes } from "./Routes";
const { Sider } = Layout;
const { SubMenu } = Menu;

export const Sidebar = (props) => {
  const router = useRouter()
  const { disciplines } = useApp()
  const disciplinesRoutes = (disciplines || []).map<RouteItem>(v => {
    return {
      path: '#',
      title: v.name,
      icon: <FontAwesomeIcon icon={faStar} />,
      children: (v.subjects||[]).map(s => ({ path: '/content/subject/' + s._id, title: s.name }))
    }
  })

  const handleSidebarClick = (data) => {
    console.log(data)
    router.push(data.key)
  }

  return <Sider
    breakpoint={'lg'}
    collapsedWidth={0}
    collapsible
    collapsed={props.collapsed}
    onCollapse={props.onCollapse}
    trigger={null}
    theme={'light'}
    width={'250px'}

  >
    <Card hoverable style={{ margin: '16px', backgroundColor: '#919eab1f' }} bodyStyle={{ padding: '16px', }}>
      <Space>
        <Avatar icon={'MH'} />
        <Typography.Text strong>Mateus Holzschuh</Typography.Text>
      </Space>
    </Card>
    <Menu theme="light" mode="inline" onClick={handleSidebarClick}>
      {Routes.concat(disciplinesRoutes).map((route, idx) => {
        if (route.children) {
          return <SubMenu key={idx} icon={route.icon && route.icon} title={route.title}>
            {route.children.map(subRoute =>
              <Menu.Item key={(route.base ?? '').concat(subRoute.path)}>{subRoute.title}</Menu.Item>
            )}
          </SubMenu>
        }

        return <Menu.Item key={route.path} icon={route.icon && route.icon}>
          {route.title}
        </Menu.Item>
      })}
    </Menu>
  </Sider>
}
