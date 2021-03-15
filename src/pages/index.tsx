import { toast } from "react-toastify"
import { Button } from "../components/UI/Button"
import { useApp } from "../context/AppContext"
import { AppLeftNavigation } from "../layouts/AppLeftNavigation"

const Index = () => {
    const { user } = useApp()
    return <AppLeftNavigation>
        <h1>Bem vindo, {user.name}</h1>
        <Button color="success" onClick={() => toast("Test toast")}>Test toast</Button>
    </AppLeftNavigation>
}

export default Index