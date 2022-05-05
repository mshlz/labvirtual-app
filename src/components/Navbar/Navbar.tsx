import { MenuOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useRouter } from "next/router";
import React from "react";
import { useApp } from "../../context/AppContext";
import { getInitials } from "../../utils/getInitials";
import styles from "./Navbar.module.css";

const Navbar = (props) => {
  const { logout, user } = useApp()
  const router = useRouter()

  return (
    <nav className={styles.navbar}>
      <div>
        <Button
          className={styles.menu}
          type="ghost"
          icon={<MenuOutlined />}
          onClick={() => props.handleSidebar(true)}
        />
        <a href="/"><img src={'/assets/images/logo.png'} className={styles.logo} alt="logo" /></a>
      </div>

      {/* <div>
      </div> */}

      <div>
        {user
          ? <Dropdown
            overlay={
              <Menu style={{ minWidth: 150 }}>
                <Menu.Item key="0" icon={<UserOutlined />}>
                  {/* TODO */}
                  <a href="#">Perfil</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" icon={<LogoutOutlined />} onClick={() => logout()}>Sair</Menu.Item>
              </Menu>
            }
            arrow
            overlayStyle={{ marginTop: '16px' }}
            trigger={['click']}
          >
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={getInitials(user.name, true)} />
              <Typography.Text>{user.name}</Typography.Text>
            </Space>
          </Dropdown>
          : <Button onClick={() => router.push('/auth/login')}>Entrar</Button>
        }
      </div>
    </nav>
  );
};

export { Navbar };
