/**
 * @author
 * @date 2021-1-2
 * 1.useRef的使用
 */
import React, { useState, useRef } from 'react'
import { Input, Select, Button, Icon } from 'antd'
import styles from './Search.less'

const selectOptions = [
    { value: 'name', name: '姓名' },
    { value: 'phone', name: '手机号' },
    { value: 'email', name: '邮箱' }
]

const Search = props => {
    const [selectValue, setSelectValue] = useState('name')
    const searchInput = useRef(null)

    const handeleSelectChange = value => {
        setSelectValue(value)
    }

    const handleSearch = () => {
        const data = {
            keyword: searchInput.current.state.value
        }
        data.field = selectValue
        props.onSearch && props.onSearch(data)
    }

    const { keyword } = props
    return (
        <Input.Group compact className={styles.search} style={{ width: '120%' }}>
            <Select style={{ width: '30%' }} onChange={handeleSelectChange} defaultValue={selectValue}>
                {selectOptions.map((item, key) => (
                    <Select.Option value={item.value} key={key}>
                        {item.name || item.value}
                    </Select.Option>
                ))}
            </Select>

            <Input ref={searchInput} style={{ width: '50%' }} defaultValue={keyword} />
            <Button type='primary' onClick={handleSearch}>
                <Icon type='search' />
                搜索
            </Button>
        </Input.Group>
    )
}
export default Search
