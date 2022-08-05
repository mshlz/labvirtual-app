import { BackTop, Layout, Menu } from "antd"
import { useState } from "react"
import { AutoBreadcrumb } from "../components/Breadcrumb/AutoBreadCrumb"
import { Navbar } from "../components/Navbar/Navbar"
import { Sidebar } from "../components/Sidebar/Sidebar"

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

export const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = (newState: boolean) => setCollapsed(newState)

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <BackTop />
      <Navbar handleSidebar={() => onCollapse(!collapsed)} />
      <Layout>
        <Sidebar collapsed={collapsed} onCollapse={onCollapse} />
        {/* <Header /> */}
        <Content>
          <AutoBreadcrumb />
          <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
        </Content>
      </Layout>
      {/* <Footer style={{ textAlign: 'center' }}>Labvis © {new Date().getFullYear()}</Footer> */}
    </Layout>
  )
}
