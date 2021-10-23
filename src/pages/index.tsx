import { toast } from "react-toastify"
import { Button } from "../components/UI/Button"
import { useApp } from "../context/AppContext"
import { AdminLayout } from "../layouts/AdminLayout"

const Index = () => {
    const { user } = useApp()
    return <AdminLayout>
        <h1>Bem vindo, {user.name}</h1>
        <Button color="success" onClick={() => toast("Test toast")}>Test toast</Button>
    </AdminLayout>
}

export default Index