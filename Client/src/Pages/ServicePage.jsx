import {
  Button, Title, Textbox, Form, Container,
  Table, TBody, THeader, TFooter, Row, Col, Select
} from '../Components'
import db from '../db'
import { datetime } from '../utils'

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

// Component
const ServicePage = () => {
  const [service, setService] = useState('')
  const [id, setId] = useState('')
  const [action, setAction] = useState('add')

  const queryClient = useQueryClient()

  const handleActions = (action) => {

    if (action === 'add') {
      return async (obj) => {
        return await db.post('api/services/add', obj)
      }
    } else if (action === 'remove') {
      return async (obj) => {
        return await db.post('api/services/remove', obj)
      }
    }
  }

  // Mutation to add a service
  const { mutate } = useMutation(handleActions(action))

  // useQuery to fetch all services
  const { data, error, isLoading, isError } = useQuery('services', async () => {
    return await db.get('api/services')
  })

  if (isLoading) return <div>Loading ...</div>
  if (isError) return <div>Error {error.message}</div>

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target);

    if ((formData.get('id') && formData.get('service')) || (formData.get('id') && action == 'remove')) {
      mutate({
        service_id: formData.get('id'),
        datetime: datetime(),
        service_name: formData.get('service')
      })
    }

    if (action === 'add') {
      queryClient.setQueryData('services', old => [...old,
      {
        service_id: formData.get('id'),
        datetime: datetime(),
        service_name: formData.get('service')
      }])
    } else if (action === 'remove') {
      queryClient.setQueryData('services', old => data.filter(e => +e.service_id !== +id))
    }
  }

  const handleChange = (e) => setService(e.target.value)
  const handleChangeId = (e) => setId(e.target.value)
  const handleCheckbox = (e) => setAction(e.target.value)

  return (
    <Container>
      <Title value='Services' />
      <Form onsubmit={handleSubmit} position='justify-end'>
        <Textbox name='id' onchange={handleChangeId} holder='Id' />
        <Textbox name='service' onchange={handleChange} holder='Service Name' />
        <Select onclick={handleCheckbox} options={[
          {value: 'add', text: 'Add'},
          {value: 'remove', text: 'Remove'}
        ]} />
        <Button value='Submit' />
      </Form>
      <Table>
        <THeader>
          <Row>
            <Col>Id</Col>
            <Col>Date & Time</Col>
            <Col>Name</Col>
          </Row>
        </THeader>
        <TBody>
          {data.map((s, i) => (
            <Row key={i}>
              <Col>{s.service_id}</Col>
              <Col>{s.datetime}</Col>
              <Col>{s.service_name}</Col>
            </Row>
          ))}
        </TBody>
        <TFooter></TFooter>
      </Table>
    </Container>
  )
}

export default ServicePage