/**
 * @author
 * @date 2021-1-2
 */
import React from 'react'
import { Row, Col, Button, Icon } from 'antd'
import SearchGroup from '../../../components/Search'

const Search = props => {
    const { onAdd } = props

    // 查找
    const onSearch = value => {
        console.log(value, '搜索') //todo
        // dispatch({
        //   type: ...,
        //   payload: { current: 1, ...value },
        // })
    }
    return (
        <Row gutter={24}>
            <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
                <SearchGroup onSearch={onSearch} keyword='' />
            </Col>
            <Col lg={{ offset: 8, span: 8 }} md={12} sm={8} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
                <Button type='ghost' onClick={onAdd}>
                    <Icon type='plus-circle-o' />
                    添加
                </Button>
            </Col>
        </Row>
    )
}

export default Search
