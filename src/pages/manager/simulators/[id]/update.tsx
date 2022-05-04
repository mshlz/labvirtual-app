import { useRouter } from "next/router"
import { SimulatorEditForm } from "../../../../components/pages/Manager/Simulator/SimulatorEditForm"
import { AdminLayout } from "../../../../layouts/AdminLayout"

const UpdateSimulatorPage = () => {
    const router = useRouter()
    const simulatorId = router.query.id as string

    return <AdminLayout>
        {simulatorId && <SimulatorEditForm simulatorId={simulatorId} />}
    </AdminLayout >
}

export default UpdateSimulatorPage