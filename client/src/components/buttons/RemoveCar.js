import { DeleteOutlined } from "@ant-design/icons"
import { useMutation } from "@apollo/client"
import { GET_CARS, REMOVE_CAR } from "../../queries"
import filter from 'lodash.filter'

const RemoveCar = props => {
const { id, personId } = props

    const [removeCar] = useMutation(REMOVE_CAR, {
        update(cache, {data: {removeCar}}) {
            const {cars} = cache.readQuery({ query: GET_CARS, variables: {personId: personId} })
            cache.writeQuery({
                query: GET_CARS, variables:{personId: personId},
                data:{
                    cars:filter(cars, c => {
                        return c.id !== removeCar.id
                    })
                }
            })
        }
    })
    const handleButtonClick = () => {
        let result = window.confirm('Are you sure you want to delete this person')

        if(result){
            removeCar({
                variables: {
                    id
                }
            })
        }
    }

    return(
        
        <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
    )
}

export default RemoveCar