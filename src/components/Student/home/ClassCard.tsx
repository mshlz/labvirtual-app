import Link from "next/link"
import { hashToColor } from "../../../utils/hashToColor"
import { Button } from "../../UI/Button"

export interface IClassCard {
    id: string
    name: string
    teacher: string
}

export const ClassCard = ({ id, name, teacher }: IClassCard) => {
    return <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-3" style={{ maxWidth: '450px' }}>
        <div className="card border-0 shadow-small m-b-10">
            <div className="card-header pt-3 align-items-center" style={{ backgroundColor: hashToColor(`${id+name+teacher}`) }}> 
            {/* '#8bc34a' */}
                <div>
                    <Link href={`/c/${id}`}>
                        <h3 style={{ color: '#fff', fontWeight: 400, cursor: 'pointer' }}>{name}</h3>
                    </Link>
                    {/* <small style={{color: '#fff'}}>TADS</small> */}
                    <p style={{ color: '#fff' }}>{teacher}</p>
                </div>
            </div>
            <div className="card-body" style={{ height: '150px' }}>
                {/* <strong>Atividades:</strong> Nenhuma atividade pendente! */}
            </div>
            <div className="card-footer bg-white d-flex justify-content-end">
                <Link href={`/c/${id}`}>
                    <Button color="secondary" outline>Acessar turma</Button>
                </Link>
            </div>
        </div>
    </div>
}