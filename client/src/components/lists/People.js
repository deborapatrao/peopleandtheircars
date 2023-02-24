import { useQuery } from "@apollo/client"
import { List, Divider, Typography } from "antd"
import { GET_PEOPLE } from "../../queries"
import Person from "../listItems/Person"

const getStyles = () => ({
    list:{
        justifyContent: 'center',
        width: '100%'
    }
})

const People = () => {
const styles = getStyles()

const {loading, error, data} = useQuery(GET_PEOPLE)
if (loading) return 'Loading ...'
if (error) return `Error ${error.message}`

return (
    <List
    grid={{gutter:20, column: 1}} style={styles.list}>

        <Divider>
            <Typography.Title level={2}>Records</Typography.Title>
        </Divider>

        {data.people.map(({ id, firstName, lastName }) => (
            <List.Item key={id}>
                <Person key={id} id={id} firstName={firstName} lastName={lastName} />
            </List.Item>
        ))}

    </List>
)

}

export default People