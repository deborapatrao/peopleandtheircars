import { useQuery } from "@apollo/client"
import { Button, Card } from "antd"
import {EditOutlined} from '@ant-design/icons'
import { GET_CARS } from "../../queries"
import Car from "./Car"
import RemovePerson from "../buttons/RemovePerson"
import { useState } from "react"
import UpdatePerson from "../forms/UpdatePerson"
import { Link } from "react-router-dom"

// const getStyles = () => ({
//     card: {
//         width: '100%'
//     }
// })



const Person = props => {
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const [editMode, setEditMode] = useState(false)
// const styles = getStyles()

const { loading, error, data} = useQuery(GET_CARS, { 
    variables: {personId: props.id} })
if (loading) return 'Loading ...'
if (error) return `Error ${error.message}`

const handleButtonClick = () => {
    setEditMode(!editMode)
}

const updateStateVariable = (variable, value) => {
    switch(variable){
        case 'firstName':
        setFirstName(value)
        break

        case 'lastName':
        setLastName(value)
        break

        default:
            break
    }
}

    return(
        <div>

            {editMode? <UpdatePerson 
            id={props.id}
            firstName={props.firstName}
            lastName={props.lastName}
            onButtonClick={handleButtonClick}
            updateStateVariable={updateStateVariable}/>
            :(
                <Card 
                //style={styles.card}
                title={`${firstName} ${lastName}`}
                actions={[
                    <EditOutlined key='edit' onClick={handleButtonClick} />,
                    <RemovePerson id={id} />
                ]}
                >
                    {data.cars.map(({ id, year, make, model, price, personId }) => <Car key={id} 
                    id={id} 
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}/>)}

                    <Link to={`/person/${id}`}>Learn More</Link>
                </Card>
            )}
        
        </div>
    )
}

export default Person