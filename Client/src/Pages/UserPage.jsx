import {
  Button, Title, Textbox, Form, Container,
  Table, TBody, THeader, TFooter, Row, Col,
  Select
} from '../Components'
import db from '../db'
import { datetime } from '../utils'

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

// Component
const UserPage = () => {
  const [id, setId] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [roleName, setRoleName] = useState('')
  const [service, setService] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [action, setAction] = useState('add')
  const [disable, setDisable] = useState('') // To disable textboxes

  const queryClient = useQueryClient()

  const handleActions = (action) => {
    if (action === 'add') {
      return async obj => await db.post('api/users/add', obj)
    } else if (action === 'remove') {
      return async obj => await db.post('api/users/remove', obj)
    } else {
      console.error('No Action in handle Actions function')
    }
  }

  // Mutate a user
  const { mutate } = useMutation(handleActions(action))

  // useQuery to fetch all users
  const { data: usersData } = useQuery('users', async () => await db.get('api/users'))

  // useQuery to fetch roles
  const { data: rolesData } = useQuery('roles', async () => await db.get('api/roles'))

  // useQuery to fetch services
  const { data: servicesData } = useQuery('services', async () => await db.get('api/services'))

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const objToSend = {
      user_id: id,
      datetime: datetime(),
      first_name: fname,
      last_name: lname,
      username: formData.get('username'),
      password: formData.get('password'),
      role_id: role ? role : rolesData[0].role_id,
      service_id: service ? service : servicesData[0].service_id,
      role_name: roleName ? roleName : rolesData[0].role_name,
      service_name: serviceName ? serviceName : servicesData[0].service_name,
    }

    mutate(objToSend)

    console.log(objToSend)

    if (action === 'add') {
      queryClient.setQueryData('users', old => [...old, objToSend])
    } else if (action === 'remove') {
      console.log(usersData.filter(e => +e.role_id !== +id), id)
      queryClient.setQueryData('users', old => usersData.filter(e => +e.user_id !== +id))
    }
  }

  const handleChangeId = (e) => setId(e.target.value)
  const handleFname = (e) => setFname(e.target.value)
  const handleLname = (e) => setLname(e.target.value)

  const handleRole = e => {
    const selectedIndex = e.target.options.selectedIndex
    const id = e.target.value

    setRole(id)
    setRoleName(e.target.options[selectedIndex].innerText)
  }
  
  const handleService = e => {
    const selectedIndex = e.target.options.selectedIndex
    const id = e.target.value

    setService(id)
    setServiceName(e.target.options[selectedIndex].innerText)
  }

  const handleCheckbox = (e) => {
    const action = e.target.value;
    if (action === 'remove') {
      setDisable('disable')
    } else {
      setDisable('')
    }
    setAction(action)
  }

  return (
    <Container>
      <Title value='Users' />
      <Form onsubmit={handleSubmit} position='justify-end'>
        <Textbox onchange={handleChangeId} name='id' holder='Id' />
        <Textbox disabled={disable} onchange={handleFname} name='first_name' holder='First Name' />
        <Textbox disabled={disable} onchange={handleLname} name='last_name' holder='Last Name' />
        <Textbox disabled={disable} name='username' holder='Username' />
        <Textbox disabled={disable} name='password' holder='Password' />

        <Select disabled={disable} onclick={handleRole} options={ rolesData ?
          rolesData.map(role => (
            { value: role.role_id, text: role.role_name }
          )) : [{value: 0, text: 'loading'}]
        } />

        <Select disabled={disable} onclick={handleService} options={ servicesData ?
          servicesData.map(service => (
            { value: service.service_id, text: service.service_name }
          )) : [{value: 0, text: 'loading'}]
        } />
        <Select onclick={handleCheckbox} options={[
          { value: 'add', text: 'Add' },
          { value: 'remove', text: 'Remove' }
        ]} />
        <Button value='Submit' />
      </Form>
      <Table>
        <THeader>
          <Row>
            <Col>Id</Col>
            <Col>First Name</Col>
            <Col>Last Name</Col>
            <Col>Username</Col>
            <Col>Password</Col>
            <Col>Role</Col>
            <Col>Service</Col>
          </Row>
        </THeader>
        <TBody>
          {usersData ? usersData.map((u, i) => (
            <Row key={i}>
              <Col>{u.user_id}</Col>
              <Col>{u.first_name}</Col>
              <Col>{u.last_name}</Col>
              <Col>{u.username}</Col>
              <Col>{u.password}</Col>
              <Col>{u.role_name}</Col>
              <Col>{u.service_name}</Col>
            </Row>
          )) : <Row><Col>Error</Col></Row>}
        </TBody>
        <TFooter></TFooter>
      </Table>
    </Container>
  )
}

export default UserPage;