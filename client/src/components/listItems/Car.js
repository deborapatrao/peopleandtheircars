import { Card } from "antd"
import { useState } from "react"
import {EditOutlined} from '@ant-design/icons'
import RemoveCar from "../buttons/RemoveCar"


const Car = props => {
    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)
    const [editMode, setEditMode] = useState(false)

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    return (
        <Card type="inner"
        title={`${year} ${make} ${model} -> $ ${price}`}
        actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveCar id={id} personId={props.personId}/>
        ]}>

        </Card>
    )
}

export default Car