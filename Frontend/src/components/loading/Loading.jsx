import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className='d-flex justify-content-center align-items-center my-5' style={{ minHeight: '200px' }}>
      <Spinner animation='border' role='status' className='text-primary'>
        <span className='visually-hidden'> Cargando... </span>
      </Spinner>
    </div>
  )
}

export default Loading
