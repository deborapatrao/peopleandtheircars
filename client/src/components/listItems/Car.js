import { Card } from "antd"
import { useState } from "react"

const Car = props => {
    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)


    return (
        <Card type="inner"
        title={`${year} ${make} ${model} -> $ ${price}`}>

        </Card>
    )
}

export default Car