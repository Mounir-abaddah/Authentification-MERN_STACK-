import './Login.css'
import React from 'react'
import { Button,Form, Input } from 'antd';
import axios from 'axios'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const onFinish = async(values)=>{
    try{
      const response = await axios.post('/api/user/login',values);
      if(response.data.success){
        toast.success(response.data.message)
        toast("Redirection vers la page d'accueil")
        localStorage.setItem("token",response.data.data)
        navigate("/")
      }else{
        toast.error(response.data.message)
      }
    }catch(error){
      toast.error("Quelque chose ne va pas")
    }
    
  }
  return (
    <div className="authentification">
    <div className="authentification-form card p-2">
        <h1 className='card-title'>Ravi de vous rencontrer</h1>
        <Form layout='vertical' onFinish={onFinish}>
            <Form.Item label='Email:' name='email'>
                <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label='Password:' name='password'>
                <Input placeholder="Password" type='password' />
            </Form.Item>
            <Button className="primary-button" htmlType='submit'>S'inscrire</Button>
            <Link to="/login" className='link'>Cliquer ici pour Se Connecter</Link>
        </Form>
    </div>
</div>
  )
}

export default Login