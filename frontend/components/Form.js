import React from 'react'

function Form({ title, formData, setFormData, callback, error }) {
  return (
    <>
      <h1>{title}</h1>
      <form onSubmit={callback}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='text'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        {error && <p className='text-danger'>Error: {error.message}</p>}
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default Form
