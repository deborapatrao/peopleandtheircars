import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { Button, Form, Input, InputNumber, Select } from 'antd'
import { UPDATE_CAR, GET_PEOPLE } from "../../queries"


const UpdateCar = props => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const [updateCar] = useMutation(UPDATE_CAR)
    const {data} = useQuery(GET_PEOPLE)

    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)
    const [initPersonId, setInitPersonId] = useState(props.personId)


    useEffect(() => {
        forceUpdate()
    }, [])

    const onFinish = values => {
        const { year, make, model, price, personId } = values
        console.log('values: ', values)
            updateCar({
                variables:{
                    id, year, make, model, price, personId
                },
                update: (cache, {data: {updateCar}}) => {
                    const data = cache.readQuery({ query: GET_PEOPLE });

                    const newData = data.people.map((person) => {
                        if (personId === updateCar.personId){
                            if (person.id === updateCar.personId) {
                                console.log('person: ', person)
                                const newInfo = person.cars.filter(car => car.id !== updateCar.id)

                                return {...person,
                                cars: [...newInfo, updateCar]}
                            }

                            return person
                        } else {
                            if (person.id === updateCar.personId){
                                const newInfo = [...person.cars, updateCar]
                                return {...person, cars: [...newInfo]}
                            }

                            if(person.id === personId) {
                                const newInfo = person.cars.filter(car => car.id !== updateCar.id)

                                return{
                                    ...person,
                                    cars: [...newInfo]
                                }
                            }
                            return person
                        }
                        
                    })

                    cache.writeQuery({
                        query: GET_PEOPLE,
                        data: { ...data, people: [...newData] }
                    });
                }
            })

        props.onButtonClick()
    }


    return(
        <Form
        name='update-car-form'
        form={form}
        layout='inline'
        onFinish={onFinish}
        size='large'
        initialValues={{
            year: year,
            make: make,
            model: model,
            price: price,
            personId: personId
        }}
        >

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
                placeholder="Select a person"
                
                >
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
                    disabled={!form.isFieldsTouched(false) || form.getFieldsError().filter(({ errors }) => errors.length).length}>
                        Update Car
                    </Button>
                )}
            </Form.Item>

        </Form>
    )

}

export default UpdateCar