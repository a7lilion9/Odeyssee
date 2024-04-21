
const get = async (endpoint) => {
  try {
    const res = await fetch(`http://localhost:3000/${endpoint}`)

    if (!res.ok) {
      throw new Error('Get response was not okey from', endpoint)
    }

    return await res.json()
  } catch(e) {
    console.error(e.stack)
  }
}

const post = async (endpoint, obj) => {
  try {
    const res = await fetch(`http://localhost:3000/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    })

    if (!res.ok) {
      throw new Error('Post response was not okey from', endpoint)
    }

    return await res.json()
  } catch(e) {
    console.error(e.stack)
  }
}

export default {get, post}