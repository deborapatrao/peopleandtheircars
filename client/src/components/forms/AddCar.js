import { useEffect, useState } from 'react'
import { ADD_CAR, GET_PEOPLE } from '../../queries'
import { useQuery } from "@apollo/client"
import { v4 as uuidv4 } from 'uuid'
import { Button, Form, Input, InputNumber, Select, Divider, Typography } from 'antd'
import { useMutation } from '@apollo/client'


const AddCar = () => {
    const [id] = useState(uuidv4())
    const [addCar] = useMutation(ADD_CAR)
    const [form] = Form.useForm()
    const[, forceUpdate] = useState()

    const {data} = useQuery(GET_PEOPLE)

    useEffect(() => {
        forceUpdate([])
    }, [])

    const onFinish = values => {
        const { year, make, model, price, personId } = values
        
        console.log('values: ', values)
        addCar({
            variables:{
                id,
                year,
                make,
                model,
                price,
                personId 
            }
        })
    }

    return(
        <Form
        name='add-car-form'
        form={form}
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{marginBottom:'40px'}}
        >

            <Divider>
                <Typography.Title level={2}>Add Car</Typography.Title>
            </Divider>

            <Form.Item 
            name='year'
            label={'Year: '}
            rules={[{required: true, message: 'Please input the car\'s year' }]}>
                <InputNumber 
                placeholder='Year'/>
            </Form.Item>

            <Form.Item 
            name='make'
            label={'Make: '}
            rules={[{required: true, message: 'Please input the car\'s make' }]}>
                <Input 
                placeholder='Make'/>
            </Form.Item>

            <Form.Item 
            name='model'
            label={'Model: '}
            rules={[{required: true, message: 'Please input the car\'s model' }]}>
                <Input 
                placeholder='Model'/>
            </Form.Item>

            <Form.Item 
            name='price'
            label={'Price: '}
            rules={[{required: true, message: 'Please input the car\'s price' }]}>
                <InputNumber 
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}/>
            </Form.Item>

            <Form.Item 
            name='personId'
            label={'Person: '}
            rules={[{required: true, message: 'Please select a person' }]}>
                <Select
                showSearch
                placeholder="Select a person">
                    {data? data.people.map((person) => 
                    <Select.Option key={person.id} value={person.id}>{person.firstName} {person.lastName}</Select.Option>
                    ): null}
                </Select>
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                    type='primary'
                    htmlType='submit'
                    disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}>
                        Add Car
                    </Button>
                )}
            </Form.Item>

        </Form>
    )
}

export default AddCar