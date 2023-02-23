import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input } from 'antd'

const AddPerson = () => {
    const [id] = useState(uuidv4())
    const [form] = Form.useForm()
    const[, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate([])
    }, [])

    return(
        <Form
        name='add-person-form'
        form={form}
        layout='inline'
        size='large'
        style={{marginBottom:'40px'}}
        >
            <Form.Item 
            name='firstName'
            rules={[{required: true, message: 'Please input first name' }]}>
                <Input 
                placeholder='First Name'/>
            </Form.Item>

            <Form.Item 
            name='lastName'
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