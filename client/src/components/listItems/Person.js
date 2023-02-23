import { Card } from "antd"
import {EditOutlined} from '@ant-design/icons'

// const getStyles = () => ({
//     card: {
//         width: '500px'
//     }
// })

const Person = props => {
    const { id, firstName, lastName } = props
// const styles = getStyles()

console.log('props: ', props)

    return(
        <Card 
        title={[firstName, " ", lastName]}
        actions={[
            <EditOutlined key='edit' />
        ]}
        >

        </Card>
    )
}

export default Person