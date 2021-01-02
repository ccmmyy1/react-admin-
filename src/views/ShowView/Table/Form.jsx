import React from 'react'
import { Form, Input, Cascader, Button, message, DatePicker, Radio, Select } from 'antd'
import cityData from '../../../utils/CityCode'
import moment from 'moment'

const sortCityList = []
for (let i in cityData) {
    let city = {}
    city.value = cityData[i].value
    city.label = cityData[i].text
    city.children = cityData[i].children
    for (let j in city.children) {
        // eslint-disable-next-line no-self-assign
        city.children[j].value = city.children[j].value
        city.children[j].label = city.children[j].text
        // eslint-disable-next-line no-self-assign
        city.children[j].children = city.children[j].children
        for (let k in city.children[j].children) {
            // eslint-disable-next-line no-self-assign
            city.children[j].children[k].value = city.children[j].children[k].value
            city.children[j].children[k].label = city.children[j].children[k].text
        }
    }
    sortCityList.push(city)
}

const roleList = [
    {
        id: 1,
        name: '管理员'
    },
    {
        id: 2,
        name: '用户'
    },
    {
        id: 3,
        name: '超级管理员'
    }
]

const FormLayout = props => {
    const handleSubmit = e => {
        e.preventDefault()
        const okHandle = props.okHandle // 传给父组件调接口
        props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                message.warning('请先填写正确的表单')
            } else {
                const time = values.date.format('YYYY-MM-DD HH:mm:ss')
                console.log(time)
                const value = {
                    date: time,
                    time: time,
                    ...values
                }
                console.log(value, 'vvvv') //todo
                okHandle(values) //在上一层调接口传参数 不要将应用层和业务层混合使用
                message.success('提交成功')
            }
        })
    }

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
    }

    const tailLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0
            },
            sm: {
                span: 12,
                offset: 4
            }
        }
    }
    const { getFieldDecorator, getFieldValue } = props.form
    const { record } = props
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item label='姓名' hasFeedback {...formItemLayout}>
                {getFieldDecorator('name', {
                    initialValue: record ? record.name : '',
                    rules: [
                        {
                            required: true,
                            message: '请填写姓名'
                        }
                    ]
                })(<Input />)}
            </Form.Item>
            <Form.Item label='性别' {...formItemLayout}>
                {getFieldDecorator('isMale', {
                    initialValue: record ? record.isMale : false,
                    rules: [
                        {
                            required: true,
                            type: 'boolean',
                            message: '请选择性别'
                        }
                    ]
                })(
                    <Radio.Group>
                        <Radio value>男</Radio>
                        <Radio value={false}>女</Radio>
                    </Radio.Group>
                )}
            </Form.Item>
            <Form.Item label='手机号' hasFeedback {...formItemLayout}>
                {getFieldDecorator('phone', {
                    initialValue: record ? record.phone : '',
                    rules: [
                        {
                            len: 11,
                            pattern: /^[1][3|4|5|7|8][0-9]{9}$/,
                            required: true,
                            message: '请输入正确的11位手机号'
                        }
                    ]
                })(<Input />)}
            </Form.Item>
            <Form.Item label='邮箱' hasFeedback {...formItemLayout}>
                {getFieldDecorator('email', {
                    initialValue: record ? record.email : '',
                    rules: [
                        {
                            type: 'email',
                            message: '请输入正确的邮箱地址'
                        },
                        {
                            required: true,
                            message: '请填写邮箱地址'
                        }
                    ]
                })(<Input />)}
            </Form.Item>
            <Form.Item label='角色' hasFeedback {...formItemLayout}>
                {getFieldDecorator('roleName', {
                    initialValue: record ? record.roleName : '',
                    rules: [
                        {
                            required: true,
                            message: '角色不能为空'
                        }
                    ]
                })(
                    <Select placeholder='--请选择角色--'>
                        {roleList.map(item => (
                            <Select.Option key={item.id} value={item.id.toString()}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            </Form.Item>
            <Form.Item label='地址' hasFeedback {...formItemLayout}>
                {getFieldDecorator('residence', {
                    initialValue: record ? record.residence : '',
                    rules: [
                        {
                            type: 'array',
                            required: false,
                            message: '请选择住址'
                        }
                    ]
                })(<Cascader options={sortCityList} expandTrigger='hover' placeholder='' />)}
            </Form.Item>
            <Form.Item label='生日' hasFeedback {...formItemLayout}>
                {getFieldDecorator('date', {
                    initialValue: record.date ? moment(record.date) : null,
                    rules: [
                        {
                            required: false,
                            message: '请选择日期'
                        }
                    ]
                })(
                    <DatePicker
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
                        }}
                        format='YYYY-MM-DD HH:mm:ss'
                    />
                )}
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }} {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}

const FormModal = Form.create()(FormLayout)

export default FormModal
