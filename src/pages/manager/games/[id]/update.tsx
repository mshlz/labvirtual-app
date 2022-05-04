import { useRouter } from "next/router"
import { GameEditForm } from "../../../../components/pages/Manager/Game/GameEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdateGamePage = () => {
    const router = useRouter()
    const gameId = router.query.id as string

    return <AdminLayout>
        {gameId && <GameEditForm gameId={gameId} />}
    </AdminLayout >
}

export default UpdateGamePage