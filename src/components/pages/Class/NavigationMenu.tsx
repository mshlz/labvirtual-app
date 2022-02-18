import { Menu } from "antd"
import Link from "next/link"

interface INavigationMenu {
    classId: string
    active: 'mural' | 'activities' | 'people'
}

export const NavigationMenu = (props: INavigationMenu) => {
    return <Menu mode="horizontal" selectedKeys={[props.active]} style={{ justifyContent: 'center' }} >
        <Menu.Item key="mural">
            <Link href={`/v2/class/${props.classId}`}>Mural</Link>
        </Menu.Item>
        <Menu.Item key="activities">
            <Link href={`/v2/class/${props.classId}/activities`}>Atividades</Link>
        </Menu.Item>
        <Menu.Item key="people">
            <Link href={`/v2/class/${props.classId}/people`}>Pessoas</Link>
        </Menu.Item>
    </Menu>
}