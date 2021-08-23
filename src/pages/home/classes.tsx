import { useEffect } from "react"
import { ClassCard } from "../../components/Student/home/ClassCard"
import { AppLeftNavigation } from "../../layouts/AppLeftNavigation"
import { UserService } from "../../services/UserService"

const MyClasses = () => {

    useEffect(() => {
        (async () => {
            const u = await UserService.getProfile()
            console.log('user', u)
        })()
    }, [])

    return <AppLeftNavigation>
        <div className="row">
            <ClassCard
                id="uuid"
                name="Disciplina teste"
                teacher="Professor"
            />
        </div>
    </AppLeftNavigation>
}

export default MyClasses