import React, { useState, useEffect } from 'react';
import { Input, Button, Form } from 'antd';

function UserDetails(props) {
  const [item, setItem] = useState({});
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  useEffect(() => {
    const item = props.location.state.item;
    setItem(item)
    setFirstName(item.firstName)
    setLastName(item.lastName)
  }, []);

  const { getFieldDecorator } = props.form;

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (values.firstName !== item.firstName || values.lastName !== item.lastName) {
          values.id = item.id;
          props.history.push('/', { values })
        }
      }
    });
  };

  return (
    <div style={style.container}>
      <Form onSubmit={handleSubmit}  >
        <div>
          <Form.Item>
            {getFieldDecorator('firstName', {
              initialValue: firstName,
              rules: [{ required: true, message: 'Please input your first name!' }],
            })(
              <Input style={style.input} onChange={(e) => setFirstName(e.target.value)} />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('lastName', {
              initialValue: lastName,
              rules: [{ required: true, message: 'Please input your last name!' }],
            })(
              <Input style={style.input} onChange={(e) => setLastName(e.target.value)} />
            )}
          </Form.Item>
          <Form.Item>
            <Button style={style.button} onClick={() => props.history.goBack()}>Back</Button>
            <Button style={style.button} type="primary" onClick={() => { }}>Cancel</Button>
            <Button style={style.button} type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </div>
      </Form>
      <div style={style.content}>
        <div style={style.title}>Age: <span style={style.text}>{item.age}</span></div>
        <div style={style.title}>Description: <span style={style.text}>{item.description}</span></div>
      </div>
    </div>
  );
}

const style = {
  container: {
    margin: 20,
  },
  input: {
    width: '40%',
    marginRight: 10
  },
  button: {
    marginRight: 10
  },
  text: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16
  },
  content: {
    marginTop: 20
  }
}

const UserDetailsForm = Form.create({ name: 'UserDetailsForm' })(UserDetails);

export default UserDetailsForm