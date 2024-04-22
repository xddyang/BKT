import React, { useState } from 'react';
import { Button, Toast, Form, Input } from 'antd-mobile';
import api from '../../api/login';
import { useNavigate } from 'react-router-dom';
import './index.less';

const CustomForm = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [formItems, setFormItems] = useState([
        { name: 'username', label: '账号' },
        { name: 'password', label: '密码' }
    ]);
    const [form] = Form.useForm();      // form组件实例
    const navigate = useNavigate();

    const showModal = () => {
        Toast.show({ content: '请联系系统管理员找回密码' });
    };

    const checkPlan = () => {
        const updatedFormItems = showLogin
            ? [
                { name: 'nickname', label: '昵称', value: '' },
                { name: 'username', label: '账号', value: '' },
                { name: 'password', label: '密码', value: '' }
            ]
            : [
                { name: 'username', label: '账号', value: '' },
                { name: 'password', label: '密码', value: '' }
            ];
        setShowLogin(!showLogin);
        setFormItems(updatedFormItems);
        form.resetFields();
    };

    const handleSubmit = async (value) => {
        try {
            const apiCall = showLogin ? api.login : api.register;
            const successMessage = showLogin ? '登录成功' : '注册成功';
            const res = await apiCall(value);
            Toast.show({ icon: 'success', content: successMessage });
            navigate('/tabbar', { replace: true });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Form
                layout='horizontal'
                onFinish={handleSubmit}
                form={form}
                footer={
                    <Button block type='submit' color='primary' size='large'>{showLogin ? '登录' : '注册'}</Button>
                }
            >
                {formItems.map(item => (
                    <Form.Item key={item.name} required={false} name={item.name} label={item.label} rules={[{ required: true, message: `${item.label}不能为空` }]}>
                        <Input autoComplete='off' placeholder={`请输入${item.label}`} />
                    </Form.Item>
                ))}
            </Form>
            <div className='other'>
                <span className='register' onClick={checkPlan}>{showLogin ? '注册账号' : '登录账号'}</span>
                {showLogin && <span className='forget' onClick={showModal}>忘记密码</span>}
            </div>
        </>

    );
};

// 登录注册页判断当前是否存在token
const judgeToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        // 如果存在token，则跳转到首页
        window.location.href = '/home';
    }
};

const Main = () => {
    judgeToken();

    return (
        <main className='main'>
            <div className='main-block'>
                <img src='https://imger.nl/images/2024/03/08/WechatIMG5.jpg' className='icon' alt='Icon' />
                <CustomForm />
            </div>
        </main>
    );
};

export default Main;