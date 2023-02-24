import { useQuery } from "@apollo/client"
import { Card } from "antd"
import { useParams } from "react-router-dom"
import { GET_CARS, GET_PERSON } from "../queries"


const SinglePage = props => {
    const {id} = useParams()

//  const {loading, error, data} = useQuery(GET_PERSON, {
//         variables: {id: id}
//     })
//     console.log('data', data)
//     console.log('id', id)


    const {loading, error, data} = useQuery(GET_CARS, {
        variables: {personId: id}
    })

    if (loading) return 'Loading ...'
    if (error) return `Error ${error.message}`

    return(
        <div className="App">
            <Card
            style={{width: '100%'}}
            title={`${data.firstName} ${data.lastName}`} >
                {data.cars.map((car) =>
                <Card 
                key={car.id}
                type="inner"
                title={`${car.make} ${car.model}`}>
                    <p>Year: {car.year}</p>
                    <p>Price: {car.price}</p>
                </Card> )}
            </Card>
        </div>
    )

}

export default SinglePage