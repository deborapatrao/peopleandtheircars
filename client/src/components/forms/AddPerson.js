import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Divider, Form, Input, Typography } from 'antd'
import { useMutation } from '@apollo/client'
import { ADD_PERSON, GET_PEOPLE } from '../../queries'

const AddPerson = () => {
    const [id] = useState(uuidv4())
    const [addPerson] = useMutation(ADD_PERSON)
    const [form] = Form.useForm()
    const[, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate([])
    }, [])

    const onFinish = values => {
        const { firstName, lastName } = values

        addPerson({
            variables:{
                id,
                firstName,
                lastName
            }, 
            update: (cache, {data: {addPerson}}) => {
                const data = cache.readQuery({ query: GET_PEOPLE })
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data:{
                        ...data,
                        people: [...data.people, addPerson]
                    }
                })
            }
        })

        form.resetFields()
    }

    return(

        <Form
        name='add-person-form'
        form={form}
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{marginBottom:'40px'}}
        >
            <Divider>
                <Typography.Title level={2}>Add Person</Typography.Title>
            </Divider>
            
            <Form.Item 
            name='firstName'
            label={'First Name: '}
            rules={[{required: true, message: 'Please input first name' }]}>
                <Input 
                placeholder='First Name'/>
            </Form.Item>

            <Form.Item 
            name='lastName'
            label={'Last Name: '}
            rules={[{required: true, message: 'Please input last name' }]}>
                <Input 
                placeholder='Last Name'/>
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                    type='primary'
                    htmlType='submit'
                    disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}>
                        Add Person
                    </Button>
                )}
            </Form.Item>

        </Form>
    )
}

export default AddPerson